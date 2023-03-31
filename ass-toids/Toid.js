class Toid {
  static id = -1;
  id;
  hitBoxRadius;
  location;
  velocity;
  acceleration;
  sprite;

  boundsCheck = null;
  rotation;

  constructor(r, location, toidSprite) {
    this.rotation = random(TWO_PI);

    this.hitBoxRadius = r;
    this.location = location;
    this.velocity = createVector(random(0, 1), random(0,1))
    // this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    Toid.id++;
    this.id = Toid.id;
    this.sprite = toidSprite;
  }

  setBoundsCheck(checkFn) {
    this.boundsCheck = checkFn;
  }

  draw() {
    this.update();
    push(); 
    push();
    imageMode(CENTER);
    translate(this.location.x, this.location.y);
    rotate(this.rotation);
    image(this.sprite, 0, 0, this.hitBoxRadius, this.hitBoxRadius);
    pop();

    if (DEBUG) {
      this.drawHitBox()
    }
    pop();
  }

  drawHitBox() {
    push()
    noFill()
    stroke(color(255, 100,0))
    ellipse(this.location.x, this.location.y, this.hitBoxRadius)
    pop()
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);

    if (this.boundsCheck) {
      this.boundsCheck(this.location);
    }
    this.acceleration.set(0, 0);
  }
}
