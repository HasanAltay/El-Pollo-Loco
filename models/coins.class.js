class Coins extends MovableObject {
  width = 100;
  height = 100;


  constructor(x, y) {
    super().loadImage('img/8_coin/coin_1.png')
    this.x = x;
    this.y = y;
  }
}