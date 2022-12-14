class Cloud extends MovableObject {
  y = 40;
  width = 500;
  height = 280;


  constructor(){
    super().loadImage('img/5_background/layers/4_clouds/1.png');
    this.x = -800 + Math.random() * 6000;
    this.animate();
  }


  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 20);
  }
 

}