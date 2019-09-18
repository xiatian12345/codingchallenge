class Cell {
	constructor(x, y, size) {
		this.init(x, y, size);
	}
	init(x, y, size) {
		this.size = size || 40;
		this.x = x || random(this.size, windowWidth - this.size);
		this.y = y || random(this.size, windowHeight - this.size);

		this.originalSize = 40;
		this.growAccelerate = 0.04;
	}
	generate() {
		return new Cell(this.x + random(-5, 5), this.y + random(-5, 5), this.size * 0.7);
	}
	update() {
		this.x += random(-1, 1);
		this.y += random(-1, 1);
		if (this.size < this.originalSize) {
			this.size += this.growAccelerate;
		}
	}
	show() {
		noStroke();
		fill(245, 30, 117, 120);
		ellipse(this.x, this.y, this.size);
	}
}