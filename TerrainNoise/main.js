const CANVAS_SIZE = 600;
const NOISE_SEED = 1;

const RESOLUTION = 200;
const BLOCK_SIZE = CANVAS_SIZE / RESOLUTION;

let tileMap = [];

const XOFF = 0;
const YOFF = 10000;

// NEW STUFF
let noiseScale = 0.01;
let noiseOctaves = 4;
let noiseLucunarity = 2;
let noisePersistance = 0.5;
// END NEW STUFF

function createTileMap() {
  noiseDetail(10, .3);

  let xOffset = XOFF;
  for (let i = 0; i < RESOLUTION; i++) {
    let yOffset = YOFF;
    tileMap[i] = [];
    for (let j = 0; j < RESOLUTION; j++) {
      const newCell = new Cell(BLOCK_SIZE);
      newCell.r = map(noise(xOffset, yOffset), 0, 1, 0, 255);
      newCell.g = map(noise(xOffset, yOffset), 0, 1, 0, 255);
      tileMap[i][j] = newCell;
      yOffset += 0.03;
    }
    xOffset += 0.03;
  }
}

function renderGrid() {
  for (let i = 0; i < RESOLUTION; i++) {
    for (let j = 0; j < RESOLUTION; j++) {
      tileMap[i][j].draw(i, j, j);
    }
  }
}


function setup() {
  noiseSeed(NOISE_SEED);
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(255);
  
  createTileMap();
  renderGrid();

  
}