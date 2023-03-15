class PVector {
  x;
  y;
  z;
  limit = null;

  constructor(x, y, z) {
    this.x = x;
    this.y = y;

    this.z = z ? z : 0;
  }


  lim(val) {
    if (this.mag() > val) {
      const norm = this.normalize()
      norm.mult(val)
      this.set(norm)
    }
  }

  set(vector) {
    this.x = vector.x;
    this.y = vector.y;

    if (vector.z)
      this.z = vector.z
  }

  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  normalize() {
    const m = this.mag();

    if (m !== 0) {
      const norm = PVector.Div(this, m);
      return norm;
    } else {
      return new PVector(0, 0)
    }
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  div(operand) {
    this.x /= operand
    this.y /= operand
  }

  mult(multiplier) {
    this.x *= multiplier
    this.y *= multiplier
  }

  reverseX() {
    this.x *= -1;
  }

  reverseY() {
    this.y *= -1;
  }

  reverseZ() {
    this.z *= -1;
  }

  static Sub(vector1, vector2) {
    const newVec = new PVector(0,0);

    newVec.x = vector1.x - vector2.x;
    newVec.y = vector1.y - vector2.y;

    return newVec;
  }

  static Div(vector, op) {
    return new PVector(vector.x / op, vector.y / op );
  }

  static AddV2(vector1, vector2) {
    return new PVector(vector1.x + vector2.x, vector1.y + vector2.y);
  }

  static AddV2(vector1, vector2) {
    return new PVector(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector3.z);
  }
}