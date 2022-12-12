class Coins extends MovableObject {
  width = 35;
  height = 35;
  x = 0;
  y = 0;
  world;
  character;
  collectedCoins = 0;


  constructor(x, y) {
    super().loadImage('img/8_coin/coin_1.png')
    this.x = x;
    this.y = y + 20;
  }


  collectedCoin() {
    return this.collectedCoins += 1;
  }


  animate() {

    let interval08 = setInterval(() => {
      if (this.character.isColliding(this.world.coin)) {
        
        console.log('Chicken Hit!');

      }
      // this.world.intervalArray.push(interval08);
    }, 110);
  }






}