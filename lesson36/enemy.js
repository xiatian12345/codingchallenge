class Enemy {
	constructor(pos, radius) {
		this.pos = pos;
		this.radius = radius;

		this.rotate = 0;
		this.heading = random(-0.01, -0.01);

		this.randomEdgeNumber = Math.floor(random(3, 12));
		this.color = { r: random(0, 255), g: random(0, 255), b: random(0, 255), a: 255 };
		this.randomRadius = [];
		for (let i = 0; i < this.randomEdgeNumber; i++) {
			let delta = this.radius * (Math.random(-0.8, 0.6) + 1);
			this.randomRadius.push(delta);
		}
		this.vel = createVector(random(-1, 1), random(-1, 1));

		this.acc = createVector(0, 0);
		this.isDead = false;
	}

	deadHandle() {
		if (this.radius < deadRadius) {
			return [];
		}
		let randLen = Math.floor(random(2, 5));
		let ret = [];
		for (let i = 0; i < randLen; i++) {
			ret.push(new Enemy(this.pos.copy(), this.radius * 0.6));//使用pos.copy否则公用一个pos
		}
		return ret;
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.checkEdge();
	}

	render() {
		this.update();
		this.show();
	}

	show() {
		push();
		translate(this.pos.x, this.pos.y, this.pos.z);
		this.rotate += this.heading;
		rotate(this.rotate);
		noStroke();
		fill(this.color.r, this.color.g, this.color.b, this.color.a);

		beginShape();
		for (let i = 0; i < this.randomEdgeNumber; i++) {
			let radius = this.randomRadius[i];
			let theta = Math.PI * 2 / this.randomEdgeNumber * i;
			let x = Math.cos(theta) * radius;
			let y = Math.sin(theta) * radius;
			vertex(x, y);
		}
		endShape(CLOSE);

		pop();
	}

	checkEdge() {
		if (this.pos.x >= (windowWidth + 2 * this.radius)) {
			this.pos.x = - 2 * this.radius;
		} else if (this.pos.x <= (- 2 * this.radius)) {
			this.pos.x = windowWidth + 2 * this.radius;
		}

		if (this.pos.y >= (windowHeight + 2 * this.radius)) {
			this.pos.y = - 2 * this.radius;
		} else if (this.pos.y <= (- 2 * this.radius)) {
			this.pos.y = windowHeight + 2 * this.radius;
		}
	}
} 