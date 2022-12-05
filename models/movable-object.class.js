class MovableObject extends DrawableObject {
  speed = 0.1;
  turn = false;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  lastHit = 0;


  applyGravity() {
    setInterval(() => {
      if (this.aboveGround() || this.speedY > 0) {      
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }
    }, 1000 / 25);
  }


  aboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  
  isColliding(mo) {

    return this.x + this.width-20 > mo.x &&
          this.y + this.height-20 > mo.y &&
          this.x < mo.x &&
          this.y < mo.y + mo.height;
    
    // return (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) && 
    //         (this.y + this.offsetY + this.height) >= mo.y &&
    //         (this.y + this.offsetY) <= (mo.y + mo.height);
  
  }

  // isColliding (obj) {
  //   return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
  //           (this.Y + this.offsetY + this.height) >= obj.Y &&
  //           (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
  //           obj.onCollisionCourse; 
            // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die 
            // richtige Richtung bewegt. Nur dann kollidieren wir. 
            // Nützlich bei Gegenständen, auf denen man stehen kann.

// }


  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }


  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 0.5;
  }


  isDead() {
    return this.energy == 0;
  }


  playAnimation(images) {
    let i = this.currentImg % images.length; // let i = 0 % 6; 0, rest 0 
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImg++;
  }


  moveLeft() {
      this.x -= this.speed;
  }

  
  moveRight() {
    this.x += this.speed;
    this.turn = false;
  }


  jump() {
    this.speedY = 20;
  }
}