// /*
// //控制像素点的显示
// function setup() {
// 	createCanvas(600, 600);
// 	background(44);
// 	console.log(pixelDensity());
// 	// console.log(pixelWidth)//p5 is not have the var of pixelWidth and pixelHeight
// }

// function draw() {
// 	loadPixels();
// 	let halfImage = 600 * 600 * 2;//整个图像的大小是width * height * 4;其中的4代表的是四个颜色通道
// 	for (let i = 0; i < halfImage; i += 4) {//pixels表示的是所以像素点的信息，pixels[i]表示的是某个像素的的红色部分信息，一整个像素信息是从pixels[i + 0]~pixels[i + 3],其中i 是 4 的整数倍
// 		pixels[i + 0] = 255;
// 		pixels[i + 1] = 255;
// 		pixels[i + 2] = 0;
// 		pixels[i + 3] = 255;
// 	}
// 	updatePixels();
// }
// */

/**
* http://www.karlsims.com/rd.html
* 反应扩散算法
*/
const windowWidth = 100;
const windowHeight = 100;

const seedSize = 10;

let curr = [];
let next = [];

const dA = 1.0;
const dB = 0.5;
const f = 0.055;
const k = 0.062;
const deltaT = 1.0;


function setup() {
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < windowHeight; i++) {
		curr[i] = [];
		next[i] = [];
		for (let j = 0; j < windowWidth; j++) {
			//使用a = 1,b = 0初始化网格
			curr[i][j] = { a: 1, b: 0 };
			next[i][j] = { a: 1, b: 0 };
		}
	}

	pixelDensity(1);//开始没有加这个，出现的图形很怪异。。。。。

	//使用b = 1播种一小块区域
	for (let i = windowHeight / 2 - seedSize / 2; i < windowHeight / 2 + seedSize / 2; i++) {
		for (let j = windowWidth / 2 - seedSize / 2; j < windowWidth / 2 + seedSize / 2; j++) {
			curr[i][j].b = 1;
		}
	}
}

function draw() {
	background(100);

	// //使用公式更新网格
	for (let i = 1; i < windowHeight - 1; i++) {//for (let i = 0; i < windowHeight; i++);i = 1以及i < windowHeight-1的原因是 拉普拉斯函数需要所有邻近的8个网格
		for (let j = 1; j < windowWidth - 1; j++) {
			let oldA = curr[i][j].a;
			let oldB = curr[i][j].b;
			let oldAB2 = oldA * oldB * oldB;
			let new_ = next[i][j];
			new_.a = oldA + deltaT * (dA * laplaceA(i, j) - oldAB2 + f * (1 - oldA));
			new_.b = oldB + deltaT * (dB * laplaceB(i, j) + oldAB2 - (k + f) * oldB);

			new_.a = constrain(new_.a, 0, 1);
			new_.b = constrain(new_.b, 0, 1);
		}
	}

	//显示像素点
	loadPixels();
	for (let i = 0; i < windowHeight; i++) {
		for (let j = 0; j < windowWidth; j++) {
			const r = (i * windowWidth + j) * 4;//乘以4原理见上
			const a = next[i][j].a;
			const b = next[i][j].b;
			let c = floor((a - b) * 255);
			c = constrain(c, 0, 255);
			pixels[r + 0] = c;
			pixels[r + 1] = c;
			pixels[r + 2] = 255;
			pixels[r + 3] = 255;
		}
	}

	updatePixels();

	//交换curr和next
	let temp = curr;
	curr = next;
	next = temp;
}

/*
拉普拉斯算子是通过3x3卷积执行的，中心权重为-1，相邻的邻域为0.2，对角线为0.05
0.05	0.2 	0.05
0.2		-1		0.2
0.05	0.2		0.05
*/
function laplaceA(i, j) {
	let result = 0;

	result += curr[i][j].a * -1;
	result += (curr[i - 1][j].a + curr[i + 1][j].a + curr[i][j - 1].a + curr[i][j + 1].a) * 0.2;
	result += (curr[i - 1][j - 1].a + curr[i + 1][j + 1].a + curr[i + 1][j - 1].a + curr[i - 1][j + 1].a) * 0.05;

	return result;
}

function laplaceB(i, j) {
	let result = 0;

	result += curr[i][j].b * -1;
	result += (curr[i - 1][j].b + curr[i + 1][j].b + curr[i][j - 1].b + curr[i][j + 1].b) * 0.2;
	result += (curr[i - 1][j - 1].b + curr[i + 1][j + 1].b + curr[i + 1][j - 1].b + curr[i - 1][j + 1].b) * 0.05;

	return result;
}