class GameObject {
  static id = -1;
  id;
  position;
  rotation;
  velocity;
  acceleration = createVector(0, 0);
  scale;
  sprite;

  boundCheckFn = null;
  hitbox;

  constructor(position, rotation, scale, sprite) {
    this.position = position;
    this.rotation = rotation;
    this.scale = scale ?? 1;
    this.sprite = sprite ?? null;
    this.id = ++GameObject.id;
  }

  draw() {
    this.update();
    push();
    translate(this.position.x, this.position.y);

    if (this.sprite) {
      this.drawSprite();
    }

    pop();

    if (DEBUG) {
      this.debugDraw();
    }
  }

  update() {
    if (this.hitbox) this.hitbox.update(this.position);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    if (this.boundCheckFn) {
      this.boundCheckFn(this.position);
    }

    this.acceleration.set(0, 0);
  }

  attatchHitBox(hitbox) {
    this.hitbox = hitbox;
  }

  setBoundsCheck(checkFn) {
    this.boundCheckFn = checkFn;
  }

  setVelocity(velocity) {
    this.velocity = velocity;
  }

  drawSprite() {
    imageMode(CENTER);
    rotate(this.rotation);
    image(this.sprite, 0, 0, this.scale, this.scale);
  }

  debugDraw() {
    if (this.hitbox) this.hitbox.debugDraw();

    push();
    stroke(color(255, 100, 0));
    const dr = this.velocity.copy().mult(20);
    line(
      this.position.x,
      this.position.y,
      this.position.x + dr.x,
      this.position.y + dr.y
    );
    pop();
  }
}
