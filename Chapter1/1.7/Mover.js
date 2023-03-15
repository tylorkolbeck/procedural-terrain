class Mover {
  loc = new PVector(random(width), random(height));
  velocity;
  acceleration;
  topSpeed;

  constructor(x, y) {

    if (x && y) {
      this.loc = new PVector(x, y);
    }
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0,0)

    this.topSpeed = 10;
  }

  randomUpdate() {
    this.acceleration = p5.Vector.random2D();
    this.acceleration.mult(random(2))
    this.velocity.add(this.acceleration);
    this.velocity.lim(this.topSpeed)
    this.loc.add(this.velocity);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.lim(this.topSpeed)
    this.loc.add(this.velocity)
  }

  display() {
    stroke(0)
    fill(175)
    ellipse(this.loc.x, this.loc.y, 16, 16);
  }

  checkEdges() {
    if (this.loc.x > width) {
      this.loc.x = 0;
    } else if (this.loc.x < 0) {
      this.loc.x = width
    }

    if (this.loc.y > height) {
      this.loc.y = 0;
    } else if (this.loc.y < 0) {
      this.loc.y = height
    }
  }
}