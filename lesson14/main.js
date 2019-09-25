/**
* http://www.karlsims.com/rd.html
* 分型树
*/
const windowWidth = 800;
const windowHeight = 600;
let root = null;
let branches = [];
const len = 200;

function setup() {
	createCanvas(windowWidth, windowHeight);
	root = new Branch(createVector(windowWidth / 2, windowHeight), createVector(windowWidth / 2, windowHeight - len), 0);
	branches.push(root);
}

function mousePressed() {
	for (let i = branches.length - 1; i >= 0; i--) {
		if (!branches[i].isGenerate && !branches[i].isLeaf) {
			branches.push(branches[i].generateLeft());
			branches.push(branches[i].generateRight());
			branches[i].isGenerate = true;
		}
	}
}

function draw() {
	background(100);
	for (let i = 0; i < branches.length; i++) {
		branches[i].show();
	}
}