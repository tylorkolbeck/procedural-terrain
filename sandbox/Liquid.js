class Liquid {
  x;
  y;
  width;
  height;

  dragCoefficient = 0.01;

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  render() {
    this.draw();
  }

  draw() {
    noStroke();
    fill(0,0,100);
    rect(this.x, this.y, this.width, this.height);
  }
}