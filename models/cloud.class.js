class Cloud extends MovableObject {
  y = 40;
  width = 500;
  height = 280;


  constructor(){
    super().loadImage('img/5_background/layers/4_clouds/1.png');
    this.x = -700 + Math.random() * 4000;
    this.animate();
  }


  animate() {
    let interval07 =  setInterval(() => {
      this.moveLeft();
      // this.world.intervalArray.push(interval07);
    }, 1000 / 20);
  }
 


}