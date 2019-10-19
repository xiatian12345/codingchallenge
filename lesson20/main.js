/**
* MandelbrotSet 曼德博集合
* https://zh.wikipedia.org/wiki/%E6%9B%BC%E5%BE%B7%E5%8D%9A%E9%9B%86%E5%90%88
* http://paulbourke.net/geometry/supershape/
*/
/* 
 let pink = color(255, 102, 204, 255);
 loadPixels();
 let d = pixelDensity();
 let halfImage = 4 * (width * d) * (height * d);
 for (let i = 0; i < halfImage; i += 4) {
 	pixels[i + 0] = red(pink);
 	pixels[i + 1] = green(pink);
 	pixels[i + 2] = blue(pink);
 	pixels[i + 3] = alpha(pink);
 }
 updatePixels();
*/
const windowWidth = 1600;
const windowHeight = 1600;
let dark = 0;
let bright = 255;
let maxRepeat = 100;
let convergenceValue = 16;

function setup() {
	createCanvas(windowWidth, windowHeight);
	pixelDensity(1);
}

function draw() {
	loadPixels();

	for (let i = 0; i < windowWidth; i++) {
		for (let j = 0; j < windowHeight; j++) {
			// let c = createVector(i, j);//c = ai + b;

			let valueN = 0;
			let repeat = 0;

			let a = map(i, 0, windowWidth, -1.5, 1.5);
			let b = map(j, 0, windowHeight, -1.5, 1.5);

			let tempA = a;
			let tempB = b;

			while (repeat < maxRepeat) {
				let nextA_ = a * a - b * b;
				let nextB_ = 2 * a * b;

				a = nextA_ + tempA;
				b = nextB_ + tempB;

				valueN = a * a + b * b;

				if (valueN > convergenceValue) break;
				repeat++;
			}

			bright = map(repeat, 0, maxRepeat, 0, 1);
			bright = map(sqrt(bright), 0, 1, 0, 255);

			if (repeat == maxRepeat) {
				bright = 0;
			}

			let k = (i * windowHeight + j) * 4;
			pixels[k + 0] = 110;
			pixels[k + 1] = bright;
			pixels[k + 2] = 110;
			pixels[k + 3] = 255;
		}
	}
	updatePixels();

	noLoop();
}
