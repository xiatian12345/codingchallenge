/**
 * 门格海绵
 */
let angle = 0;
let allBoxes = [];
let mousePressedTimes = 0;
function setup() {
  createCanvas(800, 600, WEBGL);
  let mbox = new Box(0, 0, 0, 200);
  allBoxes.push(mbox);
}

function draw() {
  background(147);
  rotateX(angle);
  rotateY(angle);

  allBoxes.forEach((el) => {
    el.show();
  });
  angle += 0.01;
}

function mousePressed() {
  mousePressedTimes++;
  if (mousePressedTimes >= 3) return;
  let gen = [];
  for (let i = 0; i < allBoxes.length; i++) {
    gen = gen.concat(allBoxes[i].generate());
  }
  allBoxes = gen;
  allBoxes.forEach((el, idx) => {
    el.color = map(idx, 0, allBoxes.length, 0, 255);
    console.log(el.color);
  });
}