class CA {
	constructor() {
		this.wh = 20;
		this.ruleIndex = 0;
		this.rules = this.nextRule(this.ruleIndex);
		this.cells = new Array(Math.floor(windowWidth / this.wh)).fill(0);
		this.cells[Math.floor(this.cells.length / 2)] = 1;

		this.maxGenerate = Math.floor(windowWidth / this.wh) + 50;
		this.generate = 0;
	}
	getResultFromRule(l, c, r) {
		let str = "" + l + c + r;
		let idx = parseInt(str, 2);
		return this.rules[idx];
	}
	updateCells() {
		var nextCells = new Array(Math.floor(windowWidth / this.wh)).fill(0);
		for (let i = 1; i < this.cells.length - 1; i++) {
			let l = this.cells[i - 1];
			let c = this.cells[i];
			let r = this.cells[i + 1];
			nextCells[i] = this.getResultFromRule(l, c, r);
		}
		this.cells = nextCells;
		this.generate++;
		return this.checkNextPage();
	}
	nextRule(idx) {
		// return [0, 1, 0, 1, 1, 0, 1, 0];

		let str = idx.toString(2);
		let ret = new Array(8).fill(0);
		let j = ret.length - 1;
		for (let i = str.length - 1; i >= 0; i-- , j--) {
			let num = parseInt(str[i]);
			ret[j] = num;
		}
		this.generate = 0;
		return ret;
	}
	checkNextPage() {
		if (this.generate > this.maxGenerate) {
			this.generate = 0;
			this.ruleIndex++;
			this.rules = this.nextRule(this.ruleIndex);
			this.cells = new Array(Math.floor(windowWidth / this.wh)).fill(0);
			this.cells[Math.floor(this.cells.length / 2)] = 1;
			console.log("新的规则：", this.ruleIndex);
			// console.log(this.rules);
			return true;
		}
		return false;
	}

	draw() {
		for (let i = 0; i < this.cells.length; i++) {
			let cell = this.cells[i];
			if (0 === cell) {
				fill(255, 0, 0, 255);
			} else if (1 === cell) {
				fill(0, 255, 0, 255);
			}
			let x = i * this.wh;
			let y = this.generate * this.wh;
			rect(x, y, this.wh, this.wh);
		}

		return {
			name: String(this.ruleIndex),
			over: this.updateCells()
		}
	}
}