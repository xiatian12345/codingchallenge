//神经元
class Neuron {
	constructor(n) {
		//神经元只需要权重和学习常数即可，一个输入对应一个权重
		this.constLearning = 0.01;//学习常数,越大学习的越快，有可能会错过最优权重，越小学习得越慢，经过很多次学习后神经网络的精度能提高
		this.weights = new Array(n);
		for (let i = 0; i < this.weights.length; i++) {
			this.weights[i] = random(-1, 1);//初始化权重
		}
	}

	feedForward(inputs) {//反馈，用于训练或正式干活
		if (!inputs instanceof Array || this.weights.length !== inputs.length) return;
		let sum = 0;
		for (let i = 0; i < this.weights.length; i++) {
			sum += this.weights[i] * inputs[i];//拿到所有输入的加权和
		}
		return this.activate(sum);
	}

	activate(sum) {//激励函数，作用是让神经元决定是否激发某种操作
		return sum > 0 ? 1 : -1;//这里只输出1或者-1来决定在直线上还是直线下
	}

	train(inputs, answer) {//神经元需要经过训练
		let guessAnswer = this.feedForward(inputs);//先让神经元自己猜
		let delta = answer - guessAnswer;//误差,误差=正确答案-猜测答案
		for (let i = 0; i < this.weights.length; i++) {//对于每个权重，都需要做调整
			this.weights[i] += inputs[i] * delta * this.constLearning;//新权重 = 旧权重 + 误差 * 输入 * 学习常数
		}
		// console.log(this.weights);
	}

	guess(inputs) {//训练完的神经元可以正式干活了
		return this.feedForward(inputs);
	}
}