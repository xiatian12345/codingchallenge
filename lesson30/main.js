/**
* Poisson-Disc 泊松分布算法
* https://bindog.github.io/blog/2014/08/09/visualizing-algorithms/
*/
const windowWidth = 800;
const windowHeight = 800;
let r = 35;
let randGenLen = 10;
let ball = null;
let ballRed = [];
let ballWhite = [];
let ballBlack = [];

// function mousePressed() {
// 	step();
// 	background(120);
// 	show(ballRed);
// 	show(ballWhite);
// 	show(ballBlack);
// }

function setup() {
	createCanvas(windowWidth, windowHeight);
	ball = new Ball(createVector(windowWidth / 2, windowHeight / 2), "R");
	ballRed.push(ball);
}
function show(arr) {
	for (let i = 0; i < arr.length; i++) {
		arr[i].show();
	}
}
function randomChoice(arr) {
	let len = arr.length;
	let index = Math.floor(random(0, len));
	return { choice: arr[index], idx: index };
}
function isOutside(ball) {
	let pos = ball.pos;
	return pos.x < 0 || pos.x > windowWidth || pos.y < 0 || pos.y > windowHeight;
}
function step() {
	if (!ballRed.length) {//如果没有红点了，那么结束算法
		console.log("算法结束");
		noLoop();
		return;
	}
	//随机选择一个红点
	let ret = randomChoice(ballRed);
	let choice = ret.choice;
	let choiceIndex = ret.idx;
	// console.log(choiceIndex);
	ballWhite = [];
	//以改点为圆心r和2r做一个圆环，然后再该圆环中随机生成数个白点
	for (let i = 0; i < randGenLen; i++) {
		let randAngle = Math.random() * TWO_PI;
		let randLen = Math.random() * r + r;
		let randX = sin(randAngle) * randLen;
		let randY = cos(randAngle) * randLen;
		let randBall = new Ball(createVector(randX + choice.pos.x, randY + choice.pos.y), "W");
		ballWhite.push(randBall);
	}
	//接下来就是从这些白点中选择合适的作为红点，如果没有合适的那么该红点变黑
	//讲红点和黑点联合起来作为一个集合，以r为圆心做灰色区域，依次遍历所有生成的白点是否在灰色区域中
	let concatArr = ballRed.concat(ballBlack);
	let willToRed = [];//将要从白点变成红点的集合
	for (let j = ballWhite.length - 1; j >= 0; j--) {
		let flag = 0;//不在灰色区域
		for (let i = 0; i < concatArr.length; i++) {
			let di = dist(concatArr[i].pos.x, concatArr[i].pos.y, ballWhite[j].pos.x, ballWhite[j].pos.y);
			if (di < r) {
				flag = 1;
			}
		}
		if (flag || isOutside(ballWhite[j])) {//在灰色区域或者位于边框外
			//删除该白点，应为不满足条件
			// console.log("删除白点。。。。。");
			ballWhite.splice(j, 1);
		} else {
			willToRed.push(ballWhite[j]);
		}
	}

	if (0 === ballWhite.length) { //如果生成的那些白点都在灰色区域
		choice.setColor("B");
		ballRed.splice(choiceIndex, 1);
		ballBlack.push(choice);
	} else {//只需要一个，其余的全删掉
		for (let i = willToRed.length - 1; i >= 0; i--) {
			if (0 === i) {
				let ball = willToRed[i];
				ball.setColor("R");
			} else {
				willToRed.splice(i, 1);
			}
		}
		ballRed = ballRed.concat(willToRed);
	}

	//如果红点超过了canvas区域，删除之
	for (let i = ballRed.length - 1; i >= 0; i--) {
		if (isOutside(ballRed[i])) {
			ballRed.splice(i, 1);
		}
	}
}
function draw() {
	background(120);
	show(ballRed);
	show(ballWhite);
	show(ballBlack);
	step();
}
