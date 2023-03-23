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
}
