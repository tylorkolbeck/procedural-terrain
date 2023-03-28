const inputs = [12, 4, 1];
// const weights = [0.5, -1];
// let sum = 0;

// for (let i = 0; i < inputs.length; i++) {
//   sum += inputs[i]*weights[i];
// }
// function activate(theSum) {
//   return theSum > 1 ? 1 : -1;
// }
let perceptron;

function setup() {
  createCanvas(400,400);
  perceptron = new Perceptron(inputs.length);
  const result = perceptron.feedForward(inputs);
  console.log(result)
}

function draw() {
  background(100);
  line(0,height / 2, width, height / 2);
  
  stroke(1);
  ellipse(inputs[0], inputs[1], 10);
}