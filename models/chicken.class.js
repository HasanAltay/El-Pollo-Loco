class Chicken extends MovableObject {
  width = 80;
  height = 80;
  y = 345;
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];
  currentImg = 0;


  constructor(){
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
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
    }, 100);
  }


}