/**
* PerlinNoiseFlowField 柏林噪声流场
*/
const windowWidth = 800;
const windowHeight = 600;
const gradSize = 20;
const increase = 0.05;
const raws = Math.floor(windowHeight / gradSize);
const cols = Math.floor(windowWidth / gradSize);
const particleLen = 100;
let particles = [];

let zoff = 0;
const zoffacc = 0.00005;
let vecs = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 255);
	for (let i = 0; i < particleLen; i++) {
		particles.push(new Particle());
	}
}

function draw() {
	// background(124);
	stroke(255, 0, 0, 255);
	noFill();
	let yoff = 0;
	for (let i = 0; i < raws; i++) {
		let xoff = 0;
		for (let j = 0; j < cols; j++) {
			xoff += increase;
			push();
			let angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
			let v = p5.Vector.fromAngle(angle);
			v.setMag(1);

			let x = j * gradSize;
			let y = i * gradSize;
			translate(x, y);
			rotate(v.heading());

			// rect(0, 0, gradSize, gradSize);
			// line(0, 0, 0, gradSize);
			pop();

			let index = i * cols + j;
			vecs[index] = v;
		}
		yoff += increase;
		zoff += zoffacc;
	}
	for (let i = 0; i < particleLen; i++) {
		particles[i].follow(vecs);
		particles[i].update();
		particles[i].show();
		particles[i].checkEdge();
	}
}



