const SIZE_SQR = 800;
const NUM_MOVERS = 10;
const NUM_ATTRACTORS = 1;
let GRAVITY;

let sun

const movers = [];

let attractors = [];

let mousedown = false;

function populateMovers() {
  for (let i = 0; i < NUM_MOVERS; i++) {   
    const positionVector = p5.Vector.random2D();
    const vel = positionVector.copy();
    positionVector.setMag(random(200,300))
    // vel.rotate(PI/2)
    vel.setMag(random(5, 15))
    // console.log(vel)
    let mover = new Mover(positionVector.x, positionVector.y, vel.x, vel.y, 50)
    // mover.debug = true;
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

  sun = new Mover(0,0,0,0, 500);

  populateMovers();
  // populateAttractors();
}

function draw() {
  background(100);
  const wind = createVector(0.1, 0);

  for (let i =0; i < movers.length; i++) {
    sun.attract(movers[i])
    for (let j = 0; j < movers.length; j++) {
      if (movers[i] !== movers[j]) {
        movers[i].attract(movers[j]);
        stroke(1)
      }
    }
  }

  ellipse(-200, -200, 20, 20)
  translate(width / 2, height / 2)
  movers.forEach((mover, i) => {
    mover.render();
  });
  // sun.render()
}
