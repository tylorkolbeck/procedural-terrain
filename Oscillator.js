class Oscillator {
  location;
  angle;
  acceleration;
  velocity;
  location = createVector(0,0);

  constructor() {
    this.angle = createVector(0,0);
    this.velocity = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.amplitude = createVector(random(width / 2), random(height / 2));
    this.acceleration = createVector()
  }

  render() {
    this.oscillate();
    this.update();
    this.draw();
  }

  oscillate() {
    this.angle.add(this.velocity);
  }           

  update() {
    this.location.x = cos(this.angle.x) * this.amplitude.x;
    this.location.y = sin(this.angle.y) * this.amplitude.y;
    // console.log(atan(this.location.x/this.location.y))
  }

  draw() {
    push();
    translate(width/2, height/2);
    stroke(0);
    fill(175);
    ellipse(this.location.x, this.location.y, 16, 16);
    pop();
  }
  
}