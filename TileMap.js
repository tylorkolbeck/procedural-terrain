
class TileMap {
  width;
  height;
  tileMap = [];
  seed = 0;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.tileMap = this.buildTileMap();
  }

  buildTileMap() {
    let tileMap = new Array(width);
    for (let x = 0; x < width; x++) {
      tileMap[x] = new Array(height);
      for (let y = 0; y < height; y++) {
        tileMap[x][y] = new Block(
          x * BLOCK_WIDTH,
          y * BLOCK_HEIGHT,
          BLOCK_WIDTH,
          BLOCK_HEIGHT
        );

        tileMap[x][y].randomOnOff();
      }
    }

    return tileMap;
  }

  render() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.tileMap[i][j].show();
      }
    }
  }

  getNeighborLiveCount(x, y) {
    let liveCount = 0;

    if (x > 0) {
      liveCount += this.getWest(x, y);
    }
  }
}
