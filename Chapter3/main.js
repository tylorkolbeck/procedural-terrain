let angle = 0;
let angleV = 0;
let angleA = 0.001;
function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  angleMode(RADIANS)

}

function draw() {
  angleA = map(mouseX, 0, width, -0.001, 0.001);
  angleV = constrain(angleV, -0.09, 0.09)
  background(146, 83, 161);
  noStroke();
  fill(240, 99,164);

  translate(200, 200)
  rotate(angle);
  angle += angleV;
  angleV += angleA;
  rect(0,0,256,32)
}
