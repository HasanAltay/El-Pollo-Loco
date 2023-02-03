class MovableObject extends DrawableObject {
  speed = 0.2;
  turn = false;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  energy_boss = 100;
  lastHit = 0;
  lastHitBoss = 0;
  walkingLeft;
  chicken_hit;
  chicken;
  intervalArray = [];


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


  aboveGroundBottle() {
    return this.y < this.groundPos;
  }


  isColliding(mo) {
    let object1X = this.x + 25;
    let object1Y = this.y + 115;
    let object1Width = this.width - 65;
    let object1Height = this.height - 128;
    let object2X = mo.x;
    let object2Y = mo.y;
    let object2Width = mo.width;
    let object2Height = mo.height;

    return (object1X + object1Width > object2X &&
            object1Y + object1Height > object2Y &&
            object1X < object2X + object2Width &&
            object1Y < object2Y + object2Height);
    }
    

  checkCollision(mo) {
    if (this.isColliding(mo)) {
      let collisionX = max(this.x, mo.x);
      let collisionY = max(this.y, mo.y);
      let collisionWidth = min(this.x + this.width, mo.x + mo.width) - collisionX;
      let collisionHeight = min(this.y + this.height, mo.y + mo.height) - collisionY;

      
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'red';
      this.ctx.lineWidth = 2;
      this.ctx.rect(collisionX, collisionY, collisionWidth, collisionHeight);
      this.ctx.stroke();
    }
  }


  isCollidingBottle(mo) {
    let object1X = this.x; //+25
    let object1Y = this.y; //+115
    let object1Width = this.width; // -63
    let object1Height = this.height; // -128
    let object2X = mo.x + 7;
    let object2Y = mo.y + 7;
    let object2Width = mo.width - 7;
    let object2Height = mo.height - 7;

    return (object1X + object1Width > object2X &&
            object1Y + object1Height > object2Y &&
            object1X < object2X + object2Width &&
            object1Y < object2Y + object2Height);
  }


  isCollidingChicken(mo) {
    let object1X = this.x + 25;
    let object1Y = this.y + 115;
    let object1Width = this.width - 63;
    let object1Height = this.height - 128;
    let object2X = mo.x + 7;
    let object2Y = mo.y + 7;
    let object2Width = mo.width - 20;
    let object2Height = mo.height - 7;

    return (object1X + object1Width > object2X &&
            object1Y + object1Height > object2Y &&
            object1X < object2X + object2Width &&
            object1Y < object2Y + object2Height);
  }


  isCollidingCoin(mo) {
    let object1X = this.x + 25;
    let object1Y = this.y + 115;
    let object1Width = this.width - 63;
    let object1Height = this.height - 128;
    let object2X = mo.x;
    let object2Y = mo.y;
    let object2Width = mo.width;
    let object2Height = mo.height;

    return (object1X + object1Width > object2X &&
            object1Y + object1Height > object2Y &&
            object1X < object2X + object2Width &&
            object1Y < object2Y + object2Height);
  }


  isCollidingChickenBoss(mo) {
    let object1X = this.x + 25;
    let object1Y = this.y + 115;
    let object1Width = this.width - 63;
    let object1Height = this.height - 128;
    let object2X = mo.x;
    let object2Y = mo.y;
    let object2Width = mo.width;
    let object2Height = mo.height;

    return (object1X + object1Width > object2X &&
            object1Y + object1Height > object2Y &&
            object1X < object2X + object2Width &&
            object1Y < object2Y + object2Height);
  }


  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
      this.world.dead_sound.currentTime = 0;
      this.world.dead_sound.play();
    } else {
      this.lastHit = new Date().getTime();
      this.world.hurt_audio.currentTime = 0;
      this.world.hurt_audio.play();
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
    let i = this.currentImg % images.length;
    let path = images[i];
    if(this.imgCache[path]){
        this.img = this.imgCache[path];
    } else {
        this.img = new Image();
        this.img.src = path;
        this.imgCache[path] = this.img;
    }
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


  fallOut() {
    let fallingSpeed = this.speed;
    let fallingInterval = setInterval(() => {
      if (this.y >= 440) {
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.y = 440;
        this.height = 0;
        this.width = 0;
        clearInterval(fallingInterval);
      } else {
        this.y += fallingSpeed;
        fallingSpeed += this.acceleration;
      }
    }, 40);
  }


  jump() {
    this.speedY = 20;
  }
}