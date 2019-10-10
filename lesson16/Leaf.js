class Leaf {
	constructor() {
		this.size = 5;
		this.reached = false;
		this.pos = createVector(random(windowWidth), random(windowHeight * 2 / 3));
	}

	show() {
		// stroke(0, 200, 0, 200);
		if (this.reached) return;
		noStroke();
		fill(0, 200, 0, 200);
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
	}
}