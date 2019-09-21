class Cell {
	constructor(x, y) {
		this.init(x, y);
	}
	init(x, y) {
		this.x = x;
		this.y = y;
		this.r = Math.floor(this.x / cellSize);
		this.c = Math.floor(this.y / cellSize);
		this.walls = [true, true, true, true];//up right down left
	}
	print() {
		console.log("(" + this.x + " , " + this.y + ");(" + this.r + " , " + this.c + ")");
	}
	printrc(r, c) {
		console.log("获取的值 : r = " + r + " ,c = " + c + ", " + r + " * " + col + " + " + c + " = " + (r * col + c));
	}
	getIndex(r, c) {
		if (r < 0 || c < 0 || r >= raw || c >= col) return -1;
		// this.printrc(r, c);
		return r * col + c;
	}
	checkNeighbors() {
		let neighbors = [];
		let up = grids[this.getIndex(this.r - 1, this.c)];
		let right = grids[this.getIndex(this.r, this.c + 1)];
		let down = grids[this.getIndex(this.r + 1, this.c)];
		let left = grids[this.getIndex(this.r, this.c - 1)];
		if (up && !up.isVisited) {
			neighbors.push(up);
		}
		if (right && !right.isVisited) {
			neighbors.push(right);
		}
		if (down && !down.isVisited) {
			neighbors.push(down);
		}
		if (left && !left.isVisited) {
			neighbors.push(left);
		}
		// this.print();
		if (0 === neighbors.length) return null;
		let idx = Math.floor(random(0, neighbors.length));
		return neighbors[idx];
	}
	update() {

	}
	show() {
		stroke(0, 0, 255, 255);
		if (this.walls[0]) {
			line(this.x, this.y, this.x + cellSize, this.y);
		}
		if (this.walls[1]) {
			line(this.x + cellSize, this.y, this.x + cellSize, this.y + cellSize);
		}
		if (this.walls[2]) {
			line(this.x, this.y + cellSize, this.x + cellSize, this.y + cellSize);
		}
		if (this.walls[3]) {
			line(this.x, this.y, this.x, this.y + cellSize);
		}

		if (this.isVisited) {
			noStroke();
			fill(0, 255, 0, 255);
			rect(this.x, this.y, cellSize, cellSize);
		}
	}
}