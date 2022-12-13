class Character extends MovableObject {
  width = 120;
  height = 240;
  y = 190;
  x = -500;
  speed = 5;
  afkTimer = 0;

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_LONG_IDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];

  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];

  world;
  walking_sound = new Audio('audio/walking.mp3');
  jumping_sound = new Audio('audio/jump.wav');
  hit_sound = new Audio('audio/hit.wav');
  dead_sound = new Audio('audio/dead.wav');
  endboss_ambience_sound = new Audio('audio/boss.wav');
  collecting_sound = new Audio('audio/coin2.mp3');


  constructor() {
    super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.idle();
    this.animate();
  }


  animate() {
    this.dead = false;
    setInterval(() => {
      this.characterMovementSound();
      this.characterMovementKeys();
    }, 1000 / 60);

    setInterval(() => {
      this.characterAnimations();
    }, 80);
  }


  idle() {
    setInterval(() => {
      this.afkTimer++;
      // console.log(this.afkTimer);
      if (this.afkTimer > 0) {
        this.playAnimation(this.IMAGES_IDLE);
      }
      if (this.afkTimer >= 10) {
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
      this.world.ambience_lvl1.pause();
      this.world.music.pause();
      this.world.endboss_ambience_sound.pause();
      this.world.keyboard = false;
    }
  }


  characterMovementSound() {
    this.walking_sound.playbackRate = 2.2;
    this.walking_sound.volume = 1;
    this.jumping_sound.playbackRate = 0.8;
  }


  characterMovementKeys() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.walking_sound.play();
      this.walkingLeft = false;
      this.afkTimer = 0;
    }
    if (this.world.keyboard.LEFT && this.x > -625) {
      this.turn = true;
      this.walkingLeft = true;
      this.moveLeft();
      this.walking_sound.play();
    }
    if (this.world.keyboard.SPACE && !this.aboveGround()) {
      this.jump();
      this.playAnimation(this.IMAGES_JUMPING);
      this.walking_sound.pause();
      this.jumping_sound.play();
    }
    if (this.world.keyboard.SPACE && this.world.keyboard.RIGHT && !this.aboveGround() ||
      this.world.keyboard.SPACE && this.world.keyboard.LEFT && !this.aboveGround()) {
      this.walking_sound.pause();
      this.jump();
      this.playAnimation(this.IMAGES_JUMPING);
      this.jumping_sound.play();
    }
    if (this.world.keyboard.M) {
      console.log('m');
      this.world.ambience_lvl1.pause();
    }
    this.world.camera_x = -this.x + 90;
  }


  characterAnimations() {
    if (this.isDead()) {
    // is Dead animation
    this.playAnimation(this.IMAGES_DEAD);
    setInterval(() => {
    this.fallOut();
    }, 40);
    this.dead = true;
    this.youLost(this.dead);
    }
    if (this.isHurt()) {
    // is Hurt animation
    this.playAnimation(this.IMAGES_HURT);
    }
    if (this.aboveGround()) {
    // Jumping animation
    this.playAnimation(this.IMAGES_JUMPING);
    }
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
    // Walking animation
    this.playAnimation(this.IMAGES_WALKING);
    }
  }





}





