/*
  2D-Asteroids 2D星际争霸游戏
*/

let windowWidth = 800;
let windowHeight = 600;

let enemys = [];
let hero = null;
let enemyLen = 10;
const deadRadius = 8;

function setup() {
  createCanvas(windowWidth, windowHeight);
  hero = new Hero();
  for (let i = 0; i < enemyLen; i++) {
    enemys.push(new Enemy(createVector(random(0, windowWidth), random(0, windowHeight)), 30));
  }
}

function keyPressed(e) {
  hero.keyHandlePress(e.key);
}
function keyReleased(e) {
  hero.keyHandleRelease(e.key);
}
function draw() {
  background(120);
  hero.render();
  hero.checkHit(enemys);
  for (let i = enemys.length - 1; i >= 0; i--) {
    let enemy = enemys[i];
    if (enemy.isDead) {
      let newEnemy = enemy.deadHandle();
      enemys.splice(i, 1);
      enemys = enemys.concat(newEnemy);
    } else {
      enemy.render();
    }
  }

  console.log(enemys.length);
}