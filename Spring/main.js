let bob;
let spring;
let anchor;

let particles = [];
let springs = [];
let spacing = 1;

let gravity;

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < 25; i++) {
    particles[i] = new Particle(createVector(200, i * spacing));
    if (i !== 0) {
      let a = particles[i];
      let b = particles[i - 1];
      let spring = new Spring(0.1, spacing, a, b);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
      springs.push(spring);
    }
  }

  particles[0].locked = true;
  gravity = createVector(0, 0.1);
}

function draw() {
  background(0);

  for (let s of springs) {
    s.applyForce(gravity);
    s.update();
    s.show();
  }

  for (let p of particles) {
    if (!p.locked) {
      p.applyForce(gravity);
      p.update();
      // p.show();
    }
  }

  let tail = particles[particles.length - 1];

  if (mouseIsPressed) {
    tail.position.set(mouseX, mouseY);
    tail.velocity.set(0, 0);
  }
}
