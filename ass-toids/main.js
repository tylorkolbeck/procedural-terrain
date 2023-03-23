const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 600;
let rocket;
let vector;

const stars = [];
numStars = 100;
let backgroundImage;

let spriteData;
let spriteSheet;

let effectSprite;
let shipSprite;
let spaceStationSprite;

let spaceStation;

function preload() {
  vector = createVector;

  spriteData = loadJSON("ship_sprite.json");
  spriteSheet = loadImage("sprite_sheets/sprites.png");
}

function setRocketSprite() {
  const sLoc = spriteData.sprites.find(s => s.name === "spaceShips_007.png");
  shipSprite = spriteSheet.get(sLoc.x,sLoc.y, sLoc.width, sLoc.height);
}

function setEffectSprite() {
  const sLoc = spriteData.sprites.find(s => s.name === "spaceEffects_018.png");
  effectSprite = spriteSheet.get(sLoc.x,sLoc.y, sLoc.width, sLoc.height);
}

function setSpaceStationSprite() {
  const sLoc = spriteData.sprites.find(s => s.name === "spaceStation_024.png");
  spaceStationSprite = spriteSheet.get(sLoc.x,sLoc.y, sLoc.width, sLoc.height);
  spaceStationSprite.width /= 2;
  spaceStationSprite.height /= 2;
}

function setup() {
  frameRate(60);
  backgroundImage = generateStarBackground();
  setRocketSprite()
  setEffectSprite()
  setSpaceStationSprite()
  createCanvas(1200, 600);
  spaceStation = new Mover(vector(width - (spaceStationSprite.width / 2 + 50), height - (spaceStationSprite.height / 2)), vector(0,0), spaceStationSprite);
  rocket = new Rocket(vector(width / 2, height / 2), vector(0, 0), 100, {ship: shipSprite, projectile: effectSprite});
}

function keyReleased(event) {
  if (event.which === 32) {
    rocket.stopFiring();
  }
}

function draw() {
  background(0);
  image(backgroundImage, 0, 0, width, height);
  if (keyIsDown(LEFT_ARROW)) {
    rocket.rotate("LEFT");
  }

  if (keyIsDown(RIGHT_ARROW)) {
    rocket.rotate("RIGHT");
  }

  if (keyIsDown(UP_ARROW)) {
    rocket.applyThrust();
  }

  if (keyIsDown(DOWN_ARROW)) {
  }

  if (keyIsDown(32)) {
    rocket.fireProjectile();
  }

  rocket.update();
  rocket.draw();

  spaceStation.update();
  spaceStation.draw();
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
