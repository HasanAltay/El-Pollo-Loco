class ThrowableObject extends MovableObject {

  IMAGES_BOTTLE = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
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
  intervals = [];
 

  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES_BOTTLE);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);      
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 60;
    this.throw();
    this.throw_sound.volume = 0.2;
    this.throw_sound.playbackRate = 0.4;
  }


  throw() {
    this.throw_sound.play();
    this.speedY = 15;
    this.applyGravity();
    let bottle = setInterval(() => {
      this.x += 28;
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 70);
    this.intervals.push(bottle);
    clearInterval(this.intervals.length);
    // setInterval(() => {
    //   // this.x += 28;
    //   this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    // }, 70);
  }

  splash() {
    clearInterval(this.intervals.length);
    setInterval(() => {
      // this.x += 28;
      this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    }, 70);
  }



}