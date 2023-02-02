class Chicken extends MovableObject {
  width = 85;
  height = 85;
  y = 345;

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGES_DYING = [
    'img/3_enemies_chicken/chicken_normal/2_dead/4_dead.png',
  ];

  world;
  currentImg = 0;
  chicken_dead_sound = new Audio('audio/chicken_dead.mp3');
  chicken_is_dead = false;
  chicken_intervals = [];


  constructor() {
    super();
    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DYING);
    this.x = 330 + Math.random() * (9000 - 350);
    this.speed = 0.4 + Math.random() * (0.65 - 0.4);
    this.animate();
  }
  

  animate() {
    this.movingLeft = setInterval(() => {
      this.moveLeft();
    }, 10);

    this.walking = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 110);

    this.chicken_intervals.push(this.walking, this.movingLeft);
  }

}