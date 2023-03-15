const loopBtn$ = document.getElementById('loopBtn');
const liveNeighborsRequired$ = document.getElementById('nThreshold');
const fillPercent$ = document.getElementById('fillPercent');
const paramsForm$ = document.getElementById('paramsForm');

window.addEventListener('load', () => {
  liveNeighborsRequired$.value = TileMap.liveNeighborsRequired;
  fillPercent$.value = Block.fillPercent
})

paramsForm$.addEventListener('submit', (e) => {
  e.preventDefault();
  const liveNeighborsRequired = liveNeighborsRequired$.value;
  const fillPercent = fillPercent$.value;

  TileMap.liveNeighborsRequired = liveNeighborsRequired;
  Block.fillPercent = fillPercent;

  tileMap.tileMap = tileMap.buildTileMap();
  tileMap.render();
})

loopBtn$.addEventListener('click', () => {
  tileMap.runGeneration();
})



const CANVAS_WIDTH = 3000;
const CANVAS_HEIGHT = 3000;
let rows = 100;
let cols = 100;
let tileMap = [];
let BLOCK_WIDTH = 5;
let BLOCK_HEIGHT = BLOCK_WIDTH;
const ITERATIONS = 0;


const sleep = (millis) => { 
  return new Promise(resolve => setTimeout(resolve, millis)) 
}

function setup() {
  tileMap = new TileMap(cols, rows, {height: BLOCK_HEIGHT, width: BLOCK_WIDTH});
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  for (let i =0; i < ITERATIONS; i++) {
    tileMap.runGeneration();
  }
  
  noLoop();
}

async function draw() {
  tileMap.render();
}


