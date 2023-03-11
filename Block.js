

class Block {
  on = true;
  ON_COLOR = color(0, 0, 0);
  OFF_COLOR = color(255, 255, 255);
  FILL_PERCENT = 0.5;

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
  }

  show() {
    stroke(255);
    strokeWeight(2);
    if (this.on) {
      this.fill(this.ON_COLOR);
    } else {
      this.fill(this.OFF_COLOR);
    }
    rect(this.x, this.y, this.w, this.h);
  }

  fill(color) {
    fill(color);
  }

  randomOnOff() {
    this.on = random() < this.FILL_PERCENT ? true : false;
  }
}