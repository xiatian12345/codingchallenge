/**
* 3D firework 3D烟花
*/
const windowWidth = 600;
const windowHeight = 600;
let gravity = null;
let fireworks = [];
let explodSound = null;
let upupSound = null;
let easyCam = null;

function preload() {
	soundFormats('wav');
	explodSound = loadSound('assets/explod.wav');
	upupSound = loadSound('assets/upup.wav');
}

function setup() {
	gravity = new p5.Vector(0, 0.15, 0);
	createCanvas(windowWidth, windowHeight, WEBGL);
	easyCam = createEasyCam();
}

function draw() {
	background(0);
	if (random() < 0.1) {
		upupSound.setVolume(1);
		upupSound.play();
		fireworks.push(new Firework(new p5.Vector(random(-windowWidth / 2, windowWidth / 2), windowHeight / 2, random(-windowWidth / 2, windowWidth / 2)), new p5.Vector(0, random(-9, -15), 0), true));
	}
	for (let i = fireworks.length - 1; i >= 0; i--) {
		fireworks[i].applyForce(gravity);
		fireworks[i].update();
		if (fireworks[i].isFinish()) {
			fireworks.splice(i, 1);
		}
	}
}
