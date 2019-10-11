/**
* SuperShape 超椭圆
* https://zh.wikipedia.org/wiki/%E8%B6%85%E6%A9%A2%E5%9C%93
* http://paulbourke.net/geometry/supershape/
*/
const windowWidth = 800;
const windowHeight = 600;
const step = 0.1;
const r = 150;
let a = 100;
let b = 100;
let n = 1;

let aOrigin = a;
let bOrigin = b;
let nOrigin = n;
let key = "";
let keyIsPressed = false;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function keyPressed(keyEvent) {
	key = keyEvent.key;
	keyIsPressed = true;
	switch (keyEvent.key) {
		case "ArrowUp":
			break;
		case "ArrowDown":
			break;
		case "Enter":
			a = aOrigin;
			b = bOrigin;
			n = nOrigin;
			break;
	}
}

function handleKeyPress() {
	if (keyIsPressed) {
		if ("ArrowUp" === key) {
			n += 0.01;
		} else if ("ArrowDown" === key) {
			n -= 0.01;
			if (n <= 0) n = 0;
		}
	}
}

function keyReleased() {
	keyIsPressed = false;
}

function draw() {
	this.handleKeyPress();


	background(100);
	translate(windowWidth / 2, windowHeight / 2);


	stroke(255);
	// noFill();

	beginShape();
	for (let i = 0; i < TWO_PI; i += step) {
		// let x = r * cos(i);
		// let y = r * sin(i);
		let x = pow(abs(cos(i)), 2 / n) * a * sgn(cos(i));
		let y = pow(abs(sin(i)), 2 / n) * b * sgn(sin(i));
		vertex(x, y);
	}
	endShape(CLOSE);
}

function sgn(w) {
	if (0 === w) {
		return 0;
	} else if (0 > w) {
		return -1;
	} else if (0 < w) {
		return 1;
	}
}