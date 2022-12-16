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
    'img/3_enemies_chicken/chicken_normal/2_dead/1_dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/2_dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/3_dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/4_dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/5_dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/6_dead.png',
  ];

  world;
  currentImg = 0;
  chicken_dead_sound = new Audio('audio/chicken_dead.wav');
  chicken_is_dead = false;
  walkingAnim = [];


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
        this.playAnimation(this.IMAGES_DYING);
  }
  

  animate() {
    this.movingLeft = setInterval(() => {
      this.moveLeft();
    }, 10);

    this.walking = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 110);
    this.walkingAnim.push(this.walking);

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


  





