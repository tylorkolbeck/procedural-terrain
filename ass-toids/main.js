const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 600;
let rocket;
let vector;

let DEBUG = true;

let toids;
const numToids = 6;

let level = 1;

const stars = [];
numStars = 100;
let backgroundImage;

let spriteData;
let spriteSheet;

let effectSprite;
let shipSprite;
let toidSprite;

let asteroidSpeedFactor = 1;

let asteroidColliders;

function preload() {
  vector = createVector;

  spriteData = loadJSON("ship_sprite.json");
  spriteSheet = loadImage("sprite_sheets/sprites.png");

  asteroidColliders = new Colliders('ASTEROID');
}

function setRocketSprite() {
  const sLoc = spriteData.sprites.find(s => s.name === "spaceShips_007.png");
  shipSprite = spriteSheet.get(sLoc.x,sLoc.y, sLoc.width, sLoc.height);
}

function setEffectSprite() {
  const sLoc = spriteData.sprites.find(s => s.name === "spaceEffects_018.png");
  effectSprite = spriteSheet.get(sLoc.x,sLoc.y, sLoc.width, sLoc.height);
}

function setMeteorSprite() {
  const sLoc = spriteData.sprites.find(s => s.name === "spaceMeteors_001.png");
  toidSprite = spriteSheet.get(sLoc.x, sLoc.y, sLoc.width, sLoc.height);
}

function setup() {
  frameRate(60);
  backgroundImage = generateStarBackground();
  setRocketSprite();
  setEffectSprite();
  setMeteorSprite();
  createCanvas(window.innerWidth, window.innerHeight);

  asteroidColliders.set(generateAsteroids(numToids, toidSprite, asteroidSpeedFactor));

  rocket = new Rocket(vector(width / 2, height / 2), vector(0, 0), 100, {ship: shipSprite, projectile: effectSprite});
  rocket.boundCheck = loopBounds;
}

function keyReleased(event) {
  if (event.which === 32) {
    rocket.stopFiring();
  }
}

function draw() {


  background(0);
  image(backgroundImage, 0, 0, width, height);
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    rocket.rotate("LEFT");
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    rocket.rotate("RIGHT");
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    rocket.applyThrust();
  }

  if (keyIsDown(DOWN_ARROW) ) {
  }

  if (keyIsDown(32)) {
    rocket.fireProjectile();
  }

  if (asteroidColliders.colliders.size === 0) {
    level++;
    asteroidSpeedFactor += 0.2;
    asteroidColliders.set(generateAsteroids(numToids, toidSprite, asteroidSpeedFactor));
  }
  renderGameObjects(asteroidColliders.colliders);

  rocket.update();
  rocket.draw();


  if (asteroidColliders.checkCollision(rocket)) {
    frameRate(0)
  }

  push()
  fill(255, 0, 0)
  textSize(20)
  text("Level: " + level, (width / 2) - 100, 20);
  pop()
}

function generateStarBackground() {
  const bg = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: random(0, CANVAS_WIDTH),
      y: random(0, CANVAS_HEIGHT),
      r: random(2, 5),
      c: random(100, 255),
    });
  }
  push();
  background(0);
  stars.forEach((s) => {
    bg.fill(s.c);
    bg.ellipse(s.x, s.y, s.r);
  });
  pop();

  return bg;
}

//  **** ASTEROID FUNCTIONS
function renderGameObjects(gameObjectMap) {
  for (let [id, o] of gameObjectMap) {
    o.update();
    o.draw();

    if (DEBUG) {
      o.debugDraw()
    }
  }
}

function generateAsteroids(num, toidSprite, speedFactor) {
  const asteroidMap = new Map();
  for (let i = 0; i < num; i++) {
    const diameter = random(40, 150);
    const t = new GameObject(vector(diameter * -1, random(0, height)), 0, diameter, toidSprite);
    t.setVelocity(vector(random(speedFactor * -1, speedFactor), random(speedFactor * -1, speedFactor)));
    t.attatchHitBox(new RoundHitBox(diameter, "ASTROID"));
    t.setBoundsCheck(loopBounds);
    asteroidMap.set(t.id, t);
  }
  return asteroidMap;
}


function loopBounds(locationVector) {
  if (locationVector.x > width) {
    locationVector.x = 0
  }

  if (locationVector.x < 0) {
    locationVector.x = width
  }

  if (locationVector.y > height) {
    locationVector.y = 0;
  }

  if (locationVector.y < 0) {
    locationVector.y = height
  }
}
