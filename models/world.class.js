class World {
  character = new Character();
  chicken = new Chicken();
  endboss = new Endboss();
  small_chicken = new SmallChicken();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  endbossBar = new EndbossBar();
  coinBar = new CoinBar();
  throwableObject = [];
  endboss_ambience_sound = new Audio('audio/boss.wav');
  ambience_lvl1 = new Audio('audio/ambience.flac');
  music = new Audio('audio/mexican_music.mp3');
  collectedCoins = [];
  killedEnemies = [];
  music_play = this.music.play();
  

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.muteMusic();
  }


  setWorld() {
    this.music_play = true;
    this.character.world = this;
    this.chicken.world = this;
    this.ambience_lvl1.play();
    this.music;
    this.music.loop = true;
    this.music.volume = 0.1;
    this.ambience_lvl1.loop = true;
    this.endboss_ambience_sound.volume = 0.3;
    this.chicken.chicken_dead_sound.volume = 0.1;
    this.chicken.chicken_dead_sound.playbackRate = 1.5;
    this.character.collecting_sound.playbackRate = 1.7;
  }


  run() {
    setInterval(() => {
      this.checkCollisions();
    }, 200);

    setInterval(() => {
      this.checkThrowObjects();
    }, 350);

    setInterval(() => {
      this.checkCollisionThrowBottle();
    }, 0);

    setInterval(() => {
      this.checkCollisionsCharacterWithCoins();
    }, 100);

    setInterval(() => {
      this.endboss_attack();
      this.checkCollisionBottleEndboss();
    }, 100);

    setInterval(() => {
      this.muteMusic();
    }, 100);
  }


  endboss_attack() {
    if (this.character.x > 3550) {
      this.level.endboss.characterCheckpoint = true;
      if (this.character.x > 3500) {
        // this.endboss_ambience_sound.currentTime = 0;
        this.endboss_ambience_sound.play();
        this.music.currentTime = 0;
      }
      if (this.endboss.isDeadBoss()) {
        this.endboss_ambience_sound.currentTime = 0;
        this.music.currentTime = 0;
        this.keyboard = false;
      }
    }
  }


  // press D and throw bottle
  checkThrowObjects() {
    if (this.keyboard.D && !this.character.walkingLeft) {
      this.bottle = new ThrowableObject(this.character.x + 79, this.character.y + 120);
      this.throwableObject.push(this.bottle);
      this.character.loadImage('img/2_character_pepe/2_walk/W-23.png');
    }
  }


  // character hit enemy then lose health
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        console.log('Collision with Enemy, Life:', this.character.energy);
      }
    });
  }


  // checking if the bottle is already colliding with an enemy, 
  // if so, it plays the sound, stops the walking animation, 
  // starts the dying animation for the enemy and set timeout 
  // for the enemy to disappear off-screen. Pushes the killed 
  // enemy to the killedEnemies array and logs the total killed
  checkCollisionThrowBottle() {
    this.throwableObject.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isCollidingBottle(enemy)) {
          this.chicken.chicken_dead_sound.play();
          clearInterval(this.chicken.walkingAnim.values());
          this.boing = setInterval(() => {
            enemy.playAnimation(this.chicken.IMAGES_DYING)
          }, 300)
          setTimeout(() => {
            clearInterval(this.boing);
            enemy.y = this.offScreenY;
            this.killedEnemies.push(enemy);
          }, 450)
        }
      });
    })
  }


  //  Checks for collisions between character and coins, 
  //  plays sound, moves coin off-screen, adds to collected 
  //  coins and logs total collected und uncollected.
  checkCollisionsCharacterWithCoins() {
    const uncollectedCoins = this.level.coins.filter(coin => !this.collectedCoins.includes(coin));
    uncollectedCoins.forEach((coin) => {
      if (this.character.isCollidingCoin(coin)) {
        this.character.collecting_sound.currentTime = 0;
        this.character.collecting_sound.play();
        coin.y = this.offScreenY;
        this.collectedCoins.push(coin);
        console.log('Collected Coins: ',this.collectedCoins.length);
        console.log('Coins Left: ',uncollectedCoins.length);
      }
    });
  }


  checkCollisionBottleEndboss() {
    this.throwableObject.forEach((bottle) => {
      this.level.endboss.forEach((enemy) => {
        if (bottle.isCollidingBottle(enemy)) {

          this.chicken.chicken_dead_sound.play();

          this.endboss.hitBoss();
          this.endbossBar.setPercentage(this.endboss.energy_boss);
          console.log('Endboss Life: ', this.endboss.energy_boss);
    
        }
      });
    })
  }


  draw() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Translate the canvas to the camera position
    this.ctx.translate(this.camera_x, 0);

      // Draw the background objects
      this.level.backgroundObjects.forEach(obj => obj.draw(this.ctx));
      // Draw the clouds
      this.level.clouds.forEach(cloud => cloud.draw(this.ctx));
      // Draw the coins
      this.level.coins.forEach(coin => coin.draw(this.ctx));
      // Draw the character
      this.addToMap(this.character);
      // Draw the enemies
      this.level.enemies.forEach(enemy => enemy.draw(this.ctx));
      // Draw the throwable object
      this.throwableObject.forEach(obj => obj.draw(this.ctx));
      // Draw the endboss
      this.level.endboss.forEach(endboss => endboss.draw(this.ctx));

    // Translate the canvas back to the original position
    this.ctx.translate(-this.camera_x, 0);
    // Draw the status bar
    this.addToMap(this.statusBar);
    // Draw the endboss bar if the character is at a certain position
    if (this.character.x > 3550) {
      this.endbossBar.draw(this.ctx);
    }
    // Draw the coin image
    this.addToMap(this.coinBar);
    // Draw the number of coins collected
    this.ctx.fillStyle = 'white';
    this.ctx.font = '26px Cactus Regular';
    this.ctx.fillText(`x ${this.collectedCoins.length}`, 299, 54);
    // Request another animation frame to continue drawing
    requestAnimationFrame(() => this.draw());
  }


  addObjectsToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    });
  }


  addToMap(mo) {
    if (mo.turn) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    mo.drawFrameBottle(this.ctx);
    mo.drawFrameChicken(this.ctx);
    mo.drawFrameCoin(this.ctx);
    mo.drawFrameEndboss(this.ctx);
    if (mo.turn) {
      this.flipImageBack(mo);
    }
  }


  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }


  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }


  muteMusic() {
    if (this.keyboard.M && this.music_play == true) {    
      setTimeout(() => {
        this.music.currentTime = 0;
        console.log('MUSIC DEACTIVATED!');
        this.music_play = false;
      }, 100);
    }
    if (this.keyboard.M && this.music_play == false) {
      setTimeout(() => {
        console.log('MUSIC ACTIVATED!');
        this.music.play();
        this.music_play = true;
      }, 100);
    }
  }





}