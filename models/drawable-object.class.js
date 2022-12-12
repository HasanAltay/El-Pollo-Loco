class DrawableObject {
  img;
  imgCache = {};
  currentImg = 0;
  x = 120;
  y = 200;
  height = 140;
  width = 135;
  num = 0;


loadImage(path) {
  this.img = new Image(); // this.image = document.getElementById('image') <img id="image">
  this.img.src = path;
}


draw(ctx) {
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}


drawNumber(num) {
  num.drawNumber(this.x, this.y, this.size);
}


drawFrame(ctx) {
  if (this instanceof Character) {
  ctx.beginPath();
  ctx.lineWidth = 0;
  ctx.strokeStyle = 'white';
  ctx.rect(this.x + 27, this.y + 100, this.width -65, this.height -110);
  ctx.stroke();
  }
}

drawFrameBottle(ctx) {
  if (this instanceof ThrowableObject) {
  ctx.beginPath();
  ctx.lineWidth = 0;
  ctx.strokeStyle = 'yellow';
  ctx.rect(this.x +10, this.y +10, this.width -15, this.height -15);
  ctx.stroke();
  }
}

drawFrameChicken(ctx) {
  if (this instanceof Chicken) {
  ctx.beginPath();
  ctx.lineWidth = 0;
  ctx.strokeStyle = 'white';
  ctx.rect(this.x, this.y +5, this.width-5, this.height -10);
  ctx.stroke();
  }
}

drawFrameCoin(ctx) {
  if (this instanceof Coins) {
  ctx.beginPath();
  ctx.lineWidth = 0;
  ctx.strokeStyle = 'white';
  ctx.rect(this.x +4, this.y +4, this.width -8, this.height -8);
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