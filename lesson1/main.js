/**
 * 宇宙星空
 */

const starsCount = 100;
const stars = [];
window.speed = 0;

function setup() {
	createCanvas(800, 600);
	for (let i = 0; i < starsCount; i++) {
		stars[i] = new Star();
	}
}

function draw() {
	window.speed = map(mouseX, 0, width, -10, 10);
	background(147, 145, 160, 40);
	translate(width / 2, height / 2);
	for (let i = 0; i < stars.length; i++) {
		stars[i].update();
		stars[i].show();
	}
}