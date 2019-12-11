class Blobby {
	constructor(pos, size) {
		this.size = size || 15;
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		// this.pos = pos || createVector(windowWidth / 2, windowHeight / 2);
		this.pos = pos || createVector(0, 0);

		this.currentMousePos = createVector(this.pos.x, this.pos.y);
	}

	show() {
		noStroke();
		fill(0, 200, 0, 255);
		circle(this.pos.x, this.pos.y, this.size * 2);
	}

	eat(foods) {
		for (let i = foods.length - 1; i >= 0; i--) {
			let dist = Math.sqrt(Math.pow(foods[i].pos.x - this.pos.x, 2) + Math.pow(foods[i].pos.y - this.pos.y, 2), 2);
			if (dist < this.size + foods[i].size) {
				let s = Math.PI * this.size * this.size;
				let addS = Math.PI * foods[i].size * foods[i].size;
				let phi1 = 1 / Math.PI;
				let newSize = Math.sqrt((s + addS / 100) * phi1, 2);
				this.size = newSize;
				foods.splice(i, 1);
			}
		}
	}

	update(foods) {
		// let dir = p5.Vector.sub(createVector(mouseX - windowWidth / 2, mouseY - windowHeight / 2), this.pos);
		// let dist = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2), 2);
		// dir.normalize();
		// dir.mult(map(dist, 0, 40, 0, 1));
		// this.acc = dir;
		// this.vel.limit(2);
		// this.vel.add(this.acc);
		// this.pos.add(this.vel);

		this.eat(foods);
	}
}

class Food extends Blobby {
	constructor(pos, size) {
		super(pos, size);
		this.pos.sub(createVector(windowWidth / 2, windowHeight / 2));
	}

	update(blobby) {
		let dir = p5.Vector.sub(createVector(mouseX - windowWidth / 2, mouseY - windowHeight / 2), blobby.pos);
		let dist = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2), 2);
		dir.normalize();
		dir.mult(map(dist, 0, 40, 0, 0.1));
		this.acc = dir;
		this.vel.limit(1);
		this.vel.add(this.acc);
		this.pos.add(this.vel);
	}

	show() {
		noStroke();
		fill(0, 0, 200, 255);
		circle(this.pos.x, this.pos.y, this.size * 2);
	}
}