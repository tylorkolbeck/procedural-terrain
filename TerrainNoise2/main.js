const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 400;

// NEW STUFF
let noiseScale = 0.01;
let noiseOctaves = 4;
let noiseLucunarity = 2;
let noisePersistance = 0.5;
// END NEW STUFF



function setup() {
  const noise = new Noise();
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(255);
  
  createTileMap();
  renderGrid();

  
}