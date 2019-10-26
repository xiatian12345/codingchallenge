/**
* 2D MetaBall 2D融球
*/
const windowWidth = 400;
const windowHeight = 400;
let center = null;
let balls = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);
	for (let i = 0; i < 6; i++) {
		balls.push(new Ball());
	}
}

function draw() {
	loadPixels();
	for (let i = 0; i < windowWidth; i++) {
		for (let j = 0; j < windowHeight; j++) {
			let color_ = 0;
			for (let k = 0; k < balls.length; k++) {
				let d = dist(i, j, balls[k].pos.x, balls[k].pos.y);
				color_ += 160 * (balls[k].r / d);//小球对每个像素点的颜色贡献之和作为改像素点的真正颜色
			}
			set(i, j, color(color_, color_, 255, 255));
		}
	}
	updatePixels();

	for (let i = 0; i < balls.length; i++) {
		balls[i].update();
		// balls[i].show();
	}
}
