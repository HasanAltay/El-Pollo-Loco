class Level {
  endboss;
  enemies;
  chicken;
  coin;
  clouds;
  backgroundObjects;
  coins;
  level_end_x = 9300;

  constructor(endboss, coins, enemies, clouds, backgroundObjects) {
    this.endboss = endboss;
    this.coins = coins;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}