/**
 * 3D太阳系模拟
 */
const windowWidth = 800;
const windowHeight = 600;
let sun = null;
let easyCam = null;
let imgs = [];
function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	easyCam = createEasyCam();
	const names = ['earth', 'mars', 'mercury', 'sun'];
	for (let i = 0; i < 4; i++) {
		imgs.push(loadImage('data/' + names[i] + '.jpg'));
	}
	sun = new Planet(0, 100, 0.01, random(TWO_PI), imgs[3]);
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