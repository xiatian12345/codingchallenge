class Snake {
	constructor(x, y, size, width, height) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.windowWidth = width;
		this.windowHeight = height;
		this.stepLen = size;
		this.init();
	}
	init() {
		this.xSpeed = 1;
		this.ySpeed = 0;
		this.bodyPosition = [];
		this.isPause = false;
		this.isDead = false;
	}
	pauseResume() {
		this.isPause = !this.isPause;
	}
	setDirection(x, y) {
		this.xSpeed = x;
		this.ySpeed = y;
	}
	eatFood(food) {
		if (dist(this.x, this.y, food.x, food.y) <= 0) {
			this.createBody();
			return true;
		} else {
			if (!this.isDead && 0 !== this.bodyPosition.length) this.shiftBody();
			return false;
		}
	}
	deadCheck() {
		let ret1 = false;
		let ret2 = false;
		const self = this;
		const filter = this.bodyPosition.filter((el) => {
			return el.x === self.x && el.y === self.y;
		});
		ret1 = filter.length >= 1 ? true : false;

		if (this.x < 0 || this.x >= this.windowWidth - this.stepLen || this.y < 0 || this.y >= this.windowWidth - this.stepLen) {
			ret2 = true;
		}

		this.isDead = ret1 || ret2;

		if (this.isDead) {
			this.reset();
		}
		return this.isDead;
	}
	reset() {
		this.init();
		this.x = 0;
		this.y = 0;
	}
	shiftBody() {
		if (this.isDead) return;
		if (this.isPause) return;
		this.bodyPosition.pop();
		this.bodyPosition.unshift(createVector(this.x, this.y));
	}
	createBody() {
		const prevX = this.x;
		const prevY = this.y;
		this.bodyPosition.unshift(createVector(prevX, prevY));
	}
	createBodyByTest() {
		let prevX = -this.stepLen;
		let prevY = -this.stepLen;
		this.bodyPosition.unshift(createVector(prevX, prevY));
	}
	update() {
		if (this.isDead) return;
		if (this.isPause) return;
		this.x += this.xSpeed * this.stepLen;
		this.y += this.ySpeed * this.stepLen;

		this.x = constrain(this.x, -this.stepLen, width);
		this.y = constrain(this.y, -this.stepLen, height);
	}
	show() {
		noStroke();
		fill(255, 0, 0, 255);
		rect(this.x, this.y, this.size, this.size);
		fill(255, 255, 255, 255);
		stroke(51, 51, 51, 255);
		const self = this;
		this.bodyPosition.forEach(element => {
			rect(element.x, element.y, self.size, self.size);
		});
	}
}