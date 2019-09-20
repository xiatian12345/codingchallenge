/**
 * 3D太阳系模拟
 */
const windowWidth = 800;
const windowHeight = 600;
let sun = null;
let easyCam = null;
function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	easyCam = createEasyCam();
	sun = new Planet(0, 100, 0, random(TWO_PI));
	sun.moonFollow(4, 3);
}
function draw() {
	background(100);
	// lights();
	ambientLight(110, 110, 110);
	pointLight(110, 110, 110, 0, 0, 0);
	// translate(windowWidth / 2, windowHeight / 2);
	sun.update();
	sun.show();
}