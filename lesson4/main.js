/**
 * 紫雨
 */
let rains = [];
const rainCount = 600;
const windowWidth = 800;
const windowHeight = 600;
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < rainCount; i++) {
    rains[i] = new Rain();
  }
}
function draw() {
  background(147);
  for (let i = 0; i < rainCount; i++) {
    rains[i].update();
    rains[i].show();
  }
}