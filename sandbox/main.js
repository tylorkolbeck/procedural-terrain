const SIZE_SQR = 800;
const NUM_MOVERS = 100;
const NUM_ATTRACTORS = 1;
let GRAVITY;

const movers = [];

let attractors = [];

let mousedown = false;

function populateAttractors() {
  for (let i = 0; i < NUM_ATTRACTORS; i++) {
    const attractor = new Mover(width / 2, height / 2, random(10, 15));
    attractor.fillColor = color(255, 0, 0);
    attractors.push(attractor);
  }
}

function populateMovers() {
  for (let i = 0; i < NUM_MOVERS; i++) {
    // let loc = p5.Vector.random2D();
    // loc.setMag(random(100, 150));
    
    // const v = p5.Vector.random2D();
    let mover = new Mover(random(0, width/ 2), random(0, height / 2),0, 0, random(10, 100))
    mover.debug = true;
    // mover.velocity = createVector(10, 10)
    // console.log(mover.location)
    movers.push(mover)

  }
  // movers[1] = new Mover(400, 200, 0, 5, 10)
  // movers[0] = new Mover(200, 200, 0, -5, 10)

  // movers[2] = new Mover(400, 400, -5, 0, 10)
  // movers[3] = new Mover(200, 400, 5, 0, 10)
  
  // for (let i = 0; i < NUM_MOVERS; i++) {
  //   let mover = new Mover(random(width), random(height), random(10, 20));
  //   mover.toggleDebug();
  //   mover.velocity = p5.Vector.random2D();
  //   mover.velocity.mult(0.1);
  //   movers.push(mover);
  // }
}

function setup() {
  GRAVITY = createVector(0, 0.2);
  const cnv = createCanvas(SIZE_SQR, SIZE_SQR);
  cnv.mousePressed(() => (mousedown = true));
  cnv.mouseReleased(() => (mousedown = false));

  populateMovers();
  // populateAttractors();
}

function draw() {
  background(100);
  const wind = createVector(1, 0);

  for (let i =0; i < movers.length; i++) {
    for (let j = 0; j < movers.length; j++) {
      if (movers[i] !== movers[j]) {
        movers[i].attract(movers[j]);
        stroke(1)
      }
    }
  }

  // translate(width / 2, height /2)

  movers.forEach((mover, i) => {
    mover.applyGravity();
    if (mousedown) {
      mover.applyForce(wind);
    }
    mover.render();
  });
}
