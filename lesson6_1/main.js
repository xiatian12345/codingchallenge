/**
 * 细胞分裂递归算法:一个细胞生命周期为3h,每个h分裂生成2个细胞，求n个h之后一共有多少个细胞。
 */
let cells = [];
let cellsLen = 1;
let mousePressedTimes = 1;
let globalLifeTime = 3;
const windowWidth = 800;
const windowHeight = 600;
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < cellsLen; i++) {
    cells[i] = new Cell();
  }
}
function mousePressed(e) {
  let died = 0;
  for (let i = cells.length - 1; i >= 0; i--) {
    if (!cells[i].isDead()) {
      let cell1 = cells[i].generate();
      let cell2 = cells[i].generate();
      cells.push(cell1);
      cells.push(cell2);
      cells[i].grow();
    } else {
      died++;
      cells.splice(i, 1);
    }
  }
  console.log("第 " + mousePressedTimes + " 个h分裂后,死掉的细胞个数为 " + died + " ,细胞的总数为 " + cells.length);
  mousePressedTimes++;
}
function draw() {
  background(147);
  for (let i = 0; i < cells.length; i++) {
    cells[i].update();
    cells[i].show();
  }
}