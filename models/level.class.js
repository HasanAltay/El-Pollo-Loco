class Level {
  enemies;
  chicken;
  coin;
  clouds;
  backgroundObjects;
  coins;
  level_end_x = 4300;

  constructor(coins, enemies, clouds, backgroundObjects) {
    this.coins = coins;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }


}