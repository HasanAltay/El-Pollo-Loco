let level1;
function initLevel() {

let air = 'img/5_background/layers/air.png';
let first_layer_2 = 'img/5_background/layers/1_first_layer/2.png';
let second_layer_2 = 'img/5_background/layers/2_second_layer/2.png';
let third_layer_2 = 'img/5_background/layers/3_third_layer/2.png';
let first_layer_1 = 'img/5_background/layers/1_first_layer/1.png';
let second_layer_1 = 'img/5_background/layers/2_second_layer/1.png';
let third_layer_1 = 'img/5_background/layers/3_third_layer/1.png';

level1 = new Level (

  coins = [
    new Coins(-100, 340),
    new Coins(-300, 340),
    new Coins(-540, 340),
    new Coins(0, 340),
    new Coins(100, 340),
    new Coins(200, 340),
    new Coins(250, 340),
    new Coins(300, 340),
    new Coins(400, 340),
    new Coins(500, 340),
    new Coins(1800, 340),
    new Coins(2000, 340),
    new Coins(2200, 340),
  ],

  enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Endboss(),
  ],

  clouds = [
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
  ],

  backgroundObjects = [
    new BackgroundObject(air, -719, 0),
    new BackgroundObject(third_layer_2, -719, 0),
    new BackgroundObject(second_layer_2, -719, 0),
    new BackgroundObject(first_layer_2, -719, 0),
    new BackgroundObject('img/house.png', -700, -21),

    new BackgroundObject(air, 0, 0),
    new BackgroundObject(third_layer_1, 0, 0),
    new BackgroundObject(second_layer_1, 0, 0),
    new BackgroundObject(first_layer_1, 0, 0),

    new BackgroundObject(air, 719, 0),
    new BackgroundObject(third_layer_2, 719, 0),
    new BackgroundObject(second_layer_2, 719, 0),
    new BackgroundObject(first_layer_2, 719, 0),

    new BackgroundObject(air, 1438, 0),
    new BackgroundObject(third_layer_1, 1438, 0),
    new BackgroundObject(second_layer_1, 1438, 0),
    new BackgroundObject(first_layer_1, 1438, 0),

    new BackgroundObject(air, 2157, 0),
    new BackgroundObject(third_layer_2, 2157, 0),
    new BackgroundObject(second_layer_2, 2157, 0),
    new BackgroundObject(first_layer_2, 2157, 0),

    new BackgroundObject(air, 2876, 0),
    new BackgroundObject(third_layer_1, 2876, 0),
    new BackgroundObject(second_layer_1, 2876, 0),
    new BackgroundObject(first_layer_1, 2876, 0),

    new BackgroundObject(air, 3595, 0),
    new BackgroundObject(third_layer_2, 3595, 0),
    new BackgroundObject(second_layer_2, 3595, 0),
    new BackgroundObject(first_layer_2, 3595, 0),

    new BackgroundObject(air, 4314, 0),
    new BackgroundObject(third_layer_1, 4314, 0),
    new BackgroundObject(second_layer_1, 4314, 0),
    new BackgroundObject(first_layer_1, 4314, 0),
  ],
);

}
