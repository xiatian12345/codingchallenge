/**
* Lindenmayer System
*/
const windowWidth = 1800;
const windowHeight = 3600;
let rules = null;
let len = 50;
const angle = Math.PI / 3;
let mousePressedTimes = 0;
const mouseTotalPressTimes = 5;
let material = "F";//母体，从该字符串开始分裂

function setup() {
	background(100);
	createCanvas(windowWidth, windowHeight);
	rules = [
		{
			from: "F",
			to: "FFFF+[+F-F-F]-[-F+F+F]"
		}
	];
}

function mousePressed() {
	if (mousePressedTimes >= mouseTotalPressTimes) return;
	mousePressedDelegate();
	drawTree();
	mousePressedTimes++;
}

function drawTree() {
	background(100);
	len *= 0.5;
	translate(windowWidth / 2, windowHeight);
	for (let i = 0; i < material.length; i++) {
		const char = material[i];
		if ("F" === char) {
			stroke(0, 255, 0, 150);
			line(0, 0, 0, -len);
			translate(0, -len);
			if (material[i + 1] && material[i + 1] !== "F") {
				stroke(255, 0, 0, 100)
				circle(0, 0, 2, 2);
			}
		} else if ("+" === char) {
			rotate(angle);
		} else if ("-" === char) {
			rotate(-angle);
		} else if ("[" === char) {
			push();
		} else if ("]" === char) {
			pop();
		}
	}
}

function mousePressedDelegate() {
	let ret = "";
	for (let j = 0; j < material.length; j++) {
		let char = material[j];
		let isMatch = false;
		for (let i = 0; i < rules.length; i++) {
			let rule = rules[i];
			if (rule.from === char) {
				ret += rule.to;//规则匹配上之后就直接替换
				isMatch = true;
				break;
			}
		}
		if (!isMatch) {
			ret += char;//没有匹配就直接放下来
		}
	}
	material = ret;
}

function draw() {
	// background(100);
}
