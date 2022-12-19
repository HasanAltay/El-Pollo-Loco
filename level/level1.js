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

  endboss = [
    new Endboss(),
  ],

  coins = [
    new Coins(-100, 340),
    new Coins(-300, 340),
    new Coins(-555, 210),
    new Coins(0, 200),
    new Coins(100, 340),
    new Coins(200, 340),
    new Coins(250, 200),
    new Coins(330, 200),
    new Coins(400, 340),
    new Coins(1000, 200),
    new Coins(1160, 200),
    new Coins(1080, 200),
    new Coins(1500, 340),
    new Coins(1800, 340),
    new Coins(2000, 200),
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
    new BackgroundObject('img/bottle_boxes.png', -1200, 0),

    new BackgroundObject(air, 0, 0),
    new BackgroundObject(third_layer_1, 0, 0),
    new BackgroundObject(second_layer_1, 0, 0),
    new BackgroundObject(first_layer_1, 0, 0),
    new BackgroundObject('img/pickup_bottle.png', -100, -16),

    new BackgroundObject(air, 719, 0),
    new BackgroundObject(third_layer_2, 719, 0),
    new BackgroundObject(second_layer_2, 719, 0),
    new BackgroundObject(first_layer_2, 719, 0),

    new BackgroundObject(air, 719*2, 0),
    new BackgroundObject(third_layer_1, 719*2, 0),
    new BackgroundObject(second_layer_1, 719*2, 0),
    new BackgroundObject(first_layer_1, 719*2, 0),

    new BackgroundObject(air, 719*3, 0),
    new BackgroundObject(third_layer_2, 719*3, 0),
    new BackgroundObject(second_layer_2, 719*3, 0),
    new BackgroundObject(first_layer_2, 719*3, 0),

    new BackgroundObject(air, 719*4, 0),
    new BackgroundObject(third_layer_1, 719*4, 0),
    new BackgroundObject(second_layer_1, 719*4, 0),
    new BackgroundObject(first_layer_1, 719*4, 0),
    new BackgroundObject('img/hay_car.png', 719*4, -20),

    new BackgroundObject(air, 719*5, 0),
    new BackgroundObject(third_layer_2, 719*5, 0),
    new BackgroundObject(second_layer_2, 719*5, 0),
    new BackgroundObject(first_layer_2, 719*5, 0),

    new BackgroundObject(air, 719*6, 0),
    new BackgroundObject(third_layer_1, 719*6, 0),
    new BackgroundObject(second_layer_1, 719*6, 0),
    new BackgroundObject(first_layer_1, 719*6, 0),
    new BackgroundObject('img/hay.png', 719*6, -10),

    new BackgroundObject(air, 719*7, 0),
    new BackgroundObject(third_layer_1, 719*7, 0),
    new BackgroundObject(second_layer_1, 719*7, 0),
    new BackgroundObject(first_layer_1, 719*7, 0),

    new BackgroundObject(air, 719*8, 0),
    new BackgroundObject(third_layer_1, 719*8, 0),
    new BackgroundObject(second_layer_1, 719*8, 0),
    new BackgroundObject(first_layer_1, 719*8, 0),

    new BackgroundObject(air, 719*9, 0),
    new BackgroundObject(third_layer_1, 719*9, 0),
    new BackgroundObject(second_layer_1, 719*9, 0),
    new BackgroundObject(first_layer_1, 719*9, 0),
  ],
);

}
