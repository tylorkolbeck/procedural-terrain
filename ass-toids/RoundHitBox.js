class RoundHitBox {
  static ID = -1;
  id;
  radius;
  position;
  tag;

  constructor(radius, tag) {
    this.radius = radius;
    this.tag = tag;
    this.id = `${this.tag}_${++RoundHitBox.ID}`;
  };

  update(position) {
    this.position = position;
  }

  debugDraw() {
    push();
    noFill()
    stroke(color(255, 100,0))
    ellipse(this.position.x, this.position.y, this.radius);
    pop();
  }
}