const movers = [];
const numMovers = 1;
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 1200;

let mover;


function genMovers() {
  for (let i = 0; i < numMovers; i++) {
    movers.push(new Mover())
  }
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
  // genMovers()
  mover = new Mover(width / 2, height /2);
}

function draw() {
  background(255)

  const mouse = new PVector(mouseX, mouseY);
  const dir = PVector.Sub(mouse, mover.loc);
  const normDir = dir.normalize();

  normDir.mult(0.9)
  mover.acceleration = normDir;

  mover.velocity.add(mover.acceleration);
  mover.velocity.lim(mover.topSpeed);
  mover.loc.add(mover.velocity);
  mover.acceleration.add(dir);

  mover.update();
  mover.checkEdges();
  mover.display();
  // movers.forEach(mover => {
  //   mover.randomUpdate()
  //   mover.checkEdges()
  //   mover.display();
  // })
}