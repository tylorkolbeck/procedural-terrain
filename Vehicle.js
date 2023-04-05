class Vehicle {
  mass = 1;
  position;
  velocity;
  acceleration;
  max_force = 0.1;
  max_speed = 2;
  orientation;
  rotation;

  fill_color = color(200);
  scale = 1;
  wanderTheta;

  sprite;

  constructor(position, rotation, scale, velocity) {
    this.position = position;
    this.acceleration = createVector(0, 0);
    this.velocity = velocity ?? createVector(0, 0);

    this.rotation = rotation ?? 0;
    this.scale = scale ?? 1;
    this.wanderTheta = PI / 2;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.rotation = this.velocity.heading();

    this.velocity.limit(this.max_speed);

    // Reset acceleration
    this.acceleration.set(0, 0);
  }

  applyForce(force) {
    this.acceleration.add(force.div(this.mass)).limit(this.max_speed);
  }

  setFill(color) {
    this.fill_color = color;
  }

  setSprite(image) {
    this.sprite = image;
  }

  draw() {
    push();
    noStroke();
    fill(this.fill_color);
    translate(this.position.x, this.position.y);
    rotate(this.rotation);

    // if (this.sprite) {
    //   rotate(this.velocity.heading())
    //   image(this.sprite, 0, 0, this.scale, this.scale)
    // }
    // else {
    //   triangle(
    //     -this.scale,
    //     -this.scale / 2,
    //     -this.scale,
    //     this.scale / 2,
    //     this.scale,
    //     0
    //   );
    // }
    pop();

    push();
    translate(this.position.x, this.position.y);
    if (this.sprite) {
      rotate(this.velocity.heading() - TWO_PI / 4);
      image(this.sprite, 0, 0, this.scale, this.scale);
    }
    pop();
  }

  render() {
    this.update();
    this.draw();
  }

  wander() {
    push();
    const wanderR = 80; // Radius for our "wander circle"
    let wanderPoint = this.velocity.copy().setMag(100);
    wanderPoint.add(this.position);
    // fill(255, 0, 0)
    // noStroke()
    // circle(wanderPoint.x, wanderPoint.y, 8)

    let theta = this.wanderTheta + this.velocity.heading();
    let x = (wanderR * cos(theta)) / 2;
    let y = (wanderR * sin(theta)) / 2;
    // noFill()
    // stroke(100, 100, 100)
    // circle(wanderPoint.x, wanderPoint.y, wanderR)

    // fill(0, 255, 0);

    // circle(wanderPoint.x + x, wanderPoint.y + y, 8)
    // line(this.position.x, this.position.y, wanderPoint.x + x, wanderPoint.y + y)
    // line(this.position.x, this.position.y, wanderPoint.x, wanderPoint.y)
    wanderPoint.add(x, y);
    let steer = wanderPoint.sub(this.position).setMag(this.max_force);
    this.applyForce(steer);

    const displaceRange = 0.3;
    this.wanderTheta += random(-displaceRange, displaceRange);

    // noFill()
    // stroke(255)
    // strokeWeight(2)
    // circle(wanderPoint.x, wanderPoint.y, wanderR);
    // // translate(this.position.x, this.position.y)

    // // line(0, 0, wanderPoint.x, wanderPoint.y)
    // circle(x, y, 10)
    // pop()
  }

  arrive(target) {
    return this.seek(target, true);
  }

  evade(vehicle) {
    return this.pursue(vehicle).mult(-1);
  }

  pursue(vehicle, arrive = false) {
    const target = vehicle.position.copy();
    const prediction = vehicle.velocity.copy();
    target.add(prediction.mult(10));
    return this.seek({ position: target }, arrive);
  }

  flee(target) {
    return this.seek(target).mult(-1);
  }

  seek(target, arrive = false) {
    const force = p5.Vector.sub(target.position, this.position);
    const slowRadius = 100;
    const distance = force.mag();

    // slow to 0 within radius of target
    if (arrive && distance < slowRadius) {
      let desiredSpeed = map(distance, 0, slowRadius, 0, this.max_speed);
      force.setMag(desiredSpeed);
    } else {
      force.setMag(this.max_speed);
    }

    force.sub(this.velocity);
    force.limit(this.max_force);

    return force;
  }

  debugDraw() {
    push();
    stroke(255);
    strokeWeight(3);
    const pointAhead = p5.Vector.add(
      this.position,
      this.velocity.copy().normalize().mult(20)
    );
    line(this.position.x, this.position.y, pointAhead.x, pointAhead.y);
    pop();
  }
}
