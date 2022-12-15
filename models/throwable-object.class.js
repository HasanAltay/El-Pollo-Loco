class ThrowableObject extends MovableObject {

  IMAGES_BOTTLE = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/1.5_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2.5_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3.5_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4.5_bottle_rotation.png',
  ];

  IMAGES_BOTTLE_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];
  throw_sound = new Audio('audio/throw.mp3');
  groundPos = 370;
 

  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES_BOTTLE);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);      
    this.x = x-20;
    this.y = y+2;
    this.height = 65;
    this.width = 65;
    this.throw();
    this.throw_sound.volume = 0.2;
    this.throw_sound.playbackRate = 0.4;
  }


  throw() {
    this.throw_sound.pause();
    this.throw_sound.play();
    this.speedY = 10;
    this.applyGravity();

    this.bottles = setInterval(() => {
      this.x += 40;
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 66);

    setTimeout(() => {
      clearInterval(this.bottles);
    }, 500)

    this.playInterval = setInterval(() => {
      this.checkAboveGroundBottle(this.bottle);
    }, 70);
  }


  checkAboveGroundBottle() {
    if (this.aboveGroundBottle()) {
        this.playAnimation(this.IMAGES_BOTTLE);
    } else {
      this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
      setTimeout(() => {
        clearInterval(this.playInterval);
      }, 350)  
    }
  }


}