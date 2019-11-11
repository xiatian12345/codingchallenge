class Ball {
	constructor(pos, color) {
		this.pos = pos;
		this.color = color;
		this.size = 10;
	}
	setColor(color) {
		this.color = color;
	}
	show() {
		noStroke();
		if ("R" === this.color) {
			fill(255, 0, 0, 255);
		} else if ("B" === this.color) {
			fill(0, 0, 0, 255);
		} else if ("W" === this.color) {
			fill(255, 255, 255, 255);
		}
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
	}
}