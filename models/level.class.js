class Level {
  enemies;
  chicken;
  clouds;
  backgroundObjects;
  coins;
  level_end_x = 4300;

  constructor(coin, enemies, clouds, backgroundObjects) {
    this.coins = coins;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }


}