class Branch {
	constructor(parent, pos, dir) {
		this.parent = parent;
		this.pos = pos;
		this.dir = dir;
		this.originDir = this.dir.copy();

		this.growCount = 0;
		this.growDirs = [];
		this.growSpeed = 1;
	}

	show() {
		if (!this.parent) return;
		stroke(0, 255, 0, 255);
		strokeWeight(5);
		noFill();
		line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
	}

	reset() {
		this.growCount = 0;
		this.dir = this.originDir.copy();
		this.growDirs = [];
	}

	generate() {
		//取分支点的位置并添加此新矢量以获得新分支点的位置。
		const nextDir = p5.Vector.mult(this.dir, this.growSpeed);
		const newPos = p5.Vector.add(this.pos, nextDir);
		let newBranch = new Branch(this, newPos, this.dir.copy());
		return newBranch;
	}
}