const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 600;
let rocket;
let vector;

let DEBUG = true;

let toids;
const NUM_TOIDS = 0;

let level = 1;

const stars = [];
numStars = 100;
let backgroundImage;

let spriteData;
let spriteSheet;

let effectSprite;
let shipSprite;
let toidSprite;
let thrustSprite;

let asteroidSpeedFactor = 1;
let asteroidColliders;

let gameOver = false;

let wandererSprite;
const NUM_WANDERERS = 20;
const wanderers = [];

function preload() {
  vector = createVector;

  spriteData = loadJSON("ship_sprite.json");
  spriteSheet = loadImage("sprite_sheets/sprites.png");

  window.addEventListener("keydown", (e) => {
    if (e.key === "p") {
      DEBUG = !DEBUG;
    }

    // check for spacebar key press

    if (e.key === 32) {
      debugger;
      e.preventDefault();
    }

    if (e.key === "n") {
      gameOver = false;
      setupGame();
    }
  });
}

function setRocketSprite() {
  const sLoc = spriteData.sprites.find((s) => s.name === "spaceShips_009.png");
  shipSprite = spriteSheet.get(sLoc.x, sLoc.y, sLoc.width, sLoc.height);
}

function setThrustSprite() {
  const sLoc = spriteData.sprites.find(
    (s) => s.name === "spaceEffects_003.png"
  );
  thrustSprite = spriteSheet.get(sLoc.x, sLoc.y, sLoc.width, sLoc.height);
}

function setEffectSprite() {
  const sLoc = spriteData.sprites.find(
    (s) => s.name === "spaceEffects_018.png"
  );
  effectSprite = spriteSheet.get(sLoc.x, sLoc.y, sLoc.width, sLoc.height);
}

function setMeteorSprite() {
  const sLoc = spriteData.sprites.find(
    (s) => s.name === "spaceMeteors_001.png"
  );
  toidSprite = spriteSheet.get(sLoc.x, sLoc.y, sLoc.width, sLoc.height);
}

function setWandererSprite() {
  const sLoc = spriteData.sprites.find((s) => s.name === "spaceShips_006.png");
  wandererSprite = spriteSheet.get(sLoc.x, sLoc.y, sLoc.width, sLoc.height);
}

function setup() {
  createCanvas(1200, 1200);
  frameRate(60);
  setupGame();
}

function keyReleased(event) {
  if (event.which === 32) {
    rocket.stopFiring();
  }
}

let frameRates = [];
let averageFrameRate = 0;
let lowestAverage = 1000;

function trackFrameRate(frameRate) {
  const averageOver = 10;

  if (frameRates.length > averageOver) {
    frameRates.shift();
    frameRates.push(frameRate);
  } else {
    frameRates.push(frameRate);
  }

  averageFrameRate = frameRates.reduce((a, b) => a + b, 0) / frameRates.length;
  if (
    averageFrameRate < lowestAverage &&
    averageFrameRate > 0 &&
    frameRates.length > averageOver
  ) {
    lowestAverage = averageFrameRate;
  }
}

function draw() {
  background(0);
  // trackFrameRate(frameRate());   

  if (gameOver) {
    frameRate(0);
  }

  image(backgroundImage, 0, 0, width, height);
  checkKeyDowns();

  if (asteroidColliders.colliders.size < NUM_TOIDS) {
    level++;
    asteroidSpeedFactor += 0.2;
    asteroidColliders.set(
      generateAsteroids(NUM_TOIDS, toidSprite, asteroidSpeedFactor)
    );
  }

  renderGameObjects(asteroidColliders.colliders);

  for (let w of wanderers) {
    wrapEdges(w);
    w.render();

    // const distanceToRocket = p5.Vector.sub(rocket.position, w.position);
    if (p5.Vector.sub(rocket.position, w.position).mag() < 300) {
      w.applyForce(w.pursue(rocket, true));
    } 
    // else {
    // w.wander();

    // }
    // w.wander();

  }

  rocket.update();
  rocket.draw();

  if (asteroidColliders.checkCollision(rocket)) {
    push();
    textAlign(CENTER);
    textSize(100);
    fill(255, 0, 0);
    text("GAME OVER ", width / 2, height / 2);
    pop();
    gameOver = true;
  }

  push();
  fill(255, 0, 0);
  textSize(20);
  text("Level: " + level, width / 2 - 100, 20);
  pop();
}

function checkKeyDowns() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    rocket.rotate("LEFT");
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    rocket.rotate("RIGHT");
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    rocket.applyThrust();
  }

  if (keyIsDown(DOWN_ARROW)) {
  }

  if (keyIsDown(32)) {
    rocket.fireProjectile();
  }
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
      o.debugDraw();
    }
  }
}

function generateAsteroids(num, toidSprite, speedFactor) {
  const asteroidMap = new Map();
  for (let i = 0; i < num; i++) {
    const diameter = random(40, 150);
    const t = new GameObject(
      vector(diameter * -1, random(0, height)),
      0,
      diameter,
      toidSprite
    );
    t.setVelocity(
      vector(
        random(speedFactor * -1, speedFactor),
        random(speedFactor * -1, speedFactor)
      )
    );
    t.attatchHitBox(new RoundHitBox(diameter, "ASTROID"));
    t.setBoundsCheck(loopBounds);
    asteroidMap.set(t.id, t);
  }
  return asteroidMap;
}

function loopBounds(locationVector) {
  if (locationVector.x > width) {
    locationVector.x = 0;
  }

  if (locationVector.x < 0) {
    locationVector.x = width;
  }

  if (locationVector.y > height) {
    locationVector.y = 0;
  }

  if (locationVector.y < 0) {
    locationVector.y = height;
  }
}

function initializeSprites() {
  setRocketSprite();
  setEffectSprite();
  setThrustSprite();
  setMeteorSprite();
  setWandererSprite();
}

function setupGame() {
  frameRate(60);
  initializeSprites();
  level = 1;
  backgroundImage = generateStarBackground();
  asteroidColliders = new Colliders("ASTEROID");

  createCanvas(window.innerWidth, window.innerHeight);

  generateWanderers();

  asteroidColliders.set(
    generateAsteroids(NUM_TOIDS, toidSprite, asteroidSpeedFactor)
  );

  rocket = new Rocket(vector(width / 2, height / 2), vector(0, 0), 100, {
    ship: shipSprite,
    projectile: effectSprite,
    thrust: thrustSprite,
  });
  rocket.boundCheck = loopBounds;
}

function generateWanderers() {
  for (let i = 0; i < NUM_WANDERERS; i++) {
    const v = new Vehicle(
      p5.Vector.random2D(CANVAS_WIDTH, CANVAS_HEIGHT),
      0,
      40,
      p5.Vector.random2D()
    );
    wanderers.push(v);
    v.setSprite(wandererSprite);
  }
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
