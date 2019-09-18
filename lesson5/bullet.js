class Bullet {
	constructor(x, y) {
		this.init(x, y);
	}
	init(x, y) {
		this.x = x;
		this.y = y;
		this.size = 12;
		this.ySpeed = 4;
		this.yAcclerate = 0.1;
		this.isDead = false;
		this.color = color(random(255), random(255), random(255));
	}
	reset(x, y) {
		this.init(x, y);
	}
	destroy() {
		this.ySpeed = 0;
		this.yAcclerate = 0;
		this.size = 0;
	}
	collide(crafts) {
		for (let i = 0; i < crafts.length; i++) {
			if (dist(this.x, this.y, crafts[i].x, crafts[i].y) < (this.size / 2 + crafts[i].size / 2)) {
				crafts[i].hit();
				return true;
			}
		}

		return false;
	}
	update() {
		this.ySpeed += this.yAcclerate;
		this.y -= this.ySpeed;
		if (this.isDead) {
			this.destroy();
		}
	}
	show() {
		fill(this.color.levels[0], this.color.levels[1], this.color.levels[2]);
		noStroke();
		ellipse(this.x, this.y, this.size, this.size / 0.618);
	}
}