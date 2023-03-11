

class Block {
  static fillPercent = 0.8
  on = true;
  OFF_COLOR = color(0, 0, 0);
  ON_COLOR = color(255, 255, 255);
  COLOR_GREEN = color(11, 170, 17);
  COLOR_BLUE = color(50, 104, 204);

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
  }

  show() {
    
    stroke(255);
    strokeWeight(0);
    if (this.on) {
      this.fill(this.COLOR_GREEN);
    } else {
      this.fill(this.COLOR_BLUE);
    }
    rect(this.x, this.y, this.w, this.h);
  }

  fill(color) {
    fill(color);
  }

  randomOnOff() {
    this.on = random() < Block.fillPercent ? true : false;
  }
}