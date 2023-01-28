class SmallChicken extends MovableObject {
  width = 55;
  height = 55;
  y = 375;

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  IMAGES_DYING = [
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
  ];

  world;
  currentImg = 0;
  chicken_dead_sound = new Audio('audio/chicken_dead.wav');
  chicken_is_dead = false;
  walkingAnim = [];


  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DYING);
    this.x = 330 + Math.random() * 5000; // Zahl zw. 330 und 500
    this.speed = 0.4 + Math.random() * 0.25;
    this.animate();
    this.animateJump();
  }
  

  animate() {
    this.movingLeft = setInterval(() => {
      this.moveLeft();
    }, 10);

    this.walking = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 110);
    this.walkingAnim.push(this.walking, this.movingLeft);

    setInterval(() => {
      this.animateJump();
    }, Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000);
  }


  animateJump() {
    // Initialize starting position and velocity
    let y = this.y;
    let v = -6;
    let gravity = 0.1;

    let interval = setInterval(() => {
      // Update velocity with gravity
      v += gravity;
      // Update y position with velocity
      y += v;
      // Check if the chicken has landed
      if (y >= 375) {
        clearInterval(interval);
        this.y = 375;
      } else {
        this.y = y;
        this.x += this.speed;
      }
    }, 10);
  }
}