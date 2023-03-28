const cirRadius = 16;

let r = 1;
let theta = 0;

let amplitude = 100;
let period = 120;
const oscillators = [];
const NUM_OSC = 1;

let loc;

let angle = 0.01;
let angleVel = 0.05;
let angleAccel = 0.01;

let angleDrag = 0.01;



function setup() {
  createCanvas(1200, 600);
  testVec = createVector(0,0);

  [...Array(NUM_OSC)].forEach(o => oscillators.push(new Oscillator()));

  testVec.add(createVector(100, -100));

  loc = createVector(100, 0);
}

function draw() {
  if (keyIsDown(RIGHT_ARROW)) {
    if (angleVel < 0.5) 
    angleAccel = 0.02;
  }

  if(keyIsDown(LEFT_ARROW)) {
    angleVel -= 0.02;
  } 

  // if (angleVel + angleAccel < 0.3 && angleVel + angleAccel > 0) {
  //   angleVel += angleAccel
  // }

  angleVel += angleAccel

  angleVel -= angleDrag * angleVel;
  if (angleVel < 0) {
    angleVel = 0;
  }


  background(255)
  translate(width / 2, height / 2);
  rotate(angle)
  line(0,0, loc.x, loc.y)
  ellipse(0,0, 20)
  ellipse(loc.x, loc.y, 20)

  angle += angleVel

  angleAccel = 0;



  // oscillators.forEach(o => {
  //   o.render()
  // })
}
