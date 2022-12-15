class Chicken extends MovableObject {
  width = 80;
  height = 80;
  y = 345;

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGES_DYING = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
  ];

  world;
  currentImg = 0;
  chicken_dead_sound = new Audio('audio/chicken_dead.wav');
  chicken_is_dead = false;


  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DYING);
    this.x = 330 + Math.random() * 5000; // Zahl zw. 200 und 500
    this.speed = 0.4 + Math.random() * 0.25;
    this.animate();
  }


  animateDying() {
    console.log("Chicken");
    setInterval(() => {
      setTimeout(() => {
        this.playAnimation(this.IMAGES_DYING);
      },500)
    }, 300);
  }
  

  animate() {
    let moving = setInterval(() => {
      this.moveLeft();
    }, 10);

    let walking = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 110);
  }


}



  // chickenDies() {
  //   let chicken_dies = setInterval(() => {
  //     this.chicken_dead_sound.pause();
  //     this.chicken_dead_sound.volume = 0.2;
  //     this.chicken_dead_sound.playbackRate = 1.5;
  //     this.chicken_dead_sound.play();


  //       setTimeout(() => {
  //         this.playAnimation(this.IMAGES_DYING);

  //       },300)
  //   }, 100);

  //   clearInterval(chicken_dies);

  //   setTimeout(() => {
  //     this.y = 700
  //   },400)

  // }



  //   setInterval(() => {
  //     if (this.isDead()) {
        
  //       console.log('Chicken Hit!');
  //     }
  //     else {
  //       this.playAnimation(this.IMAGES_WALKING);
  //     }
  //   }, 110);


  





