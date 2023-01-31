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
  collectedCoins = [];
  WorldIntervals = [];
  music_play = true;
  darkness = 1.1;
  killedChickens = 0;
  killedSmallChickens = 0;
  checkInterval;
  boss_near = false;
  boss_hit = false;

  endboss_ambience_sound = new Audio('audio/boss.mp3');
  ambience_lvl1 = new Audio('audio/ambience.mp3');
  music = new Audio('audio/la_bikina_remix.mp3');
  success_audio = new Audio('audio/success.mp3');

  // chicken_dead_sound = new Audio('audio/chicken_dead.mp3');
  // throw_sound = new Audio('audio/throw.mp3');
  // bottle_smash_sound = new Audio('audio/breaking_glass.mp3');

  // walking_sound = new Audio('audio/walking.mp3');
  // jumping_sound = new Audio('audio/jump.mp3');
  // hit_sound = new Audio('audio/hit.mp3');
  // dead_sound = new Audio('audio/dead.mp3');
  // endboss_ambience_sound = new Audio('audio/boss.mp3');
  // collecting_sound = new Audio('audio/coin.mp3');

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.endboss_ambience_sound.preload = "auto";
    this.ambience_lvl1.preload = "auto";
    this.music.preload = "auto";
    this.success_audio.preload = "auto";
    this.character.world = this;
    this.chicken.world = this;
    this.endboss.world = this;
    this.ambience_lvl1.play();
    this.music.play();
    this.music.loop = true;
    this.music.volume = 0.5;
    this.ambience_lvl1.loop = true;
    this.endboss_ambience_sound.volume = 0.3;
    this.chicken.chicken_dead_sound.volume = 0.1;
    this.chicken.chicken_dead_sound.playbackRate = 1.5;
    this.character.collecting_sound.playbackRate = 1.7;
  }


  run() {
    this.interval1 = setInterval(() => {
      this.checkCollisions();
    }, 200);

    this.interval2 = setInterval(() => {
      this.checkThrowObjects();
      this.checkDistanceBoss();
    }, 350);

    this.interval3 = setInterval(() => {
      this.checkCollisionThrowBottle();
    }, 5);

    this.interval4 = setInterval(() => {
      this.checkCollisionsCharacterWithCoins();
      this.bossHit()
    }, 100);

    this.interval5 = setInterval(() => {
      this.endbossMusicChange();
      this.checkCollisionBottleEndboss();
    }, 750);

    this.interval6 = setInterval(() => {
      this.jumpAttack();
    }, 2000);

    this.interval7 = setInterval(() => {
      this.muteMusic();
    }, 100);

    this.interval8 = setInterval(() => {
      this.checkBossAlive();
    },100);

    this.interval9 = setInterval(() => {
      console.log('Pepe´s Position x=', this.character.x);
    },10000);

    this.WorldIntervals.push(this.interval1, this.interval2, this.interval3, this.interval4, this.interval5, this.interval6, this.interval7);
  }


  // checking if the bottle is already colliding with an enemy, if so,
  // it plays the sound, stops the walking animation, starts dying  
  // animation for enemy and set timeout for enemy to disappear off-screen.
  checkCollisionThrowBottle() {
    this.throwableObject.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isCollidingBottle(enemy)) {
          this.chicken.chicken_dead_sound.play();
          clearInterval(this.chicken.chicken_intervals.values());
          clearInterval(this.small_chicken.small_chicken_intervals.values());

          if (enemy instanceof Chicken) {
            this.boing = setInterval(() => {
              enemy.playAnimation(this.chicken.IMAGES_DYING)
            }, 200)
            setTimeout(() => {
              clearInterval(this.boing);
              enemy.y = this.offScreenY;
            }, 450)

          } else if (enemy instanceof SmallChicken) {
            this.boing_sm = setInterval(() => {
              enemy.playAnimation(this.small_chicken.IMAGES_DYING)
            }, 200)
            setTimeout(() => {
              clearInterval(this.boing_sm);
              enemy.y = this.offScreenY;
            }, 300)

          }
        }
      });
    })
  }


  checkCollisionBottleEndboss() {
    this.throwableObject.forEach((bottle) => {
      this.level.endboss.forEach((endboss) => {
        if (bottle.isCollidingBottle(endboss)) {
          this.boss_hit = true;
        }
      });
    });
  }


  bossHit() {
    if (this.boss_hit) {
      this.endboss.energy -= 5;
      console.log('Endboss Life = ', this.endboss.energy);
      this.endbossBar.setPercentage(this.endboss.energy);
      this.level.endboss.forEach(e => e.playAnimation(this.endboss.IMAGES_HURT));
      setTimeout(() => {
        this.boss_hit = false;
      }, 700);
    }
    else {
      this.level.endboss.forEach(endboss => {
        endboss.x -= endboss.speed;
        this.level.endboss.forEach(e => e.playAnimation(this.endboss.IMAGES_ATTACK));
        this.boss_hit = false;
      });
    }
  }


  jumpAttack() {
    if (this.endboss.energy <= 95 && this.endboss.energy >= 0) {
      this.level.endboss.forEach(endboss => {

        this.jump01 = setTimeout(() => {
          clearInterval(this.jump02);
          endboss.x = this.endboss.x + 70;
        }, 3000);

        this.jump02 = setTimeout(() => {
          clearInterval(this.jump01);
          endboss.x = this.endboss.x - 60;
        }, 6000);

      });
    }
  }


  checkBossAlive() {
    if (this.endboss.energy <= 0) {
      setTimeout(() => {
        clearAllInterval(this.WorldIntervals.length);
      }, 120);
      
      this.endboss.energy = 0;
      this.level.endboss.forEach(e => e.playAnimation(this.endboss.IMAGES_DYING));
      this.music.currentTime = 0;
      this.endboss_ambience_sound.pause();
      this.success_audio.play();
      this.keyboard = false;

      this.endboss.deadIsTrue();

      

      // setTimeout(() => {
      //   document.getElementById('game_over').style.display = 'block';
      //   document.getElementById('you_lost').style.display = 'none';
      //   document.getElementById('btn_play_again').style.display = 'block';
      // }, 2000);
    }
  }


  checkDistanceBoss() {
    this.distance = Math.abs(this.endboss.x - this.character.x);
    if (this.distance < 500) {
      this.boss_near = true;
      this.level.endboss.forEach(e => e.playAnimation(this.endboss.IMAGES_ALERT));
      console.log('Boss Chicken spotted you!');
    } else if (this.distance > 500) {
      this.boss_near = false;
    }
  }


  endbossMusicChange() {
    if (this.boss_near) {
      this.music.pause();
      this.music.currentTime = 0;
      this.endboss_ambience_sound.play();

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
    this.level.enemies.forEach((enemy, endboss) => {
      if (this.character.isColliding(enemy, endboss)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        console.log('Collision with Enemy, Life:', this.character.energy);
      }
    });
  }


  checkCollisionsWithBoss() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        console.log('Collision with Boss, Life:', this.character.energy);
      }
    });
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
        console.log('Collected Coins: ', this.collectedCoins.length);
        console.log('Coins Left: ', uncollectedCoins.length);
      }
    });
  }


  hitBoss() {
    this.endboss.energy -= 5;
    this.endbossBar.setPercentage(this.endboss.energy);
    console.log('Endboss Life = ', this.endboss.energy);
    setInterval(() => {
      this.endboss.playAnimation(this.endboss.IMAGES_HURT);
    }, 100);
    if (this.endboss.energy <= 0) {
      this.endboss.energy = 0;

      setInterval(() => {
        this.endboss.playAnimation(this.endboss.IMAGES_HURT);
      }, 100);
    } else {
      this.endboss.lastHitBoss = new Date().getTime();

      setInterval(() => {
        this.endboss.playAnimation(this.endboss.IMAGES_HURT);
      }, 100);
    }
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
    // Draw the endboss
    this.level.endboss.forEach(endboss => endboss.draw(this.ctx));
    // Draw the throwable object
    this.throwableObject.forEach(obj => obj.draw(this.ctx));
    // Translate the canvas back to the original position
    this.ctx.translate(-this.camera_x, 0);
    // Draw the status bar
    this.addToMap(this.statusBar);
    // Draw the endboss bar if the character is at a certain position
    if (this.boss_near) {
      this.endbossBar.draw(this.ctx);
    }
    // Draw the coin image
    this.addToMap(this.coinBar);
    // Draw the number of coins collected
    this.ctx.fillStyle = 'white';
    this.ctx.font = '26px Cactus Regular';
    this.ctx.fillText(`x ${this.collectedCoins.length}`, 358, 54);

    // Draw Blend in from Black Screen
    this.darkness -= 0.005;
    this.ctx.fillStyle = "rgba(0, 0, 0, " + this.darkness + ")";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Request another animation frame to continue drawing
    requestAnimationFrame(() => this.draw());

    // Draw the level text
    // this.ctx.font = '26px Cactus Regular';
    // this.ctx.fillStyle = 'white';
    // this.measureText = this.ctx.fillText(`LEVEL 1: Kill the Chicken Boss!`, 200, 130);
    // Set a timeout to make the level text disappear after 4 seconds
    // setTimeout(() => {
    //   this.ctx.clearRect(200, 130, this.ctx.measureText(`LEVEL 1: Kill the Chicken Boss!`).width, 26);
    // }, 4000);
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


  stopAllMusic() {
    this.endboss_ambience_sound.currentTime = 0;
    this.ambience_lvl1.currentTime = 0;
    this.music.currentTime = 0;
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