class TileMap {
  cols;
  rows;
  tileMap = [];
  seed = 0;
  blockSize;

  static liveNeighborsRequired = 5;

  constructor(cols, rows, blockSize) {
    this.cols = cols;
    this.rows = rows;

    this.blockSize = blockSize;

    this.tileMap = this.buildTileMap();
  }

  runGeneration() {
    const generation = this.buildTileMap();

    for (let row = 0; row < this.rows; ++row) {
      for (let col = 0; col < this.cols; ++col) {
        let liveCount = this.getNeighborLiveCount(row, col);
        generation[row][col] = new Block(
          row * this.blockSize.width,
          col * this.blockSize.height,
          this.blockSize.width,
          this.blockSize.height
        );
        generation[row][col].on =
          liveCount > TileMap.liveNeighborsRequired ? 1 : 0;
      }
    }

    this.tileMap = generation;
    this.render();
  }

  buildTileMap() {
    let tileMap = new Array(this.cols);

    for (let i = 0; i < this.cols; i++) {
      tileMap[i] = new Array(this.rows);
      for (let j = 0; j < this.rows; j++) {
        tileMap[i][j] = new Block(
          i * this.blockSize.width,
          j * this.blockSize.height,
          this.blockSize.width,
          this.blockSize.height
        );

        tileMap[i][j].randomOnOff();
      }
    }

    return tileMap;
  }

  render() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.tileMap[i][j].show();
      }
    }
  }

  getNeighborLiveCount(row, col) {
    if (
      row === 0 ||
      row === this.rows - 1 ||
      col === 0 ||
      col === this.cols - 1
    ) {
      return 0;
    }

    const directions = [
      "north",
      "northEast",
      "east",
      "southEast",
      "south",
      "southWest",
      "west",
      "northWest",
    ];

    // const neightborhood = {
    //   liveCount: 0,
    //   north: getNorth(row, col, this.tileMap),
    //   northEast: getNorthEast(row, col, this.tileMap),
    //   east: getEast(row, col, this.tileMap),
    //   southEast: getSouthEast(row, col, this.tileMap),
    //   south: getSouth(row, col, this.tileMap),
    //   southWest: getSouthWest(row, col, this.tileMap),
    //   west: getWest(row, col, this.tileMap),
    //   northWest: getNorthWest(row, col, this.tileMap),

    //   getLiveCount() {
    //     directions.forEach((direction) => this.liveCount += this[direction]);
    //   }
    // }

    const neightborhood = {
      liveCount: 0,
      north: getNeighbor("north", row, col, this.tileMap),
      northEast: getNeighbor("northEast", row, col, this.tileMap),
      east: getNeighbor("east", row, col, this.tileMap),
      southEast: getNeighbor("southEast", row, col, this.tileMap),
      south: getNeighbor("south", row, col, this.tileMap),
      southWest: getNeighbor("southWest", row, col, this.tileMap),
      west: getNeighbor("west", row, col, this.tileMap),
      northWest: getNeighbor("northWest", row, col, this.tileMap),

      getLiveCount() {
        directions.forEach((direction) => {
          this.liveCount += neightborhood[direction] 
         
        });
      },
    };

    neightborhood.getLiveCount();

    // liveCount += getWest(row, col, this.tileMap);
    // liveCount += getNorthWest(row, col, this.tileMap);
    // liveCount += getNorth(row, col, this.tileMap);
    // liveCount += getNorthEast(row, col, this.tileMap);
    // liveCount += getEast(row, col, this.tileMap);
    // liveCount += getSouthEast(row, col, this.tileMap);
    // liveCount += getSouth(row, col, this.tileMap);
    // liveCount += getSouthWest(row, col, this.tileMap);

    return neightborhood.liveCount;
  }
}
