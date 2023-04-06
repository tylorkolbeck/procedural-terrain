// function makeDraggable(element) {
//   let isDragging = false;
//   let currentX;
//   let currentY;
//   let initialX;
//   let initialY;
//   let xOffset = 0;
//   let yOffset = 0;

//   element.addEventListener("mousedown", dragStart);
//   element.addEventListener("mouseup", dragEnd);
//   document.addEventListener("mousemove", drag);
//   // document.addEventListener("mouseleave", dragEnd);

//   function dragStart(e) {
//     e.preventDefault();
//     isDragging = true;

//     const rect = element.getBoundingClientRect();

//     initialX = e.clientX - rect.left;
//     initialY = e.clientY - rect.top;
//   }

//   function dragEnd(e) {
//     isDragging = false;
//   }

//   function drag(e) {
//     e.preventDefault();

//     if (isDragging) {
//       currentX = e.clientX - initialX;
//       currentY = e.clientY - initialY;

//       xOffset = currentX;
//       yOffset = currentY;

//       element.style.left = currentX + "px";
//       element.style.top = currentY + "px";
//     }
//   }
// }
// function makeDraggable(element, container) {
//   let isDragging = false;
//   let currentX;
//   let currentY;
//   let initialX;
//   let initialY;
//   let xOffset = 0;
//   let yOffset = 0;

//    // Get the bounds of the container
//    const containerRect = container.getBoundingClientRect();

//   element.addEventListener("mousedown", dragStart);
//   element.addEventListener("mouseup", dragEnd);
//   element.addEventListener("mousemove", drag);
//   // element.addEventListener("mouseleave", dragEnd);

//   function dragStart(e) {
//     e.preventDefault();
//     isDragging = true;

//      // Keep the element within the bounds of the container
//      if (currentX < containerRect.left) {
//       currentX = containerRect.left;
//     } else if (currentX + element.offsetWidth > containerRect.right) {
//       currentX = containerRect.right - element.offsetWidth;
//     }
//     if (currentY < containerRect.top) {
//       currentY = containerRect.top;
//     } else if (currentY + element.offsetHeight > containerRect.bottom) {
//       currentY = containerRect.bottom - element.offsetHeight;
//     }

//     initialX = e.clientX - element.getBoundingClientRect().left;
//     initialY = e.clientY - element.getBoundingClientRect().top;

//     xOffset = initialX;
//     yOffset = initialY;
//   }

//   function dragEnd(e) {
//     isDragging = false;
//   }

//   function drag(e) {
//     e.preventDefault();

//     if (isDragging) {
//       currentX = e.clientX - initialX;
//       currentY = e.clientY - initialY;

//       element.style.left = currentX + "px";
//       element.style.top = currentY + "px";
//     }
//   }
// }

function makeDraggable(element, options) {
  const dragHandle = document.createElement("div");
  dragHandle.classList.add("drag-handle");

  element.appendChild(dragHandle);
  const {
    container = null,
    contain = true,
    snapToGrid = false,
    cellSize = 50,
  } = options;
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;
  let containerRect = null;

  // Get the bounds of the container
  if (container) {
    containerRect = container.getBoundingClientRect();
    container.addEventListener("mouseleave", () => {
      document.addEventListener("mouseup", dragEnd);
    });
  }

  dragHandle.addEventListener("mousedown", dragStart);
  dragHandle.addEventListener("mouseup", dragEnd);
  document.addEventListener("mousemove", drag);

  // document.addEventListener("mouseleave", dragEnd);

  function dragStart(e) {
    e.preventDefault();
    isDragging = true;

    initialX = e.clientX - element.getBoundingClientRect().left;
    initialY = e.clientY - element.getBoundingClientRect().top;
  }

  function dragEnd(e) {
    isDragging = false;
  }

  function drag(e) {
    e.preventDefault();

    if (isDragging) {
      // Calculate the new position of the element
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      // Keep the element within the bounds of the container
      if (contain && containerRect) {
        if (currentX < containerRect.left) {
          currentX = containerRect.left;
        } else if (currentX + element.offsetWidth > containerRect.right) {
          currentX = containerRect.right - element.offsetWidth;
        }
        if (currentY < containerRect.top) {
          currentY = containerRect.top;
        } else if (currentY + element.offsetHeight > containerRect.bottom) {
          currentY = containerRect.bottom - element.offsetHeight;
        }
      }

      if (snapToGrid) {
        const snappedPos = calculateSnapToGrid(cellSize, {
          x: currentX,
          y: currentY,
        });
        currentX = snappedPos.x;
        currentY = snappedPos.y;
      }

      xOffset = e.clientX - currentX;
      yOffset = e.clientY - currentY;

      element.style.left = currentX + "px";
      element.style.top = currentY + "px";
    }
  }
}

// if (snapToGrid) {
//   const snappedPos = calculateSnapToGrid(cellSize, { x: xOffset, y: yOffset });
//   console.log(snappedPos, xOffset, yOffset);
//   element.style.left = snappedPos.x + "px";
//   element.style.top = snappedPos.y + "px";
// } else {
//   element.style.left = currentX + "px";
//   element.style.top = currentY + "px";
// }

function calculateSnapToGrid(cellSize, position) {
  const x = Math.round(position.x / cellSize) * cellSize;
  const y = Math.round(position.y / cellSize) * cellSize;
  return { x, y };
}

function makeResizable(element) {
  element.classList.add('resizable')

  const rHandle = document.createElement("div");
  rHandle.classList.add("resizer", "resizer-r");
  const bHandle = document.createElement("div");
  bHandle.classList.add("resizer", "resizer-b");
  element.appendChild(rHandle);
  element.appendChild(bHandle);
  // The current position of mouse
  let x = 0;
  let y = 0;

  // The dimension of the element
  let w = 0;
  let h = 0;

  // Handle the mousedown event
  // that's triggered when user drags the resizer
  const mouseDownHandler = function (e) {
    // Get the current mouse position
    x = e.clientX;
    y = e.clientY;

    // Calculate the dimension of element
    const styles = window.getComputedStyle(element);
    w = parseInt(styles.width, 10);
    h = parseInt(styles.height, 10);

    // Attach the listeners to `document`
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - x;
    const dy = e.clientY - y;

    // Adjust the dimension of element
    element.style.width = `${w + dx}px`;
    element.style.height = `${h + dy}px`;
  };

  const mouseUpHandler = function () {
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };
  rHandle.addEventListener("mousedown", mouseDownHandler);
  bHandle.addEventListener("mousedown", mouseDownHandler);
}
