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


  constructor(){
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DYING);
    this.x = 330 + Math.random() * 4000; // Zahl zw. 200 und 500
    this.speed = 0.3 + Math.random() * 0.25;
    this.animate();
  }


  animate() {

    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 110);
  }


  diyingChicken() {
    
    console.log('Chicken Hit!');
    this.y = 700;
    this.walkingLeft = false;
    this.chicken_dead_sound.volume = 0.2;
    this.chicken_dead_sound.playbackRate = 1.5;
    this.chicken_dead_sound.play();
      setInterval(() => {
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        // this.playAnimation(this.IMAGES_DYING);
        
      }, 10);
  }





}