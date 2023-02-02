class Cloud extends MovableObject {
  y = 40;
  x = 0;
  width = 500;
  height = 280;
  clouds = [];
  cloudImages = ['img/5_background/4_clouds/1.png', 'img/5_background/4_clouds/2.png'];
  currentImage = 0;

  constructor() {
    super().loadImage(this.cloudImages[this.currentImage]);
    this.currentImage = (this.currentImage + 1) % this.cloudImages.length;
    this.generateRandomPosition();
    this.animate();
    this.clouds.push(this);
  }

  generateRandomPosition() {
    let x = -1000 + Math.random() * 12000;
    while (this.checkOverlap(x)) {
      x = -1000 + Math.random() * 12000;
    }
    this.x = x;
  }

  checkOverlap(x) {
    for (let i = 0; i < this.clouds.length; i++) {
      let cloud = this.clouds[i];
      if (cloud === this) continue;
      if (x > cloud.x - this.width && x < cloud.x + cloud.width) {
        return true;
      }
    }
    return false;
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 18);
  }
}