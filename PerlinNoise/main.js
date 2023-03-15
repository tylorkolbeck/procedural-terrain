const CAVNAS_DIM = 400;
const CANVAS_HEIGHT = CAVNAS_DIM;
const CANVAS_WIDTH = CAVNAS_DIM;

let generateBtn$;
let falloff$;
let falloff = 0.2;

let t = 3;
let img;

let startXOff = 0.0;
let startYOff = 1000.00;

let offSet = 0;

let walker; 

let slider;

let third = 0.00;

function generateImage() {
  img = createImage(CANVAS_WIDTH, CANVAS_HEIGHT);
  img.loadPixels();
  let xOffset = startXOff;
  for (let i = 0; i < img.width; i++) {
    let yOffset = startYOff;
    for (let j = 0; j < img.height; j++) {
      noiseDetail(8, falloff);
      // const bright = map(noise(xOffset, yOffset, third), 0, 1, 0, 255)
      const bright = noise(xOffset, yOffset, third) * 255
      img.set(i, j, color(bright, bright, bright));
      yOffset += 0.01
    }
    xOffset += 0.01
  }

  img.updatePixels();


  image(img, 0,0)

}

function setup() {
  textSize(15);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  slider = createSlider(0, 10, offSet, .1);
  slider.position(20, 500)
  text('Offset', 100, 500);
  console.log(slider)

  generateBtn$ = document.getElementById('generate');
  generateBtn$.addEventListener('click', () => generateImage()) 



  falloff$ = document.getElementById('falloff');
  falloff$.value = falloff
  falloff$.addEventListener('change', (e) => {

    falloff = e.target.value;
    generateImage();
  })

  generateImage()

}

function generateGrid() {
  
}

function draw() {
  let val = slider.value();
  if (val !== offSet) {
    startXOff = val;
    // startYOff = val;
    generateImage();
  }

  // third += 0.5;
  // generateImage()
}