class Round {
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.maxR = 0;
		this.r = r;
		this.growing = true;
	}
	update() {
		this.show();
		this.grow();
	}
	show() {
		noFill();
		strokeWeight(4);
		stroke(55);
		circle(this.x, this.y, this.r * 2);
	}

	grow() {
		if (this.growing) {
			this.r += 0.5
		}
	}

	crossing(round) {
		return dist(this.x, this.y, round.x, round.y) < (round.r + 4 + this.r);
	}
}