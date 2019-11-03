class Wall {
	constructor(posX, constPosX) {
		this.initPosX = posX;
		this.constPosX = constPosX;
		this.constLen = 100;
		this.constWidth = 30;
		this.constSpeed = 1.5;
		this.isCollision = false;
		this.reset(posX);
	}
	show() {
		noStroke();
		if (this.isCollision) {
			fill(255, 0, 0, 255);
		} else {
			fill(0, 255, 0, 255);
		}
		rect(this.posX, 0, this.constWidth, this.pairHeight1 + this.constLen);
		rect(this.posX, this.pairHeight1 + this.constLen + this.passHeight, this.constWidth, this.pairHeight2 + this.constLen);
	}
	checkEdge() {
		if (this.posX < -this.constWidth) {
			this.reset(this.constPosX);
		}
	}
	reset(posX) {
		this.passHeight = random(100, 250);
		this.pairHeight1 = random(windowHeight - this.constLen * 2 - this.passHeight);
		this.pairHeight2 = windowHeight - 2 * this.constLen - this.passHeight - this.pairHeight1;
		this.posX = posX + 100;
	}
	update() {
		this.posX -= this.constSpeed;
		this.checkEdge();
	}
}

class WallManager {
	constructor() {
		this.wallLen = 5;
		this.walls = [];
		for (let i = 0; i < this.wallLen + 1; i++) {
			let wall = new Wall(windowWidth + i * windowWidth / this.wallLen, windowWidth);
			this.walls.push(wall);
		}
	}
	run() {
		for (let i = 0; i < this.walls.length; i++) {
			this.walls[i].update();
			this.walls[i].show();
		}
	}
	checkCollide(bird) {
		for (let i = 0; i < this.walls.length; i++) {
			let wall = this.walls[i];
			let leftX = wall.posX;
			let rightX = wall.posX + wall.constWidth;
			let upY = wall.pairHeight1 + wall.constLen;
			let downY = wall.pairHeight1 + wall.constLen + wall.passHeight;
			if (bird.pos.x > leftX - bird.size / 2 && bird.pos.x < rightX + bird.size / 2 && (bird.pos.y < upY || bird.pos.y > downY)) {
				wall.isCollision = true;
			} else {
				wall.isCollision = false;
			}
		}
	}
}