class Planet {
	constructor(rotateRadius, selfRadius, rotateSpeed, initAngle, img) {
		this.init(rotateRadius, selfRadius, rotateSpeed, initAngle, img);
	}
	init(rotateRadius, selfRadius, rotateSpeed, initAngle, img) {
		this.rotateRadius = rotateRadius;
		this.selfRadius = selfRadius;
		this.rotateSpeed = rotateSpeed;
		this.initAngle = initAngle;
		this.moons = [];
		this.img = img;
	}

	moonFollow(number, level) {
		if (level < 0) return;
		for (let i = 0; i < number; i++) {
			const rotateRadius = random(1.5, 2.5) * this.selfRadius;
			const selfRadius = random(0.2, 0.4) * this.selfRadius;
			const rotateSpeed = random(-0.1, 0.1);
			const initAngle = random(TWO_PI);
			const img = imgs[Math.floor(random(0, 3))];
			const moon = new Planet(rotateRadius, selfRadius, rotateSpeed, initAngle, img);
			this.moons.push(moon);
			moon.moonFollow(random(2, 4), level - 1);
		}
	}
	update() {
		this.initAngle += this.rotateSpeed;
		for (let i = 0; i < this.moons.length; i++) {
			this.moons[i].update();
		}
	}
	show() {
		push();

		fill(180, 180, 180, 155);
		rotate(this.initAngle);//旋转需要放到translate之前
		noStroke();
		translate(this.rotateRadius, 0);

		texture(this.img);
		// ellipse(0, 0, this.selfRadius);
		sphere(this.selfRadius);

		for (let i = 0; i < this.moons.length; i++) {
			this.moons[i].show();
		}

		pop();
	}
}