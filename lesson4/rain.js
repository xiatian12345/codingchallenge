class Rain {
    constructor() {
        this.init();
    }
    init() {
        this.x = random(windowWidth);
        this.y = random(-240, -50);
        this.z = random(1, 10);
        this.ySpeed = map(this.z, 1, 10, 0, 8);
        this.yAcclerate = map(this.z, 1, 10, 0.01, 0.03);
        this.len = map(this.z, 1, 10, 5, 15);
    }
    update() {
        this.ySpeed += this.yAcclerate;
        this.y += this.ySpeed;
        if (this.y > windowHeight + 20) {
            this.init();
        }
    }
    show() {
        stroke(230, 23, 230, 255);
        let weight = map(this.z, 1, 10, 1, 3);
        strokeWeight(weight);
        line(this.x, this.y, this.x, this.y + this.len);
    }
}