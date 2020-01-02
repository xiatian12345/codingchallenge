/*
  circle-packing-animated 圆堆图动画
*/

let windowWidth = 800;
let windowHeight = 800;
let circleRoot = null;
let circles = [];



const rootDimeter = windowWidth - 8;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  circleRoot = new Round(windowWidth / 2, windowHeight / 2, rootDimeter / 2);
}

function draw() {
  background(120);
  circleRoot.show();

  let maxGenerateSpeed = 2;
  let curGenerateSpeed = 0;
  let generateMaxNum = 30;

  while (curGenerateSpeed < maxGenerateSpeed) {
    let newCircle = generateNewRound();
    if (newCircle) {
      circles.push(newCircle);
      curGenerateSpeed++;
    } else {
      generateMaxNum--;
      if (0 >= generateMaxNum) {
        console.log("over");
        noLoop();
      }
    }

  }

  for (let i = 0; i < circles.length; i++) {
    for (let j = 0; j < circles.length; j++) {
      if (i != j) {
        let c1 = circles[i];
        let c2 = circles[j];
        if (c1.crossing(c2) || c2.crossing(c1)) {
          c1.growing = false;
          c2.growing = false;
        }
      }
    }
  }


  for (let i = 0; i < circles.length; i++) {
    if (dist(circles[i].x, circles[i].y, windowWidth / 2, windowHeight / 2) + circles[i].r > rootDimeter * 0.5) {
      circles[i].growing = false;
    }
    circles[i].update();
  }
}

function generateNewRound() {
  let ret = null;

  let randAngle = random(0, Math.PI * 2);
  let randLen = random(0, rootDimeter * 0.5);
  let randX = Math.cos(randAngle) * randLen + rootDimeter * 0.5;
  let randY = Math.sin(randAngle) * randLen + rootDimeter * 0.5;

  for (let i = 0; i < circles.length; i++) {
    if (dist(randX, randY, circles[i].x, circles[i].y) < (circles[i].r + 4) ||
      dist(randX, randY, circleRoot.x, circleRoot.y) > (circleRoot.r - 4)
    ) {
      return null;
    }
  }
  ret = new Round(randX, randY, 0);
  return ret;
}