class Food {
    constructor(size, width, height) {
        this.size = size;
        this.windowWidth = width;
        this.windowHeight = height;
        this.init();
    }
    update() {

    }
    init() {
        //确保食物在网格中心
        this.x = Math.floor(random(this.windowWidth) / this.size) * this.size;
        this.y = Math.floor(random(this.windowHeight) / this.size) * this.size;
    }
    show() {
        noStroke();
        fill(0, 255, 0, 255);
        rect(this.x, this.y, this.size, this.size);
    }
}