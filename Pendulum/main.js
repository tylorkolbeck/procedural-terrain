const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 600;
const GRAVITY = 1.5;

let p;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  p = new Pendulum(createVector(width / 2, 0), 200);

}

function draw() {
  background(1);
  p.render();

}
