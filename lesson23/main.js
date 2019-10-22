/**
* SphereGeometry 球体几何
* http://mathworld.wolfram.com/SphericalCoordinates.html
*/
/*
longtitude 经度---lon---0 ~ 2PI
latitude 纬度---lat---0 ~ PI
radius 球半径---r
x = r * cos(lon) * sin(lat);
y = r * sin(lon) * sin(lat);
z = r * cos(lat);
*/
const windowWidth = 600;
const windowHeight = 600;
const vecSize = 100;
let vec = [];
const r = 200;
let lon = null;
let lat = null;
let easyCam = null;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	// colorMode(HSB);
	easyCam = createEasyCam();
	for (let i = 0; i < vecSize + 1; i++) {
		vec[i] = [];
		lon = map(i, 0, vecSize, 0, TWO_PI);
		for (let j = 0; j < vecSize + 1; j++) {
			lat = map(j, 0, vecSize, 0, PI);
			let x = r * cos(lon) * sin(lat);
			let y = r * sin(lon) * sin(lat);
			let z = r * cos(lat);
			vec[i][j] = createVector(x, y, z);
		}
	}
}

function draw() {
	background(100);
	noStroke();
	normalMaterial();
	// translate(windowWidth / 2, windowHeight / 2);
	beginShape(TRIANGLE_STRIP);
	for (let i = 0; i < vecSize; i++) {
		for (let j = 0; j < vecSize + 1; j++) {
			var flag = i % 3;
			if (0 === flag) {
				fill(255, 0, 0, 255);
			} else if (1 === flag) {
				fill(0, 255, 0, 255);
			} else if (2 === flag) {
				fill(0, 0, 255, 255);
			}
			var vec1 = vec[i][j];
			vertex(vec1.x, vec1.y, vec1.z);
			var vec2 = vec[i + 1][j];
			vertex(vec2.x, vec2.y, vec2.z);
		}
	}
	endShape(CLOSE);
}
