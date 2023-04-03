class Pendulum {
  origin;
  angle = PI / 4;
  angleV = 0;
  angleA = 0;
  bob = createVector();
  velocity = createVector();
  acceleration = createVector();

  constructor(origin, r) {
    this.origin = origin;
    this.r = r;
  }

  render() {
    this.update();
    this.draw();
  }

  update() {
    this.calculateAngle();
    this.calculateBob();
    this.calculateBobLocation();
    this.applyDrag();
    this.resetAccerlations();
  }

  draw() {
    stroke(250);
    strokeWeight(8);
    fill(127);
    line(this.origin.x, this.origin.y, this.bob.x, this.bob.y);
    circle(this.bob.x, this.bob.y, 64);
  }

  calculateBob() {
    this.velocity.add(this.acceleration);
    this.origin.add(this.angleV);
  }

  calculateAngle() {
    let force = -GRAVITY * sin(this.angle);

    this.angleA = force / this.r;
    this.angleV += this.angleA;
    this.angle += this.angleV;
  }

  calculateBobLocation() {
    this.bob.x = this.r * sin(this.angle) + this.origin.x;
    this.bob.y = this.r * cos(this.angle) + this.origin.y;
  }

  applyDrag() {
    this.angleV *= 0.99;
  }

  resetAccerlations() {
    this.acceleration.set(0, 0);
    this.angleA = 0;
  }
}
