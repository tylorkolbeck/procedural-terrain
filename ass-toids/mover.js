class Mover {
  id;
  location;
  velocity;
  acceleration;
  sprite;
  hitBoxRadius = 5;
  tag = "MOVER"

  constructor(location, velocity, sprite = null) {
    this.id = Symbol();
    this.location = location;
    this.velocity = velocity.mult(10);
    this.sprite = sprite;
    this.acceleration = vector(0,0);
  }

  draw() {
    push()
    fill(255);	
    stroke(10,200,50)

  
    if (this.sprite) {
      imageMode(CENTER);
      translate(this.location.x, this.location.y);
      rotate(this.velocity.heading()-  1.57) 
      image(this.sprite, 0, 0, this.sprite.width, this.sprite.height);
    } else {
      ellipse(this.location.x, this.location.y, 5);
    }
    pop()
  }

  isOffScreen() {
    if (this.location.x > width || this.location.x < 0) {
      return true;
    }

    if (this.location.y > height || this.location.y < 0) {
      return true;
    }

    return false;
  }

  setTag(tag) {
    this.tag = tag;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);

    this.acceleration.set(0,0);
  }


}