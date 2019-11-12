/**
* Travelling Salesman Problem TSP 旅行商问题
*/

const windowWidth = 800;
const windowHeight = 800;
let citys = [];
const cityLen = 10;
let allFullPermuation = [];
let currentStep = 0;
let endFlag = false;
let minLength = Infinity;
let shortestPath = [];


function setup() {
	createCanvas(windowWidth, windowHeight);
	if (cityLen > 10) return;
	for (let i = 0; i < cityLen; i++) {
		citys[i] = createVector(random(windowWidth), random(windowHeight));
	}
	allFullPermuation = getFullPermutations(citys);
}

function showMinPath() {
	stroke(0, 255, 0, 255);
	strokeWeight(5);
	for (let i = 0; i < shortestPath.length - 1; i++) {
		line(shortestPath[i].x, shortestPath[i].y, shortestPath[i + 1].x, shortestPath[i + 1].y);
	}
}

function showCities() {
	showMinPath();

	fill(0, 0, 255, 255);
	noStroke();
	for (let i = 0; i < cityLen; i++) {
		let city = citys[i];
		ellipse(city.x, city.y, 12, 12);
	}

	if (!endFlag) {
		let currentCity = allFullPermuation[currentStep];
		let pathLen = 0;
		for (let i = 0; i < currentCity.length - 1; i++) {
			let tempDist = dist(currentCity[i].x, currentCity[i].y, currentCity[i + 1].x, currentCity[i + 1].y);
			pathLen += tempDist;
		}
		if (minLength > pathLen) {
			minLength = pathLen;
			shortestPath = currentCity.slice();
		}

		noFill();
		stroke(255, 0, 0, 200);
		strokeWeight(2);
		beginShape();
		for (let i = 0; i < cityLen; i++) {
			let city = currentCity[i];
			vertex(city.x, city.y);
		}
		endShape();
	}

	currentStep++;
	if (currentStep > allFullPermuation.length - 1) {
		currentStep = allFullPermuation.length - 1;
		endFlag = true;
	}
}

function draw() {
	background(120);
	showCities();
	showText();
}

function getFullPermutations(arr) {//获取数组的全排列
	let ret = [];
	if (1 === arr.length) {
		return [arr];
	} else {
		for (let k = 0; k < arr.length; k++) {
			exchange(arr, k, 0);

			let firstElem = arr[0];
			let secondElems = arr.slice(1);
			let secondPermutations = getFullPermutations(secondElems);
			for (let i = 0; i < secondPermutations.length; i++) {
				let array = secondPermutations[i];
				array.splice(i, 0, firstElem);
				ret.push(array);
			}

			exchange(arr, k, 0);
		}
		return ret;
	}
}

function exchange(arr, i, j) {
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}

function showText() {
	let percent = currentStep / allFullPermuation.length;
	if (endFlag) percent = 100;

	let str = percent + "  %  is completed";
	textSize(32);
	textAlign(CENTER, CENTER);
	fill(0, 255, 255, 255);
	text(str, windowWidth / 2, windowHeight - 50);
}