class Path {
  start;
  end;
  radius;
  direction;

  constructor(start, end, radius, direction) {
    this.start = start;
    this.end = end;
    this.radius = radius ?? 30;
    this.direction = direction ?? 1;
  }

  draw() {
    push()
    stroke(1);
    strokeWeight(1);
    // line(this.start.x, this.start.y, this.end.x, this.end.y);
    pop()

    push()
    strokeWeight(this.radius * 2);
    stroke(100, 255, 0, 100);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    // line(this.start.x, this.start.y - this.radius, this.end.x, this.end.y - this.radius);
    pop()
  }
}