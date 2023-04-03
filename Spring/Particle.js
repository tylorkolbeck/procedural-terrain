class Particle {
  locked = false;
  constructor(position) {
    this.accleration = createVector(0, 0);
    this.velocity = createVector(0,0);
    this.position = position.copy();
    this.mass = 1;
  }

  applyForce(force) {
    let f = force.copy()
    f.div(this.mass);
    this.accleration.add(f);
  }

  update() {
    this.velocity.mult(0.99);
    this.velocity.add(this.accleration);
    this.position.add(this.velocity);
    this.accleration.mult(0);
  }

  show() {
    stroke(255)
    strokeWeight(2);
    fill(200);
    ellipse(this.position.x, this.position.y, 10);
  }
}