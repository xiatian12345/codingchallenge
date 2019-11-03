/**
* Game Of Life  
* https://en.wikipedia.org/wiki/The_Game_of_Life
*/
const windowWidth = 800;
const windowHeight = 800;
const size = 20;
const raw = Math.floor(windowHeight / size);
const col = Math.floor(windowWidth / size);
let curr = [];
let before = [];


function setup() {
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < col; i++) {
		let temp = [];
		let temp2 = [];
		for (let j = 0; j < raw; j++) {
			//one
			// temp2[j] = temp[j] = floor(random(1, 3) - 1);

			//two
			// temp2[j] = temp[j] = 1;
			// if (0.1 >= Math.random()) {
			// 	temp2[j] = temp[j] = 0;
			// }

			//three
			if (i === j) {
				temp2[j] = temp[j] = 0;
			} else {
				temp2[j] = temp[j] = 1;
			}
		}
		curr[i] = temp;
		before[i] = temp2;
	}


}

function draw() {
	frameRate(5);
	background(120);
	for (let i = 1; i < col - 1; i++) {
		for (let j = 1; j < raw - 1; j++) {
			let count = 0;
			let flag = 0;
			for (let k = -1; k <= 1; k++) {
				for (let m = -1; m <= 1; m++) {
					count += before[i + k][j + m];
				}
			}
			count -= before[i][j];

			if (count >= 3 && before[i][j]) {//如果细胞存活，且邻居多余3个，那么会因为个体过剩二死去
				flag = 0;
			} else if (count < 2 && before[i][j]) {//如果细胞或者，企鹅邻居少于2个，那么会因为孤独二死去
				flag = before[i][j];
			} else if (!before[i][j] && count >= 3) {//如果细胞 死亡，且邻居多余三个，那么会重生
				flag = 1;
			} else { //其余情况不变
				flag = before[i][j];
			}
			curr[i][j] = flag;
		}
	}


	for (let i = 0; i < col; i++) {
		for (let j = 0; j < raw; j++) {
			if (1 === curr[i][j]) {
				fill(255);
			} else {
				fill(0);
			}
			noStroke();
			rect(i * size, j * size, size, size);

			before[i][j] = curr[i][j];
		}
	}

}