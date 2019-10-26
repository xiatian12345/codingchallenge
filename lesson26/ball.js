class Ball {
	constructor() {
		this.vel = createVector(random(2, 5), random(2, 5));
		this.acc = createVector(random(-0.1, 0.1), random(0.1, 0.1));
		this.pos = createVector(random(windowWidth), random(windowHeight));
		this.r = 32;
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.checkEdge();
	}

	checkEdge() {
		if (this.pos.x > windowWidth || this.pos.x < 0) {
			this.vel.x *= -1;
		}
		if (this.pos.y > windowHeight || this.pos.y < 0) {
			this.vel.y *= -1;
		}
	}

	show() {
		noFill();
		stroke(255);
		strokeWeight(4);
		ellipse(this.pos.x, this.pos.y, this.r, this.r);
	}
}
