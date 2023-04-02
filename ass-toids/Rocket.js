class Rocket {
  location;
  velocity;
  acceleration;
  angle = PI / 2;
  angleVelocity;
  mass;
  tag = "Rocket";
  r;
  angleAcceleration = 0;
  deadreckonVector;
  projectileSpeed = 1.8;

  speed = 0;
  startingFuel = 400;
  fuel = 0;

  firing = false;
  fireRate = 200;
  fireInterval;

  rotateFactor = 0.003;
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
    this.drawFuelBar();

    if (DEBUG) {
      this.drawDebug();
    }
  }

  drawShip() {
    push();
    imageMode(CENTER);
    translate(this.location.x, this.location.y);
    rotate(this.angle - TWO_PI / 4);
    image(this.sprites.ship, 0, 0, 40, 40);
    pop();
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
    // text("Frame Rate: " + Math.floor(frameRate()), 160, 20);
    text("Frame Rate: " + averageFrameRate.toFixed(), 160, 20);
    text("Lowest Frame Rate: " + lowestAverage.toFixed(), 250, 20);
    pop();
  }

  drawThrust() {
    push();
    translate(this.location.x, this.location.y);
    imageMode(CENTER);
    rotate(this.angle - TWO_PI / 4);
    image(this.sprites.thrust, 8, -25, 0, 0);
    image(this.sprites.thrust, -8, -25, 0, 0);
    pop();
  }

  drawFuelBar() {
    push();
    fill(76, 50, 168);
    rect(0, height - 10, map(this.fuel, 0, this.startingFuel, 0, width), 10);
    pop();
  }

  applyThrust() {
    if (this.fuel > 0) {
      this.acceleration.add(
        p5.Vector.fromAngle(this.angle).mult(this.thrustFactor)
      );
      this.drawThrust();
      this.fuel -= 0.5;
    }
  }

  rotate(direction) {
    switch (direction) {
      case "LEFT":
        this.angleAcceleration -= this.rotateFactor * deltaTime;
        this.acceleration
          .add(p5.Vector.fromAngle(this.angleAcceleration))
          .mult(0.01); // add a small amount of reciprical thrust acceleration
        break;
      case "RIGHT":
        this.angleAcceleration += this.rotateFactor * deltaTime;
        this.acceleration
          .add(p5.Vector.fromAngle(this.angleAcceleration))
          .mult(-1)
          .mult(0.01); // add a small amount of reciprical thrust acceleration
        break;
    }
  }

  applyForce(accelerationVector) {
    this.acceleration = accelerationVector.copy();
  }

  fireProjectile() {
    if (!this.firing) {
      const p = new Mover(
        this.location.copy(),
        p5.Vector.fromAngle(this.angle).mult(this.projectileSpeed),
        this.sprites.projectile
      );

      p.setTag("PROJECTILE");
      this.projectiles.add(p);

      this.firing = true;
      this.fireInterval = setInterval(() => {
        const p = new Mover(
          this.location.copy(),
          p5.Vector.fromAngle(this.angle).mult(this.projectileSpeed),
          this.sprites.projectile
        );
        p.setTag();
        this.projectiles.add(p);
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
    this.projectiles.checkCollision(asteroidColliders);
    this.projectiles.render();
  }

  applyDrag() {
    this.velocity.mult(0.99);
  }

  drawDebug() {
    this.drawDeadReckon();
    this.drawHitbox();
    this.drawHud();
  }

  drawHitbox() {
    push();
    stroke(color(255, 100, 0));
    noFill();
    ellipse(this.location.x, this.location.y, this.hitBoxRadius);
    pop();
  }
}
