const ZOOM = 1;
const WIDTH = 800;
const HEIGHT = 800;
const NUM_CELLS = 50;
const CELLSIZE = WIDTH / NUM_CELLS;

const stage$ = document.getElementById("stage");
const grid$ = document.getElementById("grid");

let mouseX;
let mouseY;

const elements = [
  {
    id: "el1",
    cols: 4,
    rows: 2,
    location: {
      x: WIDTH / 2,
      y: HEIGHT / 2,
    },
    ref: null,
  },
  {
    id: "el2",
    cols: 6,
    rows: 1,
    location: {
      x: WIDTH / 4,
      y: HEIGHT / 4,
    },
    ref: null,
  },
  {
    id: "el3",
    cols: 20,
    rows: 1,
    location: {
      x: 600,
      y: HEIGHT + 100,
    },
    ref: null,
  },
  {
    id: "el4",
    cols: 10,
    rows: 1,
    location: {
      x: 600,
      y: -100,
    },
    ref: null,
  },
];

init();

function init() {
  drawStage();
  elements.forEach((el) => renderElement(el));
  drawGridCells(grid$);
}

function drawStage() {
  stage$.style.width = WIDTH * ZOOM + "px";
  stage$.style.height = HEIGHT * ZOOM + "px";
  stage$.style.border = "1px solid black";
}

// render the element but make sure that is set on a cell boundary
function renderElement(el) {
  const el$ = document.createElement("div");
  el$.classList.add("element");
  el$.id = el.id;
  el$.style.width = el.cols * CELLSIZE * ZOOM + "px";
  el$.style.height = el.rows * CELLSIZE * ZOOM + "px";
  el$.style.position = "absolute";

  //position to closest cell boundary
  let leftLocation = Math.round(el.location.x / CELLSIZE) * CELLSIZE;
  let topLocation = Math.round(el.location.y / CELLSIZE) * CELLSIZE;

  // prevent the element from going out of right bounds by moving it left
  if (leftLocation + el.cols * CELLSIZE > WIDTH) {
    el.location.x = WIDTH - el.cols * CELLSIZE;
    leftLocation = el.location.x;
  }
  if (leftLocation < 0) {
    el.location.x = 0;
    leftLocation = el.location.x;
  }

  if (topLocation + el.rows * CELLSIZE > HEIGHT) {
    el.location.y = HEIGHT - el.rows * CELLSIZE;
    topLocation = el.location.y;
  }
  if (topLocation < 0) {
    el.location.y = 0;
    topLocation = el.location.y;
  }

  el.location.x = leftLocation;
  el.location.y = topLocation;

  el$.style.left = el.location.x * ZOOM + "px";
  el$.style.top = el.location.y * ZOOM + "px";
  // make draggable
  // el$.setAttribute("draggable", true);
  stage$.appendChild(el$);

  setTimeout(() => {
    el.ref = el$;
    // makeDraggable(el);
    // el.ref.addEventListener('mousedown', mouseDownHandler);
  }, 100);
}

// function makeDraggable(el) {
//   el.ref.addEventListener("mousedown", function (e) {
//     // start drag

//     // console.log("mousedown", e);
//   });
//   el.ref.addEventListener("mousemove", function (e) {
//     // console.log("mousemove", e);
//     // move the el and update in the grid
//   });
//   el.ref.addEventListener("mouseup", function (e) {
//     console.log("mouseup", e);
//     const target = e.target;
//     const element = elements.find((el) => el.id === target.id);

//     // stop drag
//   });

//   // ondragend listener
//   el.ref.addEventListener("dragend", function (e) {
//     // console.log("dragend", e);
//     e.preventDefault()
//     console.log("DRAG END")
//     const target = e.target;
//     const element = elements.find((el) => el.id === target.id);
//     element.ref.style.backgroundColor = "blue";
//     console.log("target id", target.getAttribute("id"));
//     console.log("DRAGGING ENDED")
//     // e.dataTransfer.setData("text", e.target.id);
//   })

//   // add ondragstart listener
//   el.ref.addEventListener("dragstart", function (e) {
//     // console.log("dragstart", e);
//     e.preventDefault()
//     const target = e.target;
//     const element = elements.find((el) => el.id === target.id);
//     element.ref.style.backgroundColor = "red";
//     console.log("target id", target.getAttribute("id"));
//     console.log("DRAGGING")
//     // e.dataTransfer.setData("text", e.target.id);
//   })

//   // add the dragging listener
//   el.ref.addEventListener("drag", function (e) {
//     // console.log("drag", e);
//     e.preventDefault()
//     const target = e.target;
//     const element = elements.find((el) => el.id === target.id);
//     drag(e);
//     console.log("DRAGGING")
//     // e.dataTransfer.setData("text", e.target.id);
//   })
// }

function drawGridCells(gridEl) {
  gridEl.cols = Math.floor(WIDTH / CELLSIZE);
  gridEl.rows = Math.floor(HEIGHT / CELLSIZE);

  for (let i = 0; i < gridEl.rows; i++) {
    for (let j = 0; j < gridEl.cols; j++) {
      const cell$ = document.createElement("div");
      cell$.classList.add("cell");
      cell$.style.width = CELLSIZE * ZOOM + "px";
      cell$.style.height = CELLSIZE * ZOOM + "px";
      cell$.style.position = "absolute";
      cell$.style.left = j * CELLSIZE * ZOOM + "px";
      cell$.style.top = i * CELLSIZE * ZOOM + "px";
      cell$.style.border = "1px solid #ccc";
      gridEl.appendChild(cell$);
    }
  }
}

function drag(ev) {
  console.log("DRAGGING");
  ev.dataTransfer.setData("text", ev.target.id);
  const target = e.target;
  const element = elements.find((el) => el.id === target.id);
  // set the elements new position while dragging
  element.location.x = ev.clientX;
  element.location.y = ev.clientY;
  renderElement(element);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

const mouseDownHandler = function (e) {
  // Get the current mouse position
  x = e.clientX;
  y = e.clientY;

  // Attach the listeners to `document`
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
};

let elInMove;
const mouseMoveHandler = function (e) {
  // How far the mouse has been moved
  const dx = e.clientX - x;
  const dy = e.clientY - y;
  // console.log(e.target.id)

  const el = elements.find((el) => el.id === e.target.id);
  console.log(el);

  // Set the position of element
  el.ref.style.top = `${el.ref.offsetTop + dy}px`;
  el.ref.style.left = `${el.ref.offsetLeft + dx}px`;

  // Reassign the position of mouse
  x = e.clientX;
  y = e.clientY;
};

const mouseUpHandler = function () {
  // Remove the handlers of `mousemove` and `mouseup`
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseup", mouseUpHandler);
};

// makeDraggable($('el1'), {
//   constrainTo: $('stage'),
//   gridWidth: CELLSIZE, // snap to 50 pixel grid cells
//   gridHeight: CELLSIZE,
//   snapToGrid: true // enable snap to grid
// })

const el6 = document.getElementById("el6");
const container = document.getElementById("stage");
makeDraggable(el6, { container, contain: true, snapToGrid: true, cellSize: CELLSIZE });
makeResizable(el6)


{/* <div class="resizer resizer-r"></div>
<div class="resizer resizer-b"></div> */}
// Returns a dom element by id
function $(id) {
  return document.getElementById(id);
}
