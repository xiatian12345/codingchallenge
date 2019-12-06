const windowWidth = 600;
const windowHeight = 600;

const trainTimes = 10000000;//神经元训练次数

const fun = function (x) {//直线函数
  return 4 * x + 13;
};

let neuron = null;
function setup() {
  createCanvas(windowWidth, windowHeight);
  neuron = new Neuron(3);

  for (let i = 0; i < trainTimes; i++) {
    let trainer = new Trainer(fun);
    neuron.train(trainer.inputs, trainer.answer);//训练
  }
}

function draw() {
  noStroke();
  for (let i = 0; i < 5; i++) {//每帧太慢，让速度加快
    let rand = [random(0, width), random(0, windowHeight), 1];
    if (1 === neuron.guess(rand)) {//神经元干活，可以猜测了
      fill(255, 0, 0, 255);
    } else {
      fill(0, 255, 0, 255);
    }
    circle(rand[0], rand[1], 4);
  }

  stroke(0, 0, 255, 255);
  noFill();
  line(0, fun(0), windowWidth, fun(windowWidth));//画直线
}
