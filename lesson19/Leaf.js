class Leaf {
	constructor() {
		this.size = 5;
		this.reached = false;
		// this.pos = createVector(random(windowWidth), random(windowHeight * 2 / 3));
		this.pos = createVector(random(random(windowWidth) - windowWidth / 2), random(windowHeight * 2 / 3) - windowHeight / 2, random(-200, 200));
	}

	show() {
		// stroke(0, 200, 0, 200);
		if (this.reached) return;
		noStroke();
		fill(0, 200, 0, 200);
		push();
		translate(this.pos.x, this.pos.y, this.pos.z);
		sphere(this.size);
		// ellipse(0, 0, this.size, this.size);
		pop();
	}
}