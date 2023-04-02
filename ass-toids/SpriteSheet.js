class SpriteSheet {
  image;
  imageData;
  imageSrc;
  hoveredSprite = null;

  images = []

  constructor(imageSrc, imageData) {
    this.imageData = imageData;
    this.imageSrc = imageSrc;
  }

  generateImages() {
    this.imageData.sprites.forEach((s) => {
      this.images.push(this.imageSrc.get(s.x, s.y, s.width, s.height))
    })
  }

  draw() {
    // background(255);
  
    // image(this.imageSrc, 0, 0);
  
    // let hoveredSprite = null;
  
  
      // const newImage = createImage(s.width, s.height);
      // newImage.loadPixels();
      // this.image.loadPixels();

      // const pixels = this.image.get(s.x, s.y, s.width, s.height);
      // console.log(pixels)
      // newImage.updatePixels();

    //   noFill();
    //   stroke(color(255, 0, 0));
    //   rect(s.x, s.y, s.width, s.height);
  
    //   if (
    //     mouseX >= s.x &&
    //     mouseX <= s.x + s.width &&
    //     mouseY >= s.y &&
    //     mouseY <= s.y + s.height
    //   ) {
    //     hoveredSprite = s;
    //   }
    // });
  
    // if (hoveredSprite) {
    //   noFill();
    //   stroke(color(0, 255, 0));
    //   rect(
    //     hoveredSprite.x,
    //     hoveredSprite.y,
    //     hoveredSprite.width,
    //     hoveredSprite.height
    //   );
    // }
  }

  createImage() {
    return image(this.image, 0, 0, this.imageData.width, this.imageData.height)
  }
}