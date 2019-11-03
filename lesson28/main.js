/**
* FlappyBird 
*/
const windowWidth = 600;
const windowHeight = 600;
let bird = null;
let force = null;
let wallManager = null;

function setup() {
	createCanvas(windowWidth, windowHeight);
	wallManager = new WallManager();
	bird = new Bird();
	force = createVector(0, 0.2);
}
function keyPressed(evt) {
	if ("Space" === evt.code) {
		bird.applyForce(createVector(0, -4));
	}
}
function draw() {
	background(120);
	bird.applyForce(force);
	bird.run();

	wallManager.run();
	wallManager.checkCollide(bird);
}