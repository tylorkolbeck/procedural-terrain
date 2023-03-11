const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 1200;
let rows = 100;
let cols = 100;
let tileMap = [];
let BLOCK_WIDTH = 40;
let BLOCK_HEIGHT = BLOCK_WIDTH;

function generateHeight() {
  return Math.round(Math.random() * 255);
}

function setup() {
  tileMap = new TileMap(cols, rows);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  tileMap.render();
}
