/**
 * 2D太阳系模拟
 */
const windowWidth = 800;
const windowHeight = 600;
let sun = null;
function setup() {
	createCanvas(windowWidth, windowHeight);
	sun = new Planet(0, 100, 0, random(TWO_PI));
	sun.moonFollow(4, 3);
}
function draw() {
	background(100);
	translate(windowWidth / 2, windowHeight / 2);
	sun.update();
	sun.show();
}