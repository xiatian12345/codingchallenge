/**
* http://bzhang.lamost.org/website/archives/lorenz_attactor/
* 混沌数学之洛伦兹吸引子
*/
const windowWidth = 800;
const windowHeight = 800;

const a = 10;
const b = 28;
const c = 8.0 / 3;
let dx;
let dy;
let dz;

let x = 3.01;
let y = 0;
let z = 0;

let easyCam = null;

let points = [];

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	strokeWeight(1);
	// background(100);
	easyCam = createEasyCam();
}

function draw() {
	background(100);

	stroke(255, 0, 0, 255);
	noFill();

	let dt = 0.005;
	dx = a * (y - x) * dt;
	dy = (x * (b - z) - y) * dt;
	dz = (x * y - c * z) * dt;


	x += dx;
	y += dy;
	z += dz;

	points.push({ x: x, y: y, z: z });
	// translate(windowWidth / 2, windowHeight / 2);
	scale(6);

	beginShape();
	for (let i = 0; i < points.length; i++) {
		let p = points[i];
		vertex(p.x, p.y, p.z);
	}
	endShape();
}