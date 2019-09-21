/**
* 迷宫生成:递归回溯算法
* 1.Make the initial cell the current cell and mark it as visited
* 2.While there are unvisited cells
* 	1.If the current cell has any neighbours which have not been visited
* 		1.Choose randomly one of the unvisited neighbours
* 		2.Push the current cell to the stack
* 		3.Remove the wall between the current cell and the chosen cell
* 		4.Make the chosen cell the current cell and mark it as visited
* 	2.Else if stack is not empty
* 		1.Pop a cell from the stack
* 		2.Make it the current cell
* 翻译一下:
* A.将起点作为当前迷宫单元并标记为已访问
* B.当还存在未标记的迷宫单元，进行循环
* 	B1.如果当前迷宫单元有未被访问过的的相邻的迷宫单元
* 		B11.随机选择一个未访问的相邻迷宫单元
* 		B12.将当前迷宫单元入栈
* 		B13.移除当前迷宫单元与相邻迷宫单元的墙
* 		B14.标记相邻迷宫单元并用它作为当前迷宫单元
* 	B2.否则如果当前迷宫单元不存在未访问的相邻迷宫单元，并且栈不空
* 		B21.栈顶的迷宫单元出栈
* 		B22.令其成为当前迷宫单元
 */
const windowWidth = 800;
const windowHeight = 800;
const cellSize = 20;
let grids = [];
let raw = 0;
let col = 0;
let current = null;
let stack = [];
function setup() {
	// frameRate(10);
	strokeWeight = 5;
	createCanvas(windowWidth, windowHeight);
	raw = Math.floor(windowHeight / cellSize);
	col = Math.floor(windowWidth / cellSize);
	for (let r = 0; r < raw; r++) {
		for (let c = 0; c < col; c++) {
			const cell = new Cell(r * cellSize, c * cellSize);
			grids.push(cell);
			cell.isVisited = false;
		}
	}

	//A.将起点作为当前迷宫单元并标记为已访问   
	current = grids[0];
	current.isVisited = true;
}
function deleteWalls(curr, next) {
	if (1 === next.r - curr.r) {
		next.walls[3] = false;
		curr.walls[1] = false;
	} else if (-1 === next.r - curr.r) {
		next.walls[1] = false;
		curr.walls[3] = false;
	}

	if (1 === next.c - curr.c) {
		next.walls[0] = false;
		curr.walls[2] = false;
	} else if (-1 === next.c - curr.c) {
		next.walls[2] = false;
		curr.walls[0] = false;
	}
}
//B.当还存在未标记的迷宫单元，进行循环（这里的draw是一直在循环）
function draw() {
	background(100);

	let next = current.checkNeighbors();//B11.随机选择一个未访问的相邻迷宫单元
	if (next) {//B1.如果当前迷宫单元有未被访问过的的相邻的迷宫单元
		//B12.将当前迷宫单元入栈
		stack.push(current);
		//B13.移除当前迷宫单元与相邻迷宫单元的墙
		deleteWalls(current, next);
		//B14.标记相邻迷宫单元并用它作为当前迷宫单元
		current = next;
		current.isVisited = true;
	} else if (!next && 0 !== stack.length) {//B2.否则如果当前迷宫单元不存在未访问的相邻迷宫单元，并且栈不空
		//B21.栈顶的迷宫单元出栈
		const out = stack.pop();
		//B22.令其成为当前迷宫单元
		current = out;
	}

	for (let r = 0; r < raw; r++) {
		for (let c = 0; c < col; c++) {
			grids[r * col + c].show();
		}
	}

	noStroke();
	fill(255, 0, 0, 255);
	rect(current.x, current.y, cellSize, cellSize);
}