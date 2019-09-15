class Box {
    constructor(x, y, z, size) {
        this.pos = createVector(x, y, z);
        this.size = size;
        this.color = 125;
    }
    update() {

    }
    generate() {
        let ret = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                for (let k = -1; k <= 1; k++) {
                    const size = 1 / 3 * this.size;
                    const x = this.pos.x + i * size;
                    const y = this.pos.y + j * size;
                    const z = this.pos.z + k * size;
                    if (abs(i) + abs(j) + abs(k) > 1) {
                        const box = new Box(x, y, z, size);
                        ret.push(box);
                    }
                }
            }
        }

        return ret;
    }
    show() {
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        fill(this.color, 0, 255 - this.color, 255);
        box(this.size);
        pop();
    }
}