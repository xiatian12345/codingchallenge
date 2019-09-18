/**
 * 贪吃蛇
 */
let snake = null;
let food = null;
const len = 10;
function setup() {
	setFrameRate(8);
	createCanvas(800, 600);

	snake = new Snake(0, 0, len, width, height);

	food = new Food(len, width, height);
}

function keyPressed(e) {
	if (" " === e.key) {
		snake.pauseResume();
	}
	if ("Enter" === e.key) {
		snake.createBodyByTest();
	}
	if ("ArrowLeft" === e.key) {
		snake.setDirection(-1, 0);
	} if ("ArrowRight" === e.key) {
		snake.setDirection(1, 0);
	} if ("ArrowDown" === e.key) {
		snake.setDirection(0, 1);
	} if ("ArrowUp" === e.key) {
		snake.setDirection(0, -1);
	}
}

function draw() {
	background(147);
	snake.deadCheck();

	food.show();

	if (snake.eatFood(food)) {
		food.init();
	}

	snake.update();
	snake.show();
}