class Particle {
	constructor() {
		this.pos = createVector(random(windowWidth), random(windowHeight));
		this.prevPos = createVector(this.pos.x, this.pos.y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.maxspeed = 4;
		this.h = 0;
		this.size = 4;
	}
	show() {
		stroke(this.h, 255, 255, 25);
		this.h = this.h + 1;
		if (this.h > 255) this.h = 0;
		noFill();
		// ellipse(this.pos.x, this.pos.y, this.size, this.size);
		line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
		this.updatePrev();
	}
	updatePrev() {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	}
	update() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}
	follow(vecs) {
		var x = floor(this.pos.x / gradSize);
		var y = floor(this.pos.y / gradSize);
		var index = x + y * cols;
		var force = vecs[index];
		this.applyForce(force);
	}

	applyForce(force) {
		this.acc.add(force);
	}
	checkEdge() {
		if (this.pos.x > windowWidth) {
			this.pos.x = 0;
			this.applyForce(createVector(random(1, 10) * 1, 0));
			this.pos.y = windowHeight - this.pos.y;
		}
		if (this.pos.x < 0) {
			this.pos.x = windowWidth;
			this.applyForce(createVector(random(1, 10) * -1, 0));
			this.pos.y = windowHeight - this.pos.y;
		}
		if (this.pos.y > windowHeight) {
			this.pos.y = 0;
			this.applyForce(createVector(0, random(1, 10) * 1));
			this.pos.x = windowWidth - this.pos.x;
		}
		if (this.pos.y < 0) {
			this.pos.y = windowHeight;
			this.applyForce(createVector(0, random(1, 10) * -1));
			this.pos.x = windowWidth - this.pos.x;
		}
		this.updatePrev();
	}
}