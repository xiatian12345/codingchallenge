class Firework {
	constructor(pos, vel, canExplode) {
		this.pos = pos;
		this.vel = vel;
		this.acc = new p5.Vector(0, 0, 0);
		this.exploded = false;
		this.canExplode = canExplode;
		this.lifeSpan = floor(random(80, 100));
		this.lifeSpanOrigin = this.lifeSpan;
		this.finished = false;

		if (!this.canExplode) {
			this.r = random(100, 256);
			this.g = random(100, 256);
			this.b = random(100, 256);
		}

		this.fireworks = [];
	}

	applyForce(force) {
		this.acc.add(force);
	}

	isFinish() {
		if (this.canExplode) {
			return 0 === this.fireworks.length && this.exploded;
		} else {
			return this.lifeSpan < 0;
		}
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.checkExplod();
		this.show();
		this.fireworksShow();
	}
	fireworksShow() {
		if (!this.canExplode) return;
		for (let i = this.fireworks.length - 1; i >= 0; i--) {

			this.fireworks[i].applyForce(gravity);
			this.fireworks[i].update();
			this.fireworks[i].show();
			this.fireworks[i].lifeSpan -= 2;

			if (this.fireworks[i].isFinish()) {
				this.fireworks.splice(i, 1);
			}
		}
	}

	checkExplod() {
		if (this.canExplode && !this.exploded && this.vel.y >= 0) {
			explodSound.setVolume(1);
			explodSound.play();

			this.exploded = true;
			let newLen = floor(random(60, 120));
			for (let i = 0; i < newLen; i++) {
				let vel = p5.Vector.random3D();
				vel.mult(random(8, 16));
				this.fireworks.push(new Firework(new p5.Vector(this.pos.x, this.pos.y, this.pos.z), vel, false));
			}
		}
	}

	show() {
		if (this.canExplode) {
			if (this.exploded) return;
			fill(255);
			noStroke();
			push();
			translate(this.pos.x, this.pos.y, this.pos.z);
			sphere(8);
			// ellipse(this.pos.x, this.pos.y, this.pos.z, 8, 8);
			pop();
		} else {
			let opacity = map(this.lifeSpan, 0, this.lifeSpanOrigin, 0, 255);
			fill(this.r, this.g, this.b, opacity);
			noStroke();
			push();
			translate(this.pos.x, this.pos.y, this.pos.z);
			sphere(8 * 0.7);
			// ellipse(this.pos.x, this.pos.y, this.pos.z, 8 * 0.7, 8 * 0.7);
			pop();
		}
	}
}