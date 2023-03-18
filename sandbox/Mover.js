class Mover {
  location;
  velocity;
  accleration;
  cirRadius;
  mass;
  debug = false;
  hasGravity = false;

  fillColor = color(255)

  constructor(x, y, vx, vy, mass = 1) {
    this.location = createVector(x, y);
    this.velocity = createVector(vx, vy);
    this.accleration = createVector(0, 0);
    this.mass = mass;
    this.cirRadius = sqrt(this.mass) * 2;
  }

  render() {
    this.update();
    // this.move();
    this.draw();
  }

  update() {
    if (this.debug) {
      this.runDebug();
    }
    //  Run acceleration aglorithms
    // this._gravityLike()
    // this._randomAcceleration();
    // this._accelerateTowardsMouse();
    this.wrapAroundEdges();
    // this.containInEdges();
  }

  draw() {
    stroke(100);
    fill(this.fillColor);
    ellipse(
      this.location.x,
      this.location.y,
      this.cirRadius * 3
    );
  }

  move() {
    this.velocity.add(this.accleration);
    this.location.add(this.velocity);

    // Set accleration to 0 after each frame to keep it from accumulating each frame
    this.accleration.set(0, 0);
  }

  applyForce(forceVector) {
    if (Array.isArray(forceVector)) {
      forceVector.forEach((f) => {
        let forceWithMass = p5.Vector.div(f, this.mass);
        this.accleration.add(forceWithMass);
      });
    } else {
      let forceWithMass = p5.Vector.div(forceVector, this.mass);
      this.accleration.add(forceWithMass);
    }
  }

  toggleDebug() {
    this.debug = !this.debug;
  }

  attract(mover) {
    let force = p5.Vector.sub(this.location, mover.location)
    let distanceSqr = constrain(force.magSq(), 100, 1000);
    let gravity = 10;
    let strength = gravity * ((this.mass * mover.mass) / distanceSqr) 
    force.setMag(strength);

    mover.applyForce(force);
  }

  wrapAroundEdges() {
    if (this.location.x > width) {
      this.location.x = 0;
    }

    if (this.location.x < 0) {
      this.location.x = width
    }

    if (this.location.y > height) {
      this.location.y = 0;
    }

    if (this.location.y < 0) {
      this.location.y = height;
    }
  }

  containInEdges() {
    if (
      this.location.x > width - this.cirRadius ||
      this.location.x < 0 + this.cirRadius
    ) {
      // if they somehow pass the bounds put them back in bounds
      if (this.location.x > width) {
        this.location.x = width - this.cirRadius;
      }

      if (this.location.x < 0 + this.cirRadius) {
        this.location.x = 0 + this.cirRadius;
      }
      this.velocity.x *= -1;
    }

    if (
      this.location.y > height - this.cirRadius ||
      this.location.y < 0 + this.cirRadius
    ) {
      // if they somehow pass the bounds put them back in bounds
      if (this.location.y > height - this.cirRadius) {
        this.location.y = height - this.cirRadius;
      }

      if (this.location.y < 0 + this.cirRadius) {
        this.location.y = 0 + this.cirRadius;
      }
      this.velocity.y *= -1;
    }
  }

  setVelocity(vector) {
    this.velocity = vector;
  }

  runDebug() {
    this._showVelocity();
  }

  applyGravity() {
    if (this.hasGravity) {
      let moverWeight = p5.Vector.mult(GRAVITY, this.mass)
      this.applyForce(moverWeight)
    }
  }

  _showVelocity() {
    stroke(254, 172, 0);
    Util.drawArrow(
      this.location,
      Util.getFuturePosVec(this.location, this.velocity).mult(20)
    );
  }

  // RANDOM ACCELERATION ALGORITHMS
  _randomAcceleration() {
    const accelOrDecel = random();

    if (accelOrDecel > 0.5) {
      this.accleration.add(this._genRandomAccelVector());
    } else {
      this.accleration.sub(this._genRandomAccelVector());
    }

    this.velocity.limit(2);
  }

  _gravityLike() {
    this.velocity.y = 2;

    this.accleration.x = 0.01;
  }

  _accelerateTowardsMouse() {
    let newAccleration = createVector(mouseX, mouseY);
    newAccleration.sub(this.location);
    newAccleration.normalize();

    newAccleration.setMag(0.02);

    this.accleration = newAccleration;

    this.velocity.limit(2);
  }

  _genRandomAccelVector() {
    return createVector(random(-0.01, 0.01), random(-0.01, 0.01));
  }
}
