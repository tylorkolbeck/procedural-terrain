const SIZE_SQR = 800;
const NUM_MOVERS = 4;
const NUM_ATTRACTORS = 20
let GRAVITY; 

const movers = [];

let attractors = [];

let mousedown = false;

function populateAttractors() {
  for (let i = 0; i < NUM_ATTRACTORS; i++) {
    const attractor = new Mover(random(width), random(height), 50);
    attractor.fillColor = color(255, 0, 0)
    attractors.push(attractor);
  }
}

function populateMovers() {
  // const mover1 = new Mover(50, 50, 32, 2);
  // mover1.velocity = p5.Vector.random2D();
  // const mover2 = new Mover(width / 2, height / 2, 32, 4);

  // mover1.toggleDebug()
  // mover2.toggleDebug()
  // movers.push(mover1)
  // movers.push(mover2)

  for (let i = 0; i < NUM_MOVERS; i++) {
    let mover = new Mover(random(width), random(height), 50);
    mover.toggleDebug();
    mover.applyForce(p5.Vector.random2D())
    movers.push(mover)
  }
}

function setup() {
  GRAVITY = createVector(0, 0.2);
  const cnv = createCanvas(SIZE_SQR, SIZE_SQR);
  cnv.mousePressed(() => mousedown = true);
  cnv.mouseReleased(() => mousedown = false);

  populateMovers();
  populateAttractors();
}


function draw() {
  background(1)
  const wind = createVector(0.1,0);
  attractors.forEach(a => a.render())

  movers.forEach((mover, i) => {
    mover.applyGravity();

    attractors.forEach(a => {
      a.attract(mover)
    })
    // **** GRAVITATIONAL ATTRACTION *****
    // if (i === 1) {
    //   mover.attract(movers[0])
    // }

    // **** END GRAVITATIONAL ATTRACTION *****

    // if (mousedown) {
    //   mover.applyForce(wind)
    //   // do something on mouse down
    // }

    mover.render()
  })
}

// function applyGravity(mover) {
//   let moverWeight = p5.Vector.mult(GRAVITY, mover.mass)
//   mover.applyForce(moverWeight)

// }