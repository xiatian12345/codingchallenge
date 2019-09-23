/**
* 使用柏林噪声生成3d地形
*/
const windowWidth = 800;
const windowHeight = 800;

const w = 1200;
const h = 1000;
const size = 20;
const raw = h / size;//3
const col = w / size;//7
const xoffacc = 0.2;
const yoffacc = 0.2;
let array = [];
let flying = 0;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	for (let y = 0; y < raw; y++) {//3
		array[y] = [];
		for (let x = 0; x < col; x++) {//7
			array[y][x] = 0;
			// array[y][x] = random(-50, 50);
		}
	}
}

function draw() {
	background(100);
	rotateX(PI / 3);

	flying -= 0.2;
	var yoff = flying;

	for (let y = 0; y < raw; y++) {
		var xoff = 0;
		for (let x = 0; x < col; x++) {
			array[y][x] = map(noise(xoff, yoff), 0, 1, -100, 100);
			xoff += xoffacc;
		}
		yoff += yoffacc;
	}

	translate(-w / 2, -h / 2);

	noFill();
	stroke(59, 223, 118, 100);

	for (let y = 0; y < raw - 1; y++) {
		beginShape(TRIANGLE_STRIP);
		for (let x = 0; x < col; x++) {
			vertex(x * size, y * size, array[y][x]);
			vertex(x * size, (y + 1) * size, array[y + 1][x]);
		}
		endShape();
	}
}