let level1;

function initLevel() {
let air = 'img/5_background/air.png';
let first_layer_2 = 'img/5_background/1_first_layer/2.png';
let second_layer_2 = 'img/5_background/2_second_layer/layer_2.png';
let third_layer_2 = 'img/5_background/3_third_layer/layer_3.png';
let first_layer_1 = 'img/5_background/1_first_layer/1.png';
let second_layer_1 = 'img/5_background/2_second_layer/layer_2.png';
let third_layer_1 = 'img/5_background/3_third_layer/layer_3.png';
let house = 'img/5_background/5_objects/house.png';
let hay_car = 'img/5_background/5_objects/hay_car.png';
let hay = 'img/5_background/5_objects/hay.png';
let bottle_boxes = 'img/5_background/5_objects/bottle_boxes.png';
let pickup_bottle = 'img/5_background/5_objects/pickup_bottle.png';
let y2_adjust = -80;
let y3_adjust = -80;

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
    new Coins(250, 340),
    new Coins(330, 200),
    new Coins(400, 340),
    new Coins(1000, 340),
    new Coins(1160, 340),
    new Coins(1160, 200),
    new Coins(1500, 340),
    new Coins(1800, 340),
    new Coins(2000, 200),
    new Coins(2200, 340),
    new Coins(2500, 340),
    new Coins(2800, 340),
    new Coins(3000, 340),
    new Coins(3200, 200),
    new Coins(5500, 340),
    new Coins(5800, 340),
    new Coins(5900, 340),
    new Coins(6500, 340),
    new Coins(6800, 340),
    new Coins(7800, 340),
    new Coins(7900, 340),
    new Coins(8000, 340),
    new Coins(8000, 200),
    new Coins(8000, 240),
  ],

  enemies = [
    new Chicken(),
    new Chicken(),
    new SmallChicken(),
    new Chicken(),
    new SmallChicken(),
    new Chicken(),
    new Chicken(),
    new SmallChicken(),
    new Chicken(),
    new Chicken(),
    new SmallChicken(),
    new Chicken(),
    new Chicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new Chicken(),
    new Chicken(),
    new SmallChicken(),
    new SmallChicken(),
    new Chicken(),
    new Chicken(),
    new SmallChicken(),
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
    new Cloud(),
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
    new BackgroundObject(third_layer_2, -719, y3_adjust),
    new BackgroundObject(second_layer_2, -719, y2_adjust),
    new BackgroundObject(first_layer_2, -719, 0),
    new BackgroundObject(house, -700, -21),
    new BackgroundObject(bottle_boxes, -1200, 0),

    new BackgroundObject(air, 0, 0),
    new BackgroundObject(third_layer_1, 0, y3_adjust),
    new BackgroundObject(second_layer_1, 0, y2_adjust),
    new BackgroundObject(first_layer_1, 0, 0),
    new BackgroundObject(pickup_bottle, -100, -16),

    new BackgroundObject(air, 719, 0),
    new BackgroundObject(third_layer_2, 719, y3_adjust),
    new BackgroundObject(second_layer_2, 719, y2_adjust),
    new BackgroundObject(first_layer_2, 719, 0),

    new BackgroundObject(air, 719*2, 0),
    new BackgroundObject(third_layer_1, 719*2, y3_adjust),
    new BackgroundObject(second_layer_1, 719*2, y2_adjust),
    new BackgroundObject(first_layer_1, 719*2, 0),

    new BackgroundObject(air, 719*3, 0),
    new BackgroundObject(third_layer_2, 719*3, y3_adjust),
    new BackgroundObject(second_layer_2, 719*3, y2_adjust),
    new BackgroundObject(first_layer_2, 719*3, 0),

    new BackgroundObject(air, 719*4, 0),
    new BackgroundObject(third_layer_1, 719*4, y3_adjust),
    new BackgroundObject(second_layer_1, 719*4, y2_adjust),
    new BackgroundObject(first_layer_1, 719*4, 0),
    new BackgroundObject(hay_car, 719*4, -20),

    new BackgroundObject(air, 719*5, 0),
    new BackgroundObject(third_layer_2, 719*5, y3_adjust),
    new BackgroundObject(second_layer_2, 719*5, y2_adjust),
    new BackgroundObject(first_layer_2, 719*5, 0),

    new BackgroundObject(air, 719*6, 0),
    new BackgroundObject(third_layer_1, 719*6, y3_adjust),
    new BackgroundObject(second_layer_1, 719*6, y2_adjust),
    new BackgroundObject(first_layer_1, 719*6, 0),
    new BackgroundObject(hay, 719*6, -10), // x = 4300

    new BackgroundObject(air, 719*7, 0),
    new BackgroundObject(third_layer_2, 719*7, y3_adjust),
    new BackgroundObject(second_layer_2, 719*7, y2_adjust),
    new BackgroundObject(first_layer_2, 719*7, 0),

    new BackgroundObject(air, 719*8, 0),
    new BackgroundObject(third_layer_1, 719*8, y3_adjust),
    new BackgroundObject(second_layer_1, 719*8, y2_adjust),
    new BackgroundObject(first_layer_1, 719*8, 0),

    new BackgroundObject(air, 719*9, 0),
    new BackgroundObject(third_layer_2, 719*9, y3_adjust),
    new BackgroundObject(second_layer_2, 719*9, y2_adjust),
    new BackgroundObject(first_layer_2, 719*9, 0),

    new BackgroundObject(air, 719*10, 0),
    new BackgroundObject(third_layer_1, 719*10, y3_adjust),
    new BackgroundObject(second_layer_1, 719*10, y2_adjust),
    new BackgroundObject(first_layer_1, 719*10, 0),

    new BackgroundObject(air, 719*11, 0),
    new BackgroundObject(third_layer_2, 719*11, y3_adjust),
    new BackgroundObject(second_layer_2, 719*11, y2_adjust),
    new BackgroundObject(first_layer_2, 719*11, 0),

    new BackgroundObject(air, 719*12, 0), // x = 8300
    new BackgroundObject(third_layer_1, 719*12, y3_adjust),
    new BackgroundObject(second_layer_1, 719*12, y2_adjust),
    new BackgroundObject(first_layer_1, 719*12, 0),

    new BackgroundObject(air, 719*13, 0),
    new BackgroundObject(third_layer_2, 719*13, y3_adjust),
    new BackgroundObject(second_layer_2, 719*13, y2_adjust),
    new BackgroundObject(first_layer_2, 719*13, 0),
    new BackgroundObject(hay, 719*13, -10), // x = 9300
  ],
);

}
