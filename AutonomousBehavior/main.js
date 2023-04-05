const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
let target;
let pursuer;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  // target
  target = new Vehicle(
    createVector(width / 2, height / 2),
    0,
    20,
    createVector(.1, 0)
  );
  
  // seeker
  pursuer = new Vehicle(
    createVector(random(CANVAS_WIDTH), random(CANVAS_HEIGHT)),
    0,
    20
  );
  pursuer.max_speed = 5;
  pursuer.setFill(color(255, 0, 0));
}

function draw() {
  background(1);
  let d = p5.Vector.dist(pursuer.position, target.position);
  

  // Seeker
  pursuer.applyForce(pursuer.pursue(target, true));
  // Seeker
  pursuer.render();
  // Target
  target.wander();
  target.render();

  wrapEdges(pursuer);
  wrapEdges(target);
  // bounceOffEdges(target);

  // target.position.set(mouseX, mouseY);
}

function wrapEdges(vehicle) {
  if (vehicle.position.x > width) {
    vehicle.position.x = 0 + vehicle.scale;
  } else if (vehicle.position.x < 0) {
    vehicle.position.x = width;
  } else if (vehicle.position.y > height) {
    vehicle.position.y = 0 + vehicle.scale;
  } else if (vehicle.position.y < 0) {
    vehicle.position.y = height;
  }
}

function bounceOffEdges(vehicle) {
  if (vehicle.position.x + vehicle.scale > width || vehicle.position.x < 0) {
    vehicle.velocity.mult(-1);
  }

  if (vehicle.position.y > height || vehicle.position.y < 0) {
    vehicle.velocity.mult(-1);
  }
}
