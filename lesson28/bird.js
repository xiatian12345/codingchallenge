class Bird {
	constructor() {
		this.size = 24;
		this.pos = createVector(windowWidth / 3, windowHeight - this.size / 2);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
	}
	show() {
		fill(0, 0, 255, 255);
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
	}
	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}
	checkEdge() {
		if (this.pos.y > windowHeight - this.size / 2) {
			this.pos.y = windowHeight - this.size / 2;
			this.vel.mult(0);
		}
		if (this.pos.y < this.size / 2) {
			this.pos.y = this.size / 2;
			this.vel.mult(0);
		}
	}
	applyForce(force) {
		this.acc.add(force);
	}
	run() {
		this.update();
		this.checkEdge();
		this.show();
	}
}