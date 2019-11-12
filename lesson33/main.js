/**
* Blobby
*/
const windowWidth = 600;
const windowHeight = 600;
const pointLen = 200;
let radius = 200;
let rotateAngle = 0;
const randDelta = 2;
let xoff = 0;
let yoff = 0;


function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(120);
	// noFill();
	fill(0, 255, 0, 255);
	strokeWeight(4);
	stroke(0, 255, 0, 255);
	translate(windowWidth / 2, windowHeight / 2);
	rotate(rotateAngle);
	rotateAngle += 0.01;

	xoff = 0;
	beginShape();
	for (let i = 0; i < pointLen; i++) {
		let angle = TWO_PI * i / pointLen;
		// let myRadius = radius + random(-1 * randDelta, randDelta);
		let noiseValue = noise(xoff, yoff);
		xoff += 0.1;
		let myRadius = radius + map(noiseValue, 0, 1, -20, 20);
		let x = myRadius * cos(angle);
		let y = myRadius * sin(angle);
		vertex(x, y);
	}
	endShape(CLOSE);

	yoff += 0.01;
}
