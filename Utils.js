const directions = ['north', 'northEast', 'east', 'southEast', 'south', 'southWest', 'west', 'northWest'];


function getNeighbor(direction, row, col, tileMap) {
  if (directions.includes(direction)) {
    const neighbor = directionMap[direction](row, col, tileMap);
    if (neighbor) {
      return neighbor.on ? 1 : 0;
    } else {
      return 0
    }
  }
}

const directionMap = {
  north: (row, col, tileMap) => getNorth(row, col, tileMap),
  northEast: (row, col, tileMap) => getNorthEast(row, col, tileMap),
  east: (row, col, tileMap) => getEast(row, col, tileMap),
  southEast: (row, col, tileMap) => getSouthEast(row, col, tileMap),
  south: (row, col, tileMap) => getSouth(row, col, tileMap),
  southWest: (row, col, tileMap) => getSouthWest(row, col, tileMap),
  west: (row, col, tileMap) => getWest(row, col, tileMap),
  northWest: (row, col, tileMap) => getNorthWest(row, col, tileMap),
}

function getNorth(row, col, tileMap) {
  return tileMap[col - 1][row];
}

function getEast(x, y, tileMap) {
  return tileMap[y][x + 1];
}

function getSouth(x, y, tileMap) {
  return tileMap[y + 1][x];
}

function getWest(x, y, tileMap) {
  return tileMap[y][x - 1];
}

function getNorthEast(x, y, tileMap) {
  return tileMap[y - 1][x + 1];
}

function getSouthEast(x, y, tileMap) {
  return tileMap[y + 1][x + 1];
}

function getSouthWest(x, y, tileMap) {
  return tileMap[y + 1][x - 1];
}

function getNorthWest(x, y, tileMap) {
  return tileMap[y - 1][x - 1];
}

function _testDirectionFunction(getDirectionFunction, expected, x, y, tileMap) {
  const result = getDirectionFunction(x, y, tileMap);
  const message = `${getDirectionFunction.name}(${x}, ${y}) returned ${result}, expected ${expected}`;
  if (result === expected) {
    console.log(`[PASSED] ${message}`);
  } else {
    console.log(`[FAILED] ${message}`);
  }
}

const _testTileMap = [  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

const _centerTile = [1, 1];
// _testDirectionFunction(getNorth, 1, ..._centerTile, _testTileMap);
// _testDirectionFunction(getEast, 5, ..._centerTile, _testTileMap);
// _testDirectionFunction(getSouth, 7, ..._centerTile, _testTileMap);
// _testDirectionFunction(getWest, 3, ..._centerTile, _testTileMap);
// _testDirectionFunction(getNorthEast, 5, ..._centerTile, _testTileMap);
// _testDirectionFunction(getSouthEast, 8, ..._centerTile, _testTileMap);
// _testDirectionFunction(getSouthWest, 6, ..._centerTile, _testTileMap);
// _testDirectionFunction(getNorthWest, 0, ..._centerTile, _testTileMap);






