class DrawableObject {
  img;
  imgCache = {};
  currentImg = 0;
  x = 120;
  y = 200;
  height = 140;
  width = 135;


loadImage(path) {
  this.img = new Image(); // this.image = document.getElementById('image') <img id="image">
  this.img.src = path;
}


draw(ctx) {
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}


drawFrame(ctx) {
  if (this instanceof Character || this instanceof Chicken || this instanceof ThrowableObject) {
  ctx.beginPath();
  ctx.lineWidth = '0';
  ctx.strokeStyle = 'darkred';
  ctx.rect(this.x, this.y, this.width-20, this.height-20);
  ctx.stroke();
  }
}


loadImages(arr) {
  arr.forEach((path) => {
    let img = new Image();
    img.src = path;
    this.imgCache[path] = img;
  });
}

}