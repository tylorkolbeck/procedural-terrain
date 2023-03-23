class Walker {
  x;
  y;

  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  display() {
    stroke(0)
    fill(200);    
    point(this.x, this.y);
  }

  monteCarlo() {
    const stepSize = random(0, 1);
    const stepX = random(-stepSize, stepSize);
    const stepY = random(-stepSize, stepSize);

    return {
      x: stepX,
      y: stepY
    }
    const r1 = random(); 
    const probability = r1;
  
    const r2 = random();
  
    if (r2 < probability) {
      return r2;
    } else {
      return null;
    }
  }

  monteStep() {
    const step = this.monteCarlo();
    this.x += step.x;
    this.y += step.y;
   
  }

  stepGaussian() {
    const stepDistanceX = randomGaussian();
    const stepDistanceY = randomGaussian();
    this.x += stepDistanceX;
    this.y += stepDistanceY;
  }

  stepProbs() {
    let r = random();
    // 40% chance to go right
    if (r < 0.4) {
      this.x++;
    }

    // 20% chance to go left
    else if (r < 0.6) {
      this.x--;
    }

    // 20% chance to go up
    else if (r < 0.8) {
      this.y++
    }

    // 20% chance to go down
    else {
      this.y--
    }
  }

  step() {
    const stepX = random(-1, 2);
    const stepY = random(-1, 2);
    this.x += stepX;
    this.y += stepY;
  }
}
