class Confetti extends Particle {
  constructor(position, size = 4) {
    super(position, size);
    this.angle = random(TWO_PI);
  }

  draw() {
    noStroke();
    fill(255, this.lifetime);
    push()
    translate(this.x, this.y);
    rotate(this.angle);
    square(0,0, this.size * 2);
    pop()
  }
}
