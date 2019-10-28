/**
* phyllotaxis 叶序----叶子在茎上的排列成的螺旋形式
* https://www.geeksforgeeks.org/algorithmic-botany-phyllotaxis-python/
*/
const windowWidth = 600;
const windowHeight = 600;
let n = 0;
let c = 6;
var angle = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);
	angleMode(DEGREES);
	background(120);
}

function draw() {
	background(120);
	translate(windowWidth / 2, windowHeight / 2);
	rotate(angle * 0.2);
	for (let i = 0; i < n; i++) {
		var theta = i * 137.508;
		var r = c * Math.sqrt(i);
		var x = r * Math.cos(theta);
		var y = r * Math.sin(theta);
		var ang = sin(angle + i * 0.5);
		fill(map(ang, -1, 1, 0, 255), 255, 255, 255);
		noStroke();
		ellipse(x, y, 6, 6);
	}
	angle += 5;
	if (n < 1600) n += 2;
}