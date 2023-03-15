const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 400;

const randomCounts = [];

const probs = {
  60: 0,
  10: 0,
  40: 0
}

for (let i = 0; i < 20; i++) {
  randomCounts[i] = 0;
}


function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  background(255);
  probability(random())
  // const index = Math.floor(random(randomCounts.length));
  // randomCounts[index]++

  // stroke(0);
  // fill(175);
  const w = width / 3
  
  Object.keys(probs).forEach((p, i) => {
    rect(i * w, height - probs[p], w - 1, probs[p]);

  })

  // for (const key in probs) {
  //   rect(x * w, height - randomCounts[x], w - 1, randomCounts[x]);
    
    
  //   console.log(key)
  // }
  // for (let x = 0; x < 20; x++) {
  //   rect(x * w, height - randomCounts[x], w - 1, randomCounts[x]);
  // }

}