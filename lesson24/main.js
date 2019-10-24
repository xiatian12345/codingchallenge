/**
* firework 烟花
*/
const windowWidth = 600;
const windowHeight = 600;
let gravity = null;
let fireworks = [];
let explodSound = null;
let upupSound = null;

function preload() {
	soundFormats('wav');
	explodSound = loadSound('assets/explod.wav');
	upupSound = loadSound('assets/upup.wav');
}

function setup() {
	gravity = createVector(0, 0.15);
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	if (random() < 0.05) {
		upupSound.setVolume(1);
		upupSound.play();
		fireworks.push(new Firework(createVector(random(0, windowWidth), windowHeight), createVector(0, random(-9, -15)), true));
	}
	for (let i = fireworks.length - 1; i >= 0; i--) {
		fireworks[i].applyForce(gravity);
		fireworks[i].update();
		if (fireworks[i].isFinish()) {
			fireworks.splice(i, 1);
		}
	}
}
