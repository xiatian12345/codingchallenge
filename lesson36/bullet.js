class Bullet {
	constructor(pos, heading) {
		this.pos = pos;
		this.acc = createVector(0, 0);
		this.vel = createVector(0, 0);
		this.speedFactor = 20;
		this.currentheading = heading;
		this.vel.add(createVector(this.speedFactor * Math.cos(this.currentheading), this.speedFactor * Math.sin(this.currentheading)));
		this.radius = 10;
		this.color = { r: random(0, 255), g: random(0, 255), b: random(0, 255), a: 255 };
		this.isDead = false;
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.checkEdge();
	}

	hit(enemy) {
		var d = dist(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y);
		if (d < this.radius + enemy.radius) {
			return true;
		} else {
			return false;
		}
	}

	dead() {
		return this.isDead;
	}
	show() {
		push();
		translate(this.pos.x, this.pos.y, this.pos.z);
		noStroke();
		fill(this.color.r, this.color.g, this.color.b, this.color.a);
		rotate(this.currentheading);
		circle(0, 0, this.radius);
		pop();
	}

	render() {
		this.update();
		this.show();
	}

	checkEdge() {
		if (this.pos.x >= (windowWidth + 2 * this.radius) ||
			this.pos.x <= (- 2 * this.radius) ||
			this.pos.y >= (windowHeight + 2 * this.radius) ||
			this.pos.y <= (- 2 * this.radius)) {
			this.isDead = true;
		} else {
			this.isDead = false;
		}
	}
}