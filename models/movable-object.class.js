class MovableObject extends DrawableObject {
  speed = 0.1;
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

  
  isColliding(mo) {
    return this.x+25 + this.width-65 > mo.x &&
          this.y+115 + this.height-128 > mo.y &&
          this.x < mo.x &&
          this.y < mo.y + mo.height;  
  }

  isCollidingBottle(mo) {
    return this.x+25 + this.width-65 > mo.x &&
          this.y+115 + this.height-128 > mo.y &&
          this.x < mo.x &&
          this.y < mo.y + mo.height;  
  }

  isCollidingChicken(mo) {
    return this.x+25 + this.width-65 > mo.x &&
          this.y+115 + this.height-128 > mo.y &&
          this.x < mo.x &&
          this.y < mo.y + mo.height;  
  }

  isCollidingCoin(mo) {
    return this.x+25 + this.width-80 > mo.x-10 && 
          this.y+100 + this.height-128 > mo.y &&
          this.x < mo.x &&
          this.y+100 < mo.y + mo.height;  
  }

  isCollidingChickenBoss(mo) {
    return this.x+25 + this.width-65 > mo.x &&
          this.y+115 + this.height-128 > mo.y &&
          this.x < mo.x &&
          this.y < mo.y + mo.height;  
  }


  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
      this.dead_sound.volume = 0.3;
      this.dead_sound.playbackRate = 1.5;
      this.dead_sound.play();
    } else {
      this.lastHit = new Date().getTime();
      this.hit_sound.play();
    }
  }


  hitBoss() {
    this.energy_boss -= 5;
    if (this.energy_boss < 0) {
      this.energy_boss = 0;
      console.log('BOSS IS DEAD');
    } else {
      this.lastHitBoss = new Date().getTime();
      console.log('BOSS IS HIT');
    }
  }


  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 0.5;
  }


  isHurtBoss() {
    let timepassed = new Date().getTime() - this.lastHitBoss; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 0.5;
  }


  isDead() {
    return this.energy == 0;
  }


  isDeadBoss() {
    return this.energy_boss == 0;
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
      this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
      this.y = 440;
      this.height = 0;
      this.width = 0;
      this.speedY = 0;
    }, 500);
  }


  jump() {
    this.speedY = 20;
  }





  // coinsCollect(c) {
  //   this.y += c;
  // }



}