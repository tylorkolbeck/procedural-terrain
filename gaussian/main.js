const CAVNAS_DIM = 400;
const CANVAS_HEIGHT = CAVNAS_DIM;
const CANVAS_WIDTH = CAVNAS_DIM;


const MEAN = CAVNAS_DIM / 2;
const SD = 25;

function calculateDistance(point1, point2) {
  return Math.sqrt(Math.pow((point1.x - point2.x), 2) + Math.pow((point1.y - point2.y), 2))
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  noStroke();

  const x = randomGaussian(MEAN, SD);
  const y = randomGaussian(MEAN, SD);

  if (calculateDistance({x: 200, y: 200}, {x, y}) > 150 / 2) {
    fill(204, 102, 0)
  } else {
    fill('rgba(200, 200, 200, .1)');
  }

  ellipse(x, y, 16, 16);

}