class ParticleEmitter {
  position;
  particles = [];
  size;

  particle;

  constructor(position, size = 4, particle) {
    this.position = position;
    this.particle = particle;
    this.size = size;
  }

  emit(num) {
    for (let i = 0; i < num; i++) {
      this.particles.push(
        new this.particle(createVector(this.position.x, this.position.y), this.size)
      );
    }

    this.update();
  }

  applyForce(force) {
    for (let p of this.particles) {
      p.applyForce(force);
    }
  }

  update() {
    for (let p of this.particles) {

      p.update();
      p.draw();

      if (p.lifeTime <= 0) {
        this.particles.splice(this.particles.indexOf(p), 1);
      }
    }
  }
}
