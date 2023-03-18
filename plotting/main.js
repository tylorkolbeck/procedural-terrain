const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const LOWER = -40;
const UPPER = 40;
const X_VALUES = [];

let graphicsBuffer;
let grid;

let plots;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  grid = new Grid(10);
  createNumRange();
}

function genPoints(range, eq) {
  return range.map(x => {
    return {
      x: x,
      y: eq(x)
    }
  })
}

function draw() {
  background(200);
  grid.render();
  // grid.plot(genPoints(X_VALUES, expo), color(255,0,0))
  // grid.plot(genPoints(X_VALUES, lin), color(200,200,0))
  // grid.plot(genPoints(X_VALUES, logC), color(0,200,0))
  grid.plot(genPoints(X_VALUES, sandbox), color(0,200,0))
}

function createNumRange() {
  for (let i = LOWER; i < UPPER + 1; i++) {
    X_VALUES.push(i);
  }
}

// *** PLOTTING EQUATIONS ****
function sandbox(x) {
  return x -3;
}

function expo(x) {
  return x**2
}

function lin(x) {
  return x + 1
}

function logC(x) {
  return Math.log(x**2) * -1
}