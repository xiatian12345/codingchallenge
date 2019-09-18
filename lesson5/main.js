/**
 * 太空侵略
 */
const windowWidth = 800;
const windowHeight = 600;
let shooter = null;
let spacecrafts = [];
let spacecraftsLen = 10;
let spacecraftsDirX = -1;
let spacecraftsDirY = 1;
function setup() {
	createCanvas(windowWidth, windowHeight);
	shooter = new Shooter();
	for (let i = 0; i < spacecraftsLen; i++) {
		spacecrafts[i] = new Spacecraft(160 + i * 50, 50, 50);
	}
}
function keyPressed(e) {
	if ("ArrowLeft" === e.key) {
		shooter.continueMove = true;
		shooter.move(-1);
	} else if ("ArrowRight" === e.key) {
		shooter.continueMove = true;
		shooter.move(1);
	}

	if (" " === e.key) {
		shooter.continueShoot(true);
	}
}
function keyReleased(e) {
	if ("Enter" === e.key) {
		shooter.continueMove = false;
	}
	if (" " === e.key) {
		shooter.continueShoot(false);
	}

}
function draw() {
	background(147);
	shooter.update(spacecrafts);
	shooter.show();
	for (let i = 0; i < spacecraftsLen; i++) {
		if ((spacecrafts[i]).x > windowWidth) {
			spacecraftsDirX = -1;
			spacecraftsDirY = 1;
		} else {
			spacecraftsDirY = 0;
		}
		if ((spacecrafts[i]).x < 0) {
			spacecraftsDirX = 1;
			spacecraftsDirY = 1;
		} else {
			spacecraftsDirY = 0;
		}
	}
	for (let i = 0; i < spacecraftsLen; i++) {
		spacecrafts[i].dirX = spacecraftsDirX;
		spacecrafts[i].dirY = spacecraftsDirY;
		spacecrafts[i].update();
		spacecrafts[i].show();
	}
}