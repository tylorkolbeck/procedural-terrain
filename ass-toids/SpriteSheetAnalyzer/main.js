let spriteData;
let spriteSheet;

let spriteObj;
let imagesPerRow = 25;
let cellSize = 50;

let currentHoveredSprite = null;

function preload() {
  spriteData = loadJSON("../ship_sprite.json");
  spriteSheet = loadImage("../sprite_sheets/sprites.png");
}

function setup() {
  const cavasHeight = cellSize * ceil(spriteData.sprites.length / imagesPerRow);
  createCanvas(imagesPerRow * cellSize, cavasHeight + 100);

  spriteObj = new SpriteSheet(spriteSheet, spriteData);
  spriteObj.generateImages();
}

function draw() {
  background(255);

  let imageIndex = 0;
  let yLoc = 0;
  for (let r = 0; r < spriteData.sprites.length / imagesPerRow; r++) {
    let xLoc = 0;
    for (let c = 0; c < imagesPerRow; c++) {
      let img = spriteObj.images[imageIndex];
      if (!img) {
        break;
      }
      rect(xLoc, yLoc, cellSize, cellSize);
      image(
        img,
        xLoc,
        yLoc,
        cellSize,
        cellSize,
        0,
        0,
        img.width,
        img.height,
        CONTAIN
      );
      xLoc += 50;
      imageIndex++;
    }
    yLoc += 50;
  }

  let cellX = floor(mouseX / cellSize);
  let cellY = floor(mouseY / cellSize);
  let cellIndex = cellY * imagesPerRow + cellX;
  let hoveredSprite = spriteData.sprites[cellIndex];
  if (hoveredSprite) {
    currentHoveredSprite = hoveredSprite;
    push();
    noFill();
    stroke(color(255, 0, 0));
    fill(255, 100, 0, 20);
    rect(cellX * cellSize, cellY * cellSize, cellSize, cellSize);
    // line(cellX * cellSize, 0, cellX * cellSize, height)
    // line(0, cellSize * cellY, width, cellSize * cellY)
    pop();
    textAlign(CENTER);
    text(hoveredSprite.name, width / 2, height - 20);
    image(spriteObj.images[cellIndex], mouseX, mouseY, 100, 100);
  }
  spriteObj.draw();
}
