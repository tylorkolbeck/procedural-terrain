class Perceptron {
  weights = [];
  trainingConstant = 0.01;

  constructor(numInputs) {
    for (let i =0; i < numInputs; i++) {
      this.weights[i] = random(-1,1);
    }
  }

  // Outputs the guess
  feedForward(inputs) {
    let sum = 0;
    this.weights.forEach((w, i) => {
      sum += inputs[i] * this.weights[i];
    })

    return this.activate(sum);
  }

  activate(theSum) {
    return theSum > 1 ? 1 : -1;
  }

  train(inputs, desired) {
    const guess = this.feedForward(inputs);
    const error = desired - guess;
    for (let i = 0; i < this.weights; i++) {
      weights[i] += this.trainingConstant * error * inputs[i];
    }
  }
  
}