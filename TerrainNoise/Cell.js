
class Cell {
  size;
  border = color(255,255,255);
  fill = 100;

  r = 0;
  g = 0;
  b = 0;

  constructor(size) {
    this.size = size;
  }

  get fill() {
    return color(this.r, this.g, this.b);
  }

  draw(x, y) {
    strokeWeight(0)
    stroke(this.border);
    fill(this.r)
    
    rect(x * this.size, y * this.size, this.size, this.size);
  }
}
