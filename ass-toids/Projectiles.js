class Projectiles {
  projectiles = new Map();

  constructor() {}

  add(p) {
    this.projectiles.set(p.id, p);
  }

  length() {
    return this.projectiles.size;
  }

  render() {
    for (let [id, p] of this.projectiles) {
      if (p.isOffScreen()) {
        this.projectiles.delete(p.id);
      }
      p.update();
      p.draw();
    }
  }

  checkCollision(colliders) {
    for (let [id, p] of this.projectiles) {
      if (colliders.checkCollision(p, (collider, colliders) => {
        colliders.delete(collider.id)

      })) {
        this.projectiles.delete(p.id);
      }
    } 
  }
}
