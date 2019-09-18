class Cell {
    constructor(x, y, size) {
        this.init(x, y, size);
    }
    init(x, y, size) {
        this.size = size || 40;
        this.currentLifeTime = 1;
        this.x = x || random(this.size, windowWidth - this.size);
        this.y = y || random(this.size, windowHeight - this.size);
        this.lifeTime = globalLifeTime;

        this.originalSize = 40;
        this.growAccelerate = 0.04;
    }
    grow() {
        if (this.isDead()) return;
        this.currentLifeTime++;
    }
    isDead() {
        return this.currentLifeTime > globalLifeTime;
    }
    generate() {
        return new Cell(this.x + random(-65, 65), this.y + random(-65, 65), this.size * 0.7);
    }
    update() {
        this.x += random(-1, 1);
        this.y += random(-1, 1);
        if (this.size < this.originalSize) {
            this.size += this.growAccelerate;
        }
    }
    show() {
        noStroke();
        let color = map(this.currentLifeTime, 0, this.lifeTime, 255, 0);
        let opacity = map(this.currentLifeTime, 0, this.lifeTime, 100, 0);
        fill(color, 0, 0, opacity);
        ellipse(this.x, this.y, this.size);
    }
}