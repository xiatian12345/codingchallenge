/*
  CA -- 细胞自动机
*/

let windowWidth = 820;
let windowHeight = 820;
let ca = null;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  ca = new CA();
}

function draw() {
  let retObj = ca.draw();
  if (retObj.over) {
    saveCanvas(retObj.name, 'png');
    background(120);
  }
}
