const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 400;

let walker;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(255);
  walker = new Walker();

}

function draw() {
  // walker.step();
  // walker.stepProbs();
  // walker.stepGaussian();
  walker.monteStep();
  walker.display();
}