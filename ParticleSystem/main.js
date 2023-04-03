let emitters = [];
let texture;

// function mousePressed() {
//   emitters.push(new ParticleEmitter(createVector(mouseX, mouseY), 4, Confetti))
// }

function preload() {
  texture = loadImage("texture.png")
}

function setup() {
  createCanvas(1200, 600);
  emitters.push(new ParticleEmitter(createVector(width / 2, height - 20), 16, Particle))

  // particles.push(new ParticleEmitter(createVector(width / 2, 50), 4))
}

function draw() {
  clear()
  background(1);
  blendMode(ADD);
  // if (mouseIsPressed) {
  //   particles.push(new ParticleEmitter(createVector(mouseX, mouseY), 4))
  // }

  for (let emitter of emitters) {
    emitter.emit(10);
    emitter.applyForce(createVector(0, -0.05));
    emitter.applyForce(createVector(random(-0.05, 0.05), 0));
    // p.update();
  }
}
