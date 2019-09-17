class Shooter {
    constructor() {
        this.init();
    }
    init() {
        this.len = 20;
        this.speed = 8;
        this.dir = 0;
        this.x = windowWidth / 2;
        this.y = windowHeight - this.len;
        this.bullets = [];
        this.garbageBullets = [];//子弹回收
        this.continueMove = false;
    }
    fire() {
        let bullet = null;
        if (0 === this.garbageBullets.length) {
            bullet = new Bullet(this.x + this.len * 0.618 / 2, this.y - this.len * 0.618 / 2);
        } else {
            bullet = this.garbageBullets.shift();
            bullet.reset(this.x + this.len * 0.618 / 2, this.y - this.len * 0.618 / 2);
        }
        this.bullets.push(bullet);
    }
    move(dir) {
        this.dir = dir * this.speed;
        if (this.continueMove) this.x += this.dir;
    }
    continueShoot(isContinueShoot) {
        this.isContinueShoot = isContinueShoot;

        const self = this;
        if (this.isContinueShoot) {
            if (this.intervalId) clearInterval(this.intervalId);
            this.intervalId = setInterval(self.fire.bind(self), 100);
        } else {
            clearInterval(this.intervalId);
        }
    }
    update(spacecrafts) {
        if (this.continueMove) {
            this.x += this.dir;
        }
        this.x = constrain(this.x, 0, windowWidth - this.len * 0.618);

        //遍历飞船和子弹
        this.bullets.forEach((bullet, index) => {
            if (bullet.y <= -50 || bullet.collide(spacecrafts)) {
                bullet.isDead = true;
                let outBullets = this.bullets.splice(index, 1);
                this.garbageBullets = this.garbageBullets.concat(outBullets);
            } else {
                bullet.update();
            }
        });
    }
    show() {
        fill(8, 243, 237, 255);
        noStroke();
        rect(this.x, this.y, this.len * 0.618, this.len);

        this.bullets.forEach((bullet) => {
            bullet.show();
        });
    }
}