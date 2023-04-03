class Particle extends p5.Vector {
  velocity;
  acceleration;
  lifeTime;
  size;

  constructor(position, size = 4) {
    super(position.x, position.y)
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(0.5, 1));
    this.acceleration = createVector(0, 0);
    this.size = size;
    this.lifeTime = 255;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.add(this.velocity);
    this.acceleration.mult(0);
    this.lifeTime -= 4;
  }

  draw() {
    push();
    tint(255, 100, 100, this.lifeTime)
    // noStroke();
    // fill(this.lifeTime);
    imageMode(CENTER);
    image(texture, this.x, this.y, this.size * 2, this.size * 2)
    // ellipse(this.x, this.y, this.size);
    pop();
  }

  isDead() {
    return this.lifeTime < 0;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }
}
