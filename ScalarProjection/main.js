let path1;
let vehicle1;

let vehicles = [];

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < 20; i++) {
    vehicles.push(
      new Vehicle(
        createVector(random(width), random(height)),
        0,
        10,
        createVector(random(-1, 1), random(-1, 1))
      )
    );
  }
  path1 = new Path(
    createVector(0, height / 2 + 50),
    createVector(width, height / 2 + 100),
    10
  );
  // vehicle1 = new Vehicle(createVector(100, 200),0, 10, createVector(1, 0));
}

function calculateDot(a, b) {
  const bCopy = b.copy().normalize();
  // return bCopy.dot(a)
  return a.x * bCopy.x + a.y * bCopy.y;
}

function vectorProjection(a, b) {
  const bCopy = b.copy().normalize();
  const sp = bCopy.dot(a);
  return bCopy.mult(sp);
}

function draw() {
  background(1);
  // path1.start.y = random(height);
  // path1.end.y = random(height);
  path1.end.y = mouseY
  path1.end.x = mouseX
  for (let v of vehicles) {
    v.render();
    
    let force = v.follow(path1);
    v.applyForce(force);
    wrapEdges(v);
  }
  // vehicle1.render();
  path1.draw();
  // wrapEdges(vehicle1);

  // let force = vehicle1.follow(path1)
  // vehicle1.applyForce(force);

  // let vp = vectorProjection(vehicle1.position, p5.Vector.sub(path1.start, path1.end));

  // circle(path1.start.x + vp.x, path1.start.y + vp.y, 10);
}

function wrapEdges(vehicle) {
  if (vehicle.position.x > width) {
    vehicle.position.x = 0;
  } else if (vehicle.position.x < 0) {
    vehicle.position.x = width;
  }
  if (vehicle.position.y > height) {
    vehicle.position.y = 0;
  } else if (vehicle.position.y < 0) {
    vehicle.position.y = height;
  }
}

// let pos = createVector(100, 200);

// const mouse = createVector(mouseX, mouseY);
// // const a = createVector(100, -50); // green dot
// const a = p5.Vector.sub(mouse, pos); // green dot
// const path = createVector(200, 50);

// stroke(255);
// strokeWeight(4);

// // horizontal line
// line(pos.x, pos.y, pos.x + path.x, pos.y + path.y);

// const sp = vectorProjection(a, path);

// fill(255, 0, 0);
// noStroke();
// circle(pos.x + sp.x, pos.y + sp.y, 10);

// // noStroke();
// fill(0, 255, 0);
// circle(pos.x + a.x, pos.y + a.y, 10);

// // Normal line
// stroke(255)
// strokeWeight(1)
// line(pos.x + a.x, pos.y + a.y, pos.x + sp.x, pos.y + sp.y);
