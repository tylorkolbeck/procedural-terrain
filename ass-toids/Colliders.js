class Colliders {
  colliders = new Map();
  
  constructor() {}

  add(collider) {
    if (Array.isArray(collider)) {
      collider.forEach(c => this.colliders.set(c.id, c))
    } else {
      this.colliders.set(collider.id, collider);
    }
  }

  checkCollision(other) {
    for (let [colliderId, collider] of this.colliders) {
      const distance = p5.Vector.sub(collider.location, other.location).mag();
      const combinedRadius = (collider.hitBoxRadius / 2) + (other.hitBoxRadius / 2);


      if (distance <= combinedRadius) {
        return true
      }
      // console.log(collider.hitBoxRadius + other.hitBoxRadius)
      // console.log()
      // // calculate the distance
      // const dx = collider.location.x - other.location.x ;
      // const dy = collider.location.y - other.location.y ;
      // const combinedRadius = collider.hitBoxRadius + other.hitBoxRadius;
      // // console.log(combinedRadius)
      // const distance = p5.Vector.sub(collider.location, other.location).mag();
      // // calculate if other is colliding with collider taking radius into consideration
      // const colliding = distance < combinedRadius;
      // if (colliding) {
      //   // console.log(distance)
      //   // console.log("COLLIDING", distance)
      //   // return colliding;
      // }
      


      // const distance = Math.sqrt(dx * dx + dy * dy);
      // const colliding = distance < other.hitBoxRadius

      // if (colliding) {
      //   console.log(distance)
      //   return colliding
      // }

      // const d1 = p5.Vector.sub(other.location, collider.location);
      // const d2 = Math.sqrt()

      // if (colliding) {
      //   return true
      // } else {
      //   return false
      // }
      // check if other is within the radius of collider

    }
  }
}