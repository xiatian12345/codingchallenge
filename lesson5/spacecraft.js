class Spacecraft {
	constructor(x, y, size) {
		this.init(x, y, size);
	}
	init(x, y, size) {
		this.x = x;
		this.y = y;
		this.dirX = 0;
		this.dirY = 0;
		this.lastDirX = 0;
		this.moveSpeed = 3;
		this.originalSize = size;
		this.size = size;
		this.scaleDir = 1;
		this.scaleAccelerate = 0.01;
	}
	hit() {
		this.size -= 2 * this.scaleDir;
		if (this.size < 0) {
			this.size = 0;
			this.scaleDir *= -1;
		} else if (this.size > this.originalSize) {
			this.size = this.originalSize;
			this.scaleDir *= -1;
		}
	}
	update() {
		this.moveSpeed += this.scaleAccelerate;
		this.moveSpeed = constrain(this.moveSpeed, 3, 8);
		this.x += this.dirX * this.moveSpeed;
		this.y += (-1 === this.lastDirX * this.dirX ? 1 : 0) * this.moveSpeed;
		this.lastDirX = this.dirX;
	}
	show() {
		fill(243, 8, 102, 255);
		circle(this.x, this.y, this.size);
	}
}