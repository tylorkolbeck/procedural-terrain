const SIZE_SQR = 800;
const NUM_MOVERS = 2;
let GRAVITY; 

const movers = [];

let mousedown = false;

function populateMovers() {
  const mover1 = new Mover(width / 4, height / 2, 32, 1);
  const mover2 = new Mover(width / 2, height / 2, 32, 2);

  mover1.toggleDebug()
  mover2.toggleDebug()
  movers.push(mover1)
  movers.push(mover2)

  // for (let i = 0; i < NUM_MOVERS; i++) {
  //   let mover = new Mover(width / 2, height / 2, 32);
  //   mover.toggleDebug();
  //   movers.push(mover)
  // }
}

function setup() {
  GRAVITY = createVector(0, 0.2);
  const cnv = createCanvas(SIZE_SQR, SIZE_SQR);
  cnv.mousePressed(() => mousedown = true);
  cnv.mouseReleased(() => mousedown = false);

  populateMovers();
}


function draw() {
  background(1)
  const wind = createVector(0.1,0);

  const netForces = []

  movers.forEach((mover, i) => {

    mover.applyGravity();

    if (mousedown) {
      mover.applyForce(wind)
      // do something on mouse down
    }
    mover.render()
  })
}

// function applyGravity(mover) {
//   let moverWeight = p5.Vector.mult(GRAVITY, mover.mass)
//   mover.applyForce(moverWeight)

// }