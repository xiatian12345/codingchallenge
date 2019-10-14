class Tree {
	constructor() {
		this.init();
	}

	init() {
		this.MAX_DIST = 20;
		this.MIN_DIST = 10;
		this.leavesLen = 100;

		this.branches = [];
		this.leaves = [];
		this.generateRandomLeafs();
		this.generateRootBranch();
		// this.growUp();
	}

	growUp() {
		let found = false;
		let current = this.root;
		while (!found) {
			for (let i = 0; i < this.leaves.length; i++) {
				let leaf = this.leaves[i];
				const dist = p5.Vector.dist(leaf.pos, current.pos);
				if (dist < this.MAX_DIST) {
					found = true;
				}
			}
			if (!found) {
				let newBranch = current.generate();
				current = newBranch;
				this.branches.push(newBranch);
			}
		}
	}

	generateRootBranch() {
		// let pos = createVector(windowWidth / 2, windowHeight);
		let pos = createVector(0, windowHeight / 2);
		let dir = createVector(0, -1);
		let root = new Branch(null, pos, dir);
		this.branches.push(root);
		this.root = root;
		return root;
	}

	generateRandomLeafs() {
		for (let i = 0; i < this.leavesLen; i++) {
			this.leaves.push(new Leaf());
		}
	}

	grow() {
		//对于LEAVES中的每个叶子，将叶子与所有BRANCHES进行比较，并获得方向向量DIR（叶子点--分支点）和距离DIST（DIR的长度）。
		for (let i = this.leaves.length - 1; i >= 0; i--) {
			let leaf = this.leaves[i];
			let nearestBranch = null;//获取一个叶子和所有分支的遍历之后，最近的分支
			let maxRecord = 50000;
			for (let j = 0; j < this.branches.length; j++) {
				let branch = this.branches[j];
				let curdist = p5.Vector.dist(branch.pos, leaf.pos);

				if (curdist <= this.MIN_DIST) {//如果DIST < MIN_DIST，从LEAVES中移除该叶子，并将该叶子标记为reached。
					leaf.reached = true;
					nearestBranch = null;
					break;
				} else if (curdist <= this.MIN_DIST) {//如果DIST > MAX_DIST，跳过比较这个叶子和这个分支点，它们相距太远了。
					//do nothing
				} else if (curdist <= maxRecord) {
					maxRecord = curdist;
					nearestBranch = branch;
				}
			}

			//当你将一片叶子与所有分支点进行比较一次过后，请跟踪最接近的分支点以及该点的DIR和DIST。
			if (nearestBranch) {
				// 获取到最近的分支点之后。
				var newDir = p5.Vector.sub(leaf.pos, nearestBranch.pos);
				//然后归一化该方向向量。
				newDir.normalize();
				//然后添加方向向量到最近的分支点的GROW_DIR。
				nearestBranch.dir.add(newDir);
				nearestBranch.growCount++;//增加该分支点的GROW_COUNT。
			}
		}

		for (let i = this.leaves.length - 1; i >= 0; i--) {
			let leaf = this.leaves[i];
			if (leaf.reached) {
				this.leaves.splice(i, 1);
			}
		}

		//在将所有叶子与所有分支点进行比较之后，遍历BRANCHES列表。
		for (let i = 0; i < this.branches.length; i++) {
			let branch = this.branches[i];
			//GROW_COUNT > 0的那些将生成一个新的分支点。
			if (branch.growCount > 0) {
				//将GROW_DIR除以GROW_COUNT以得到平均方向，然后对其进行归一化。
				branch.dir.div(branch.growCount);
				//初始化该新分支点并将其添加到BRANCHES列表中。
				let newBranch = branch.generate();
				this.branches.push(newBranch);
				//重置现有分支点的GROW_DIR和GROW_COUNT。
				branch.reset();
			}
		}
	}

	show() {
		for (let i = 0; i < this.leaves.length; i++) {
			this.leaves[i].show();
		}

		for (let i = 0; i < this.branches.length; i++) {
			this.branches[i].show();
		}
	}
}