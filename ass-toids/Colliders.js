class Colliders {
  colliders = new Map();
  tag;
  
  constructor(tag) {
    this.tag = tag ?? "";
  }

  add(collider) {
    if (Array.isArray(collider)) {
      collider.forEach(c => this.colliders.set(c.id, c))
    } else {
      this.colliders.set(collider.id, collider);
    }
  }

  set(colliders) {
    this.colliders = colliders;
  }

  delete(id) {
    this.colliders.delete(id);
  }

  checkCollision(other, cb) {
    for (let [colliderId, collider] of this.colliders) {
      const distance = p5.Vector.sub(collider.position, other.position).mag();
      const combinedRadius = (collider.hitbox.radius / 2) + (other.hitBoxRadius / 2);
      if (distance <= combinedRadius) {
        if (cb)  {
          cb(collider, this.colliders)
        }
        console.log(this.tag + ' collided with '+ other.tag)
        return true
      }
    }
  }
}