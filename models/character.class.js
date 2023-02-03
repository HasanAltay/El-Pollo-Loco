class Character extends MovableObject {
  width = 120;
  height = 240;
  y = 195;
  x = -500;
  speed = 5;
  afkTimer = 0;
  pepe = 'img/2_character_pepe/';
  
  IMAGES_IDLE = [
    this.pepe+'1_idle/idle/I-1.png',
    this.pepe+'1_idle/idle/I-2.png',
    this.pepe+'1_idle/idle/I-3.png',
    this.pepe+'1_idle/idle/I-4.png',
    this.pepe+'1_idle/idle/I-5.png',
    this.pepe+'1_idle/idle/I-6.png',
    this.pepe+'1_idle/idle/I-7.png',
    this.pepe+'1_idle/idle/I-8.png',
    this.pepe+'1_idle/idle/I-9.png',
    this.pepe+'1_idle/idle/I-10.png',
  ];

  IMAGES_LONG_IDLE = [
    this.pepe+'1_idle/long_idle/I-11.png',
    this.pepe+'1_idle/long_idle/I-12.png',
    this.pepe+'1_idle/long_idle/I-13.png',
    this.pepe+'1_idle/long_idle/I-14.png',
    this.pepe+'1_idle/long_idle/I-15.png',
    this.pepe+'1_idle/long_idle/I-16.png',
    this.pepe+'1_idle/long_idle/I-17.png',
    this.pepe+'1_idle/long_idle/I-18.png',
    this.pepe+'1_idle/long_idle/I-19.png',
    this.pepe+'1_idle/long_idle/I-20.png',
  ];

  IMAGES_WALKING = [
    this.pepe+'2_walk/W-21.png',
    this.pepe+'2_walk/W-22.png',
    this.pepe+'2_walk/W-23.png',
    this.pepe+'2_walk/W-24.png',
    this.pepe+'2_walk/W-25.png',
    this.pepe+'2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    this.pepe+'3_jump/J-36.png',
  ];

  IMAGES_DEAD = [
    this.pepe+'5_dead/D-51.png',
    this.pepe+'5_dead/D-52.png',
    this.pepe+'5_dead/D-53.png',
    this.pepe+'5_dead/D-54.png',
    this.pepe+'5_dead/D-55.png',
    this.pepe+'5_dead/D-56.png',
    this.pepe+'5_dead/D-57.png',
  ];

  IMAGES_HURT = [
    this.pepe+'4_hurt/H-41.png',
    this.pepe+'4_hurt/H-42.png',
    this.pepe+'4_hurt/H-43.png',
  ];

  world;


  constructor() {
    super();
    this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.idle();
    this.startCharacterAnimations();
    this.animate();
  }


  animate() {
    this.dead = false;
    setInterval(() => {
      this.characterMovementKeys();
    }, 1000 / 50);
  }


  idle() {
    setInterval(() => {
      this.afkTimer++;
      if (this.afkTimer > 0) {
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
      }
      if (this.afkTimer > 5) {
        this.playAnimation(this.IMAGES_IDLE);
      }
      if (this.afkTimer >= 20) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      }
    }, 500);
  }


  youLost(dead) {
    if (dead == true) {
      document.getElementById('you_lost').style.display = 'block';
      document.getElementById('btn_play_again').style.display = 'block';
      this.world.keyboard = false;
      this.world.muteAllAudio();
      setTimeout(function() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
      }, 1000)
    }
  }


  characterMovementKeys() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.world.walking_sound.play();
      this.walkingLeft = false;
      this.afkTimer = 0;
    }
    if (this.world.keyboard.LEFT && this.x > -625) {
      this.turn = true;
      this.walkingLeft = true;
      this.moveLeft();
      this.world.walking_sound.play();
      this.afkTimer = 0;
    }
    if (this.world.keyboard.SPACE && !this.aboveGround()) {
      this.jump();
      this.world.walking_sound.pause();
      this.world.jumping_sound.play();
      this.afkTimer = 0;
      // this.world.music_play = true;
    }
    if (this.world.keyboard.D) {
      this.afkTimer = 0;
    }
    this.world.camera_x = -this.x + 90;
  }


startCharacterAnimations() {
  let animationInterval;
  animationInterval = setInterval(() => {
    if (this.isDead()) {
      clearInterval(animationInterval);
      this.playAnimation(this.IMAGES_DEAD);
      this.fallOut();
      this.dead = true;
      setTimeout(() => {
        this.youLost(this.dead);
      }, 100);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.aboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }, 100);
}

stopCharacterAnimations() {
  clearInterval(animationInterval);
}

}