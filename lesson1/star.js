
class Star {
	constructor() {
		this.init();
	}

	init() {
		this.x = random(-width / 4, width / 4);
		this.y = random(-height / 4, height / 4);
		this.z = random(width);
	}

	update() {
		this.z -= window.speed;
		if (this.z < 1) {
			this.init();
		} else if (this.z > width) {
			this.z = width;
		}
	}

	show() {
		fill(255, 0, 0, 255);
		noStroke();
		let sx = map(this.x / this.z, 0, 1, 0, width);
		let sy = map(this.y / this.z, 0, 1, 0, height);

		let r = map(this.z, 0, width, 10, 0.1);
		ellipse(sx, sy, r, r);
	}
}