let level1;
function initLevel() {


level1 = new Level (
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
    new BackgroundObject('img/5_background/layers/air.png', -719, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719, 0),
    new BackgroundObject('img/house.png', -700, -21),

    new BackgroundObject('img/5_background/layers/air.png', 0, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0),

    new BackgroundObject('img/5_background/layers/air.png', 719, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719, 0),

    new BackgroundObject('img/5_background/layers/air.png', 1438, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1438, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1438, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1438, 0),

    new BackgroundObject('img/5_background/layers/air.png', 2157, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2157, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2157, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2157, 0),

    new BackgroundObject('img/5_background/layers/air.png', 2876, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2876, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2876, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2876, 0),

    new BackgroundObject('img/5_background/layers/air.png', 3595, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 3595, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 3595, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 3595, 0),

    new BackgroundObject('img/5_background/layers/air.png', 4314, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 4314, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 4314, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 4314, 0),
  ],
);

}
