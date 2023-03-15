const CAVNAS_DIM = 400;
const CANVAS_HEIGHT = CAVNAS_DIM;
const CANVAS_WIDTH = CAVNAS_DIM;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function monteCarlo() {
  const r1 = random(); 
  const probability = r1;

  const r2 = random();

  if (r2 < probability) {
    return r2;
  } else {
    return null;
  }
}

function draw() {

}