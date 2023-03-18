class Grid {
  cellSize;
  gridColor;
  backgroundColor;

  gridBuffer;
  gridImage;

  scale = 1;

  plotPoints = [];

  constructor(cellSize, options) {
    if (!cellSize) throw new Error("Must provide a cell size to the new grid");

    this.gridColor = options?.gridColor ? options.gridColor : color(100);
    this.backgroundColor = options?.background ? options.background : color(200);
    this.origin = options?.origin ? options.origin : { x: width / 2, y: height / 2 };

    this.cellSize = cellSize;
  }

  render() {
    if (!this.gridBuffer) {
      this.gridBuffer = createGraphics(width, height);
      this.draw();
    } else {
      image(this.gridBuffer, 0, 0);
    }

    this.drawMouseLines();
    this.drawMouseCoordinates();
    push();
    pop();

    this.drawCenterLines();
  }

  plot(points, fill) {
    if (Array.isArray(points)) {
      fill = fill ? fill : color(255)
      this.showPoints(points, fill)
    }
  }

  showPoints(points, color) {
    push();
    translate(this.origin.x, this.origin.y);
    scale(1, -1);
    fill(color);
    stroke(100)
    points.forEach((p) =>
      ellipse(p.x * this.cellSize / this.scale, p.y * this.cellSize / this.scale, 5, 5)
    );
    pop();
  }

  drawCenterLines() {
    push();
    strokeWeight(2);
    stroke(this.gridColor);
    // vertical center
    line(width / 2, 0, width / 2, height);

    // hosrizontal center
    line(0, height / 2, width, height / 2);
    pop();
  }

  drawMouseCoordinates() {
    fill(255);
    let localMouse = this.local({ x: mouseX, y: mouseY });
    text(`${localMouse.x}, ${localMouse.y}`, mouseX + 20, mouseY - 20);
  }

  drawMouseLines() {
    push();
    stroke(254, 86, 0);
    strokeWeight(2);

    let closestVertical = Math.round(mouseX / this.cellSize) * this.cellSize;
    let closestHorizontal = Math.round(mouseY / this.cellSize) * this.cellSize;

    // vertical line
    line(closestVertical, 0, closestVertical, height);

    // horizontal line
    line(0, closestHorizontal, width, closestHorizontal);
    pop();
  }

  draw() {
    this.gridBuffer.push();
    this.gridBuffer.background(this.backgroundColor);
    this.gridBuffer.stroke(this.gridColor);
    this.gridBuffer.fill(255);
    for (let x = 0; x < width; x += this.cellSize) {
      this.gridBuffer.line(x, 0, x, height);
    }

    for (let y = 0; y < height; y += this.cellSize) {
      this.gridBuffer.line(0, y, width, y);
    }

    this.gridBuffer.pop();
  }

  local(vector) {
    const newPoint = { x: 1, y: 1 };
    newPoint.x = Math.abs(
      (Math.round(vector.x / this.cellSize) * this.cellSize - width / 2) /
        this.cellSize
    );
    newPoint.y = Math.abs(
      (Math.round(vector.y / this.cellSize) * this.cellSize - width / 2) /
        this.cellSize
    );

    if (vector.y > height / 2) {
      newPoint.y *= -1;
    }

    if (vector.x < width / 2) {
      newPoint.x *= -1;
    }

    return newPoint;
  }
}
