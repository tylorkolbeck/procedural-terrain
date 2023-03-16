function drawArrow(base, vec) {
  const arrowColor = color(254, 172, 0)
  push();
  stroke(arrowColor);
  strokeWeight(1);
  fill(arrowColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 5;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}