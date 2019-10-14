/** 
* 2DSuperShape 2D超级形状
* https://zh.wikipedia.org/wiki/%E8%B6%85%E6%A9%A2%E5%9C%93
* http://paulbourke.net/geometry/supershape/
*/
const windowWidth = 800;
const windowHeight = 600;
const step = 0.1;
const step2 = 0.1;

let a = 1;
let b = 1;
let m = 1;
let n = 1;
let n1 = 1;
let n2 = 1;
let n3 = 1;

let originA = a;
let originB = b;
let originM = m;
let originN = n;
let originN1 = n1;
let originN2 = n2;
let originN3 = n3;

let flag = 1;
let frameCount = 0;

let key = "";
let keyIsPressed = false;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function keyPressed(keyEvent) {
	key = keyEvent.key;
	keyIsPressed = true;
	if ("ArrowUp" === key) {
		flag = 1;
	} else if ("ArrowDown" === key) {
		flag = -1;
	} else if ("Enter" === key) {
		a = originA;
		b = originB;
		m = originM;
		n = originN;
		n1 = originN1;
		n2 = originN2;
		n3 = originN3;
	}
}
function print1() {
	console.log(a, b, m, n, n1, n2, n3);
}
function handleKeyPress() {
	if (keyIsPressed) {
		if ("q" === key) {
			a += step2 * flag;
		} else if ("w" === key) {
			b += step2 * flag;
		} else if ("e" === key) {
			m += step2 * flag;
		} else if ("Control" === key) {
			n += step2 * flag;
		} else if ("Alt" === key) {
			n1 += step2 * flag;
		} else if ("Meta" === key) {
			n2 += step2 * flag;
		} else if ("Shift" === key) {
			n3 += step2 * flag;
		}
	}
}

function keyReleased() {
	keyIsPressed = false;
}

function draw() {
	// print1();
	frameCount++;
	handleKeyPress();


	background(100);
	translate(windowWidth / 2, windowHeight / 2);

	stroke(255);
	fill(frameCount * 1.5 % 256, 256 - frameCount % 256, frameCount * 2 % 256, 255);

	beginShape();
	for (let i = 0; i < TWO_PI; i += step) {
		let xy = calcXY(i);
		let x = xy.x;
		let y = xy.y;
		// console.log(xy);
		vertex(x * 100, y * 100);
	}
	endShape(CLOSE);
}

function calcXY(phi) {
	let ret = {
		x: 0,
		y: 0
	}

	let r = 0;
	let t1, t2;

	t1 = cos(m * phi / 4) / a;
	t1 = abs(t1);
	t1 = pow(t1, n2);

	t2 = sin(m * phi / 4) / b;
	t2 = abs(t2);
	t2 = pow(t2, n3);

	r = pow(t1 + t2, 1 / n1);

	if (0 !== abs(r)) {
		r = 1 / r;
		ret.x = r * cos(phi);
		ret.y = r * sin(phi);
	}

	return ret;
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