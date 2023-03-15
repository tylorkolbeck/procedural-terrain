let loc;
let velocity;
let mouse;

const ELLIPSE_SIZE = 16;
const STEP_SIZE = 5;

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowRight':
      loc.add(new PVector(STEP_SIZE, 0))
      break
    case 'ArrowUp':
      loc.add(new PVector(0, -STEP_SIZE))
      break
    case 'ArrowLeft':
        loc.add(new PVector(-STEP_SIZE, 0))
        break;
    case 'ArrowDown':
        loc.add(new PVector(0, STEP_SIZE))
        break;
    case 'ArrowUp':
      if (velocity.x === 0) {
        velocity.add(new PVector(1, 1))
      }
      velocity.mult(1.1);
      break
    case 'ArrowDown':
      velocity.sub(new PVector(.1, .1));
      if (velocity.x < 0)
        velocity.x = 0;
      if (velocity.y < 0)
        velocity.y = 0;
      break
  }
})

function setup() {
  createCanvas(400, 400);
  setupProgram2();


}

function draw() {
  drawProgram2()
}

function setupProgram2() {

}

function drawProgram2() {
  background(255)
  const centerP = new PVector(width / 2, height / 2);
  const mouseP = new PVector(mouseX, mouseY);
  mouseP.sub(centerP);
  const m = mouseP.mag();
  fill(0)
  
  translate(width/2, height /2)
  const normalizedP = mouseP.normalize();
  normalizedP.mult(50)

  line(0,0, normalizedP.x, normalizedP.y)

}


function setupProgram1() {
  loc = new PVector(Math.round(random(0, width) / STEP_SIZE) * STEP_SIZE, Math.round(random(0, height) / STEP_SIZE) * STEP_SIZE, 0);
  
  velocity = new PVector(1, 1);
}

function drawProgram1() {
  background(255);
  mouse = new PVector(mouseX, mouseY);

  if (loc.x > width || loc.x < 0) velocity.reverseX();

  if (loc.y > height || loc.y < 0) velocity.reverseY();
  // line(width / 2, height / 2, loc.x, loc.y);
  line( loc.x, 0, loc.x, height)
  line( 0, loc.y, width, loc.y)
  fill(175);
  ellipse(loc.x, loc.y, ELLIPSE_SIZE, ELLIPSE_SIZE);

  const centerP = new PVector(width / 2, height /2)
  centerP.sub(loc);
  centerP.mult(-1)
  

  line(width / 2, height / 2, loc.x, loc.y)

  text('Mag ' + centerP.mag(), loc.x, loc.y)
}
