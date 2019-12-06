//神经元训练者，用于对neuron进行训练，训练时告知神经元答案，因此神经网络的学习策略为监督学习
class Trainer {
	constructor(func) {
		if (!func instanceof Function) return;
		this.inputs = [random(0, windowWidth), random(0, windowHeight), 1];//第三个参数为偏置输入
		this.answer = this.inputs[1] > func(this.inputs[0]) ? 1 : -1;//位于直线上方还是下方
	}
}