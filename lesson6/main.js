/**
 * 细胞分裂
 */
let cells = [];
let cellsLen = 5;
const windowWidth = 800;
const windowHeight = 600;
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < cellsLen; i++) {
    cells[i] = new Cell();
  }
}
function mousePressed(e) {
  for (let i = cells.length - 1; i >= 0; i--) {//小心此循环的顺序
    if (dist(e.offsetX, e.offsetY, cells[i].x, cells[i].y) < cells[i].size) {
      let cell1 = cells[i].generate();
      let cell2 = cells[i].generate();
      cells.push(cell1);
      cells.push(cell2);
      cells.splice(i, 1);
    }
  }
}
function draw() {
  background(147);
  for (let i = 0; i < cells.length; i++) {
    cells[i].update();
    cells[i].show();
  }
}