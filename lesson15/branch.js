class Branch {
	constructor(start, end, level) {
		this.start = start;
		this.end = end;
		this.level = level;
		this.isLeaf = false;
		this.width = Math.sqrt(Math.pow(end.y - start.y, 2) + Math.pow(end.x - start.x, 2));//根据向量的模决定树干的粗细
	}
	show() {
		if (this.level < 5) {
			strokeWeight(map(this.width, 0, 30, 0, 5));
			stroke(0, 200, 0, 160);
			line(this.start.x + random(-1, 1), this.start.y + random(-1, 1), this.end.x + random(-1, 1), this.end.y + random(-1, 1));
		} else {
			this.isLeaf = true;
			fill(255, 0, 0, 160);
			noStroke();
			ellipse(this.start.x + random(-1, 1), this.start.y + random(-1, 1), 20, 20);
		}
	}

	generate(direction) {
		let dir = createVector(this.end.x - this.start.x, this.end.y - this.start.y);
		dir.rotate(PI / 6 * direction);
		dir.mult(0.66);
		const newStart = this.end.copy();
		const newEnd = createVector(this.end.x + dir.x, this.end.y + dir.y);
		return new Branch(newStart, newEnd, this.level + 1);
	}

	generateLeft() {
		return this.generate(-1);
	}

	generateRight() {
		return this.generate(1);
	}
}