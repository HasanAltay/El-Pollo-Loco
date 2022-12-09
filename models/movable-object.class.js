class MovableObject extends DrawableObject {
  speed = 0.1;
  turn = false;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  lastHit = 0;
  walkingLeft;


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
    return this.x + this.width-40 > mo.x &&
          this.y + this.height-20 > mo.y &&
          this.x < mo.x &&
          this.y < mo.y + mo.height;  
  }


  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
      this.dead_sound.play();
    } else {
      this.lastHit = new Date().getTime();
      this.hit_sound.play();
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
      this.walkingLeft = true;
  }

  
  moveRight() {
    this.x += this.speed;
    this.turn = false;
    this.walkingLeft = false;
  }

  // fällt nach Tod nach unten aus dem Frame
  fallOut() {
    this.y += this.speed;
    setInterval(() => {
      this.y = 500;
    }, 500);
  }


  jump() {
    this.speedY = 20;
  }



}