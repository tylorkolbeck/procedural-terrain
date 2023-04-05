class Vehicle {
  mass = 1;
  position;
  velocity;
  acceleration;
  max_force = 0.1;
  max_speed = 2;
  rotation;

  fill_color = color(200);
  scale = 1;
  wanderTheta;

  sprite;

  wanderRadius = 80;
  displaceRange = 0.3;

  constructor(position, rotation, scale, velocity) {
    this.position = position;
    this.acceleration = createVector(0, 0);
    this.velocity = velocity ?? createVector(0, 0);

    this.rotation = rotation ?? 0;
    this.scale = scale ?? 1;
    this.wanderTheta = PI / 2;
  }

  follow(path) {
    // 1. predict future location
    let futurePos = this.velocity.copy().setMag(20).add(this.position);
    // 2. is this.position in the path radius (distance between position and line < radius of path)
    // what is the distance between this.position and the line as d
    // const target = findProjection(path.start, futurePos, path.end);
    const normalPoint = findProjection(path, futurePos);
    const dir = p5.Vector.sub(path.end, path.start).normalize();

    const target = dir.mult(20).add(normalPoint);

    // const futureTarget = target.copy();

    // push()
    // circle(futurePos.x, futurePos.y, 10)

    // fill(0, 255, 200)
    // translate(target.x,target.y)

    // circle(0,0, 20)
    // pop()

    // push()
    // fill(255, 0,0)
    // stroke(255)
    // line(this.position.x, this.position.y, futurePos.x, futurePos.y)
    // line(futurePos.x, futurePos.y, target.x, target.y)
    // line(normalPoint.x, normalPoint.y, target.x, target.y)
    // circle(normalPoint.x, normalPoint.y, 10)
    // pop()
    let d = p5.Vector.sub(normalPoint, futurePos);
    if (d.mag() > path.radius) {
      return this.seek({position: target});
    } else {
      return createVector(0, 0);
    }
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
    translate(this.position.x, this.position.y);
    if (this.sprite) {
      rotate(this.velocity.heading() - TWO_PI / 4);
      image(this.sprite, 0, 0, this.scale, this.scale);
    } else {
      rotate(this.velocity.heading());

      triangle(
        -this.scale,
        -this.scale / 2,
        -this.scale,
        this.scale / 2,
        this.scale,
        0
      );
    }
    pop();
  }

  render() {
    this.update();
    this.draw();
  }

  wander() {
    push();
    const wanderPoint = this.velocity.copy().setMag(100).add(this.position);
    // fill(255, 0, 0)
    // noStroke()
    // circle(wanderPoint.x, wanderPoint.y, 8)

    let theta = this.wanderTheta + this.velocity.heading();
    // let x = (this.wanderRadius * cos(theta)) / 2;
    // let y = (this.wanderRadius * sin(theta)) / 2;
    // noFill()
    // stroke(100, 100, 100)
    // circle(wanderPoint.x, wanderPoint.y, wanderR)

    // fill(0, 255, 0);

    // circle(wanderPoint.x + x, wanderPoint.y + y, 8)
    // line(this.position.x, this.position.y, wanderPoint.x + x, wanderPoint.y + y)
    // line(this.position.x, this.position.y, wanderPoint.x, wanderPoint.y)
    this.applyForce(
      wanderPoint
        .add(
          (this.wanderRadius * cos(theta)) / 2,
          (this.wanderRadius * sin(theta)) / 2
        )
        .sub(this.position)
        .setMag(this.max_force)
    );
    // let steer = wanderPoint.sub(this.position).setMag(this.max_force);
    // this.applyForce(steer);
    this.wanderTheta += random(-this.displaceRange, this.displaceRange);

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
    const target = vehicle.position
      .copy()
      .add(vehicle.velocity.copy().mult(10));
    // const prediction = vehicle.velocity.copy();
    // target.add(prediction.mult(10));
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

function findProjection(path, pos) {
  const v1 = p5.Vector.sub(pos, path.start);
  const v2 = p5.Vector.sub(path.end, path.start);

  v2.normalize();
  const sp = v1.dot(v2);
  // console.log(sp, v2.x)
  v2.mult(sp)
  v2.add(path.start)
  return v2
}
