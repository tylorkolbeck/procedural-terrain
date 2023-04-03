class Spring {
  acceleration = createVector(0, 0);

  constructor(k, restLength, pointA, pointB) {
    this.k = k;
    this.restLength = restLength;
    this.pointA = pointA;
    this.pointB = pointB;
  }

  update() {
    let force = p5.Vector.sub(this.pointA.position, this.pointB.position);
    let x = force.mag() - this.restLength;
    force.normalize();
    force.mult(this.k * x);
    this.pointB.applyForce(force);
    force.mult(-1);
    this.pointA.applyForce(force);
  }


  show() {
    stroke(255);
    strokeWeight(2);
    line(this.pointA.position.x, this.pointA.position.y, this.pointB.position.x, this.pointB.position.y);
  }

  applyForce(forceVector) {
    // this.acceleration.mult(forceVector);
  }
}