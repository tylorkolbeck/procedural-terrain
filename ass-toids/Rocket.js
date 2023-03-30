class Rocket {
  location;
  velocity;
  acceleration;
  angle = PI / 2;
  angleVelocity;
  mass;
  r;
  angleAcceleration = 0;
  deadreckonVector;

  speed = 0;
  startingFuel = 400;
  fuel = 0;

  firing = false;
  fireRate = 200;
  fireInterval;

  rotateFactor = 0.005;
  thrustFactor = 0.08;

  projectiles = new Projectiles();
  sprites;

  boundCheck = null;

  hitBoxRadius;

  constructor(location, velocity, mass, sprites) {
    this.location = location.copy();
    this.velocity = velocity ? velocity : vector(0, 0);
    this.acceleration = vector(0, 0);
    this.mass = mass;
    // this.r = sqrt(this.mass) * 2;
    this.r = 20;
    this.fuel = this.startingFuel;
    this.sprites = sprites;
    this.hitBoxRadius = this.r * 2;
  }

  draw() {
    this.drawShip();
    this.drawHud();
    this.drawFuelBar();

    if (DEBUG) {
      this.drawDebug();
    }
  }

  drawShip() {
    push();
    imageMode(CENTER);
    translate(this.location.x, this.location.y);
    rotate(this.angle + 1.57);
    image(this.sprites.ship, 0, 0, 40, 40);
    // triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
    // push()
    // imageMode(CENTER);

    // translate(this.location.x, this.location.y);
    // rotate(PI / 4);
    // image(this.sprite, 0, 0, 40, 40);

    // pop()
  }

  drawDeadReckon() {
    push();
    stroke(255, 0, 0);
    line(
      this.location.x,
      this.location.y,
      this.deadreckonVector.x,
      this.deadreckonVector.y
    );
    pop();
  }

  drawHud() {
    push();
    fill(255, 0, 0);
    text("Speed: " + this.speed, 10, 20);
    text("Projectiles: " + this.projectiles.length(), 80, 20);
    text("Frame Rate: " + Math.floor(frameRate()), 160, 20);
    pop();
  }

  drawFuelBar() {
    push();
    fill(255, 0, 0);
    rect(0, height - 10, map(this.fuel, 0, this.startingFuel, 0, width), 10);
    pop();
  }

  applyThrust() {
    if (this.fuel > 0) {
      this.acceleration.add(
        p5.Vector.fromAngle(this.angle).mult(this.thrustFactor)
      );
      this.fuel -= 0.5;
    }
  }

  rotate(direction) {
    switch (direction) {
      case "LEFT":
        this.angleAcceleration -= this.rotateFactor * deltaTime;
        this.acceleration.add(p5.Vector.fromAngle(this.angleAcceleration)).mult(0.01) // add a small amount of reciprical thrust acceleration
        break;
      case "RIGHT":
        this.angleAcceleration += this.rotateFactor * deltaTime;
        this.acceleration.add(p5.Vector.fromAngle(this.angleAcceleration)).mult(-1).mult(0.01) // add a small amount of reciprical thrust acceleration
        break;
    }
  }

  applyForce(accelerationVector) {
    this.acceleration = accelerationVector.copy();
  }

  fireProjectile() {
    if (!this.firing) {
      this.projectiles.add(
        new Mover(
          this.location.copy(),
          p5.Vector.fromAngle(this.angle),
          this.sprites.projectile
        )
      );

      this.firing = true;
      this.fireInterval = setInterval(() => {
        this.projectiles.add(
          new Mover(
            this.location.copy(),
            p5.Vector.fromAngle(this.angle),
            this.sprites.projectile
          )
        );
      }, this.fireRate);
    }
  }

  stopFiring() {
    this.firing = false;
    clearInterval(this.fireInterval);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.angle += this.angleAcceleration;
    this.speed = Math.floor(this.velocity.mag() * 100);
    this.deadreckonVector = this.velocity.copy().mult(20).add(this.location);

    this.angleAcceleration = 0;
    this.acceleration.set(0, 0);

    if (this.boundCheck) {
      this.boundCheck(this.location);
    }

    this.applyDrag();
    this.projectiles.render();
  }

  applyDrag() {
    this.velocity.mult(0.99);
  }

  drawDebug() {
    this.drawDeadReckon()

    this.drawHitbox();
  }

  drawHitbox() {
    push();
    stroke(color(255, 100, 0));
    noFill();
    ellipse(this.location.x, this.location.y, this.hitBoxRadius);
    pop();
  }
}
