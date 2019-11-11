class Walker {
	constructor(isTree, pos) {
		this.size = radius;
		this.color = 10;
		this.isTree = isTree;
		if (!pos) {
			let rand = Math.floor(Math.random() * 4);
			if (0 === rand) {
				pos = createVector(0, random(0, windowHeight));
			} else if (1 === rand) {
				pos = createVector(windowWidth, random(0, windowHeight));
			} else if (2 === rand) {
				pos = createVector(random(0, windowWidth), 0);
			} else if (3 === rand) {
				pos = createVector(random(0, windowWidth), windowHeight);
			}
		}
		this.pos = pos;
	}
	acc() { //加速跑向中点
		let dist = createVector(windowWidth / 2 - this.pos.x, windowHeight / 2 - this.pos.y);
		dist.normalize();
		dist.mult(1 / cycleTimes);
		this.pos.add(dist);
	}
	show() {
		noStroke();
		if (this.isTree) {
			fill(this.color, 100, 200, 150);
		} else {
			fill(this.color, 100, 200, 150);
		}
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
	}
	walk() {
		let randVel = p5.Vector.random2D();
		this.pos.add(randVel);
		this.acc();
		this.pos.x = constrain(this.pos.x, 0, width);
		this.pos.y = constrain(this.pos.y, 0, height);
	}
	joinTree(tree) {
		for (let i = 0; i < tree.length; i++) {
			let treeNode = tree[i];
			if (this.isConcat(treeNode, this)) {
				return true;
			}
		}
		return false;
	}
	isConcat(node1, node2) {
		let dist1 = node1.size / 2 + node2.size / 2;
		let dist2 = dist(node1.pos.x, node1.pos.y, node2.pos.x, node2.pos.y);
		return dist1 > dist2;
	}
}