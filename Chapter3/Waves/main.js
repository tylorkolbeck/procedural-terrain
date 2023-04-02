const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

let waves = [];

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  waves.push( new Wave(50, CANVAS_WIDTH / 2, 0));
  waves.push( new Wave(random(20, 80), random(0, width), random(TWO_PI)));
  waves.push( new Wave(random(20, 80), random(width), random(TWO_PI)));

  // wave = new Wave(50, CANVAS_WIDTH / 2, 0);  
}

function draw() {
 background(0);

 for (let x = 0; x < CANVAS_WIDTH; x += 10) {
  let y = 0;
  for (let wave of waves) {
    y += wave.calculateY(x);
  }
  strokeWeight(3);
  stroke(237, 34, 93);
  beginShape()
  ellipse(x, y + CANVAS_HEIGHT / 2, 10);
  endShape();
 }

 for (let i = 0; i < waves.length; i++) {
   waves[i].phase += 0.1;
 }

//  for (let i = 0; i < waves.length; i+= 10) {
//   const wave = waves[i]; 
//   let y;
//   for (let x = 0; x < innerWidth; x += 10) {
//      y += wave.calculateY(x);
//     }
//   // ellipse(i, y + CANVAS_HEIGHT / 2, 10);
//  }
}
