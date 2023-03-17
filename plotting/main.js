const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

let graphicsBuffer;
let grid;

let plots;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  grid = new Grid(10, {
    origin: {x: width / 2, y: height / 2}
  });
  plots = generatePlots();
}

function equation(x) {
  // return ((x**3) - (2 * x)) / 10;
  // return x**2
  return Math.log(x**6) * 2
  return Math.sqrt(x**2)
}

function generatePlots() {
  const nums = [-16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  const plots = [];

  nums.forEach(x => {
    plots.push({
      x: x,
      y: equation(x)
    })
  })

  return plots;
}


function draw() {
  background(200);
  plots.forEach(i => grid.plot(i))
  // grid.plot({x: 1, y: 1})
  // grid.plot({x: 1, y: -1})
  // grid.plot({x: -1, y: 1})
  // grid.plot({x: -1, y: -1})
  grid.render();


}