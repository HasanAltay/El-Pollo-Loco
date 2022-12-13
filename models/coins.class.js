class Coins extends MovableObject {
  width = 35;
  height = 35;
  x = 0;
  y = 0;
  world;
  character;
  collectedCoins = [];


  constructor(x, y) {
    super().loadImage('img/8_coin/coin_1.png')
    this.x = x;
    this.y = y + 20;
  }


  collectedCoin() {
    return this.collectedCoins += 1;
  }


  animate() {
    setInterval(() => {
      if (this.character.isColliding(this.world.coin)) {
        console.log('Chicken Hit!');
      }
    }, 110);      
  }






}