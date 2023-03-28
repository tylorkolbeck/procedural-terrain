// let angle = 0.01;
let amplitude = 200;

let angleX = 0;
let angleXV = 0.05;

let angleY = 0;
let angleYV = 0.05;

const r = 4;
const angles = [];
const angleVs = [];
const amps = [];

let numPoints;


function setup() {
  createCanvas(600, 600);
  background(1);
  numPoints = Math.floor(width / (r * 2));
  for (let i = 0; i < numPoints + 5; i++) {
    angles[i] = map(i, 0, numPoints, 0, 2* TWO_PI);
    // angles.push(a);
    // angleVs.push(a);
    amps.push(50)
  }

  console.log(angles)
  // console.log("NUM POINTS: ", numPoints)
}

function draw() {
  // ellipseMode(LEFT)
  background(1);
  noFill();
  stroke(255)
  translate(width / 2, height / 2);
  beginShape()
  
  for (let i = 0; i < angles.length; i++) {
    let y = map(sin(angles[i]), -1, 1, -100, 100);
    let x = map(i, 0, angles.length, -300, 300);
    // circle(x, y, r * 2)
    vertex(x, y)
    // vertex(x, y)
    // line(x,0, x, y);
    // angles[i] += angleVs[i]
    angles[i] += 0.2

  }


  endShape()
  // for (let i = 0; i < numPoints; i++) {
  //   let y = sin(i) * 50;
  //   ellipse(i * pointR + pointR / 2, y + height / 2, pointR)
  // }
  // stroke(255)

  // let y = amplitude * sin(angleY);
  // let x = amplitude * cos(angleX);

  // translate(width / 2, height / 2);
  // // line(0,0, x, y)
  // ellipse(x, y, 10);
  
  // angleX += angleXV;
  // angleY += angleYV;
  
  // console.log(sin(angleV))
}
