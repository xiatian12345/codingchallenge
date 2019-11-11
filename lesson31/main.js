/**
* Diffusion-limited Aggregation DLA 扩散限制凝聚
* 基本思想是：首先置一初始粒子作为种子，在远离种子的任意位置随机产生一个粒子使其做无规行走，直至与种子接触，成为集团的一部分；然后再随机产生一个粒子，重复上述过程，这样就可以得到足够大的DLA团簇（cluster）。
*/
const windowWidth = 600;
const windowHeight = 600;
let radius = 20;
let maxRadius = radius;
let minRadius = radius / 2;
let tree = [];
let walkers = [];
let maxWalkers = 40;
let radiusReduceAcc = 0.95;
let cycleTimes = 400;
let currentColor = 0;


function setup() {
	colorMode(HSB);
	createCanvas(windowWidth, windowHeight);
	tree.push(new Walker(true, createVector(windowWidth / 2, windowHeight / 2)));
	radius *= radiusReduceAcc;
	for (let i = 0; i < maxWalkers; i++) {
		walkers.push(new Walker(false));
	}
	radius *= radiusReduceAcc;
}
function show(arr) {
	for (let i = 0; i < arr.length; i++) {
		arr[i].show();
	}
}
function step(walkers) {
	for (let j = 0; j < cycleTimes; j++) {
		for (let i = walkers.length - 1; i >= 0; i--) {
			let walker = walkers[i];
			walker.walk();
			if (walker.joinTree(tree)) {
				tree.push(walker);
				walker.color = currentColor % 255;
				currentColor += 3;
				walker.isTree = true;
				walkers.splice(i, 1);
			}
		}
	}

	if (radius > 5) {
		for (let i = walkers.length; i < maxWalkers; i++) {
			walkers.push(new Walker(false));
			radius *= radiusReduceAcc;
			constrain(radius, minRadius, maxRadius);
		}
	}
}
function draw() {
	background(120);
	show(tree);
	show(walkers);
	step(walkers);
}
