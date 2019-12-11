class Hero {
	constructor() {
		this.pos = createVector(windowWidth / 2, windowHeight / 2);
		this.acc = createVector(0, 0);
		this.vel = createVector(0, 0);
		this.headDeltaPos = createVector(0, 0);
		this.radius = 30;
		this.color = { r: 255, g: 0, b: 0, a: 255 };
		this.currentheading = createVector(0, -1).heading();//向上
		this.angle = 0;
		this.speedFactor = 5;
		this.isKeyLRPressed = false;
		this.bullets = [];
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.vel.mult(0.95);
		this.checkEdge();
	}

	keyHandlePress(key) {
		switch (key) {
			case " ":
				this.fire();
				break;
			case "ArrowDown":
				this.vel.add(createVector(-this.speedFactor * Math.cos(this.currentheading), -this.speedFactor * Math.sin(this.currentheading)));
				break;
			case "ArrowUp":
				this.vel.add(createVector(this.speedFactor * Math.cos(this.currentheading), this.speedFactor * Math.sin(this.currentheading)));
				break;
			case "ArrowLeft":
				this.setAngle(-0.1);
				this.isKeyLRPressed = true;
				break;
			case "ArrowRight":
				this.setAngle(0.1);
				this.isKeyLRPressed = true;
				break;
			default:
				break;
		}
	}
	keyHandleRelease(key) {
		switch (key) {
			case "ArrowLeft":
				this.isKeyLRPressed = false;
				this.setAngle(this.angle * 0.2);
				break;
			case "ArrowRight":
				this.isKeyLRPressed = false;
				this.setAngle(this.angle * 0.2);
				break;
			default:
				break;
		}
	}
	fire() {
		this.bullets.push(new Bullet(createVector(this.pos.x + this.headDeltaPos.x, this.pos.y + this.headDeltaPos.y), this.currentheading));
	}

	setAngle(angle) {
		this.angle = angle;
	}

	turn() {
		this.currentheading += this.angle;
	}

	show() {
		push();
		translate(this.pos.x, this.pos.y, this.pos.z);
		noStroke();
		fill(this.color.r, this.color.g, this.color.b, this.color.a);
		rotate(this.currentheading);
		beginShape();
		for (let i = 0; i < 3; i++) {
			let theta = i * 120 * Math.PI / 180;
			let radius = this.radius;
			if (0 === i) {
				radius *= 1.4;
				this.headDeltaPos = createVector(radius * Math.cos(this.currentheading), radius * Math.sin(this.currentheading));
			}
			let x = Math.cos(theta) * radius;
			let y = Math.sin(theta) * radius;
			vertex(x, y);
		}
		endShape(CLOSE);
		pop();
	}

	render() {
		if (this.isKeyLRPressed) {
			this.angle *= 0.999;
		} else {
			this.angle *= 0.9;
		}

		this.turn();
		this.update();
		this.show();

		for (let i = this.bullets.length - 1; i >= 0; i--) {
			let bullet = this.bullets[i];
			if (bullet.dead()) {
				this.bullets.splice(i, 1);
			} else {
				bullet.render();
			}
		}
	}

	checkHit(enemys) {
		for (let i = enemys.length - 1; i >= 0; i--) {
			let enemy = enemys[i];
			let enemyIsDead = false;
			for (let j = this.bullets.length - 1; j >= 0; j--) {
				let bullet = this.bullets[j];
				if (bullet.hit(enemy)) {
					bullet.isDead = true;
					enemyIsDead = true;
					break;
				}
			}
			if (enemyIsDead) {
				enemy.isDead = true;
			}
		}
	}

	checkEdge() {
		if (this.pos.x >= (windowWidth + 2 * this.radius)) {
			this.pos.x = - 2 * this.radius;
		} else if (this.pos.x <= (- 2 * this.radius)) {
			this.pos.x = windowWidth + 2 * this.radius;
		}

		if (this.pos.y >= (windowHeight + 2 * this.radius)) {
			this.pos.y = - 2 * this.radius;
		} else if (this.pos.y <= (- 2 * this.radius)) {
			this.pos.y = windowHeight + 2 * this.radius;
		}
	}
}