class Walker {
  xOffset = 0;
  yOffset = 1000;

  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.draw()
  }

  getStepDistance() {
    let xStep =  map(noise(this.xOffset), 0, 1, 0, 10);
    let yStep =  map(noise(this.yOffset), 0, 1, 0, 10);

    this.xOffset += 0.001;
    this.yOffset += 0.001;

    return {
      x: xStep,
      y: yStep
    }
  }

  step() {
    const distance = this.getStepDistance()
    let randomX = Math.floor(random(-1,2));
    let randomY = Math.floor(random(-1,2));

    this.x += randomX * distance.x;
    this.y += randomY * distance.y;


  }

  draw() {
    ellipse(this.x, this.y, 16, 16);
  }
}