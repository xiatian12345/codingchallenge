/**
* agar.io
*/
const windowWidth = 800;
const windowHeight = 800;
let blobby = null;
let foodLen = 1000;
let foodArr = [];
let scaleFactor = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blobby = new Blobby(createVector(0, 0), 20);
  for (let i = 0; i < foodLen; i++) {
    foodArr.push(new Food(createVector(random(-2 * windowWidth, windowWidth * 2), random(-2 * windowWidth, windowWidth * 2)), 8));
  }
}
function successFunc() {
  scale(scaleFactor);
  scaleFactor *= 0.9999998;
}

function draw() {
  background(120);
  translate(windowWidth / 2, windowHeight / 2);

  successFunc();

  blobby.update(foodArr);
  blobby.show();

  foodLen = foodArr.length;
  for (let i = 0; i < foodLen; i++) {
    foodArr[i].update(blobby);
    foodArr[i].show();
  }
}