let level1;

function initLevel() {
    let air = "img/5_background/air.png";
    let second_layer = "img/5_background/cacti.png";
    let third_layer = "img/5_background/mountains.png";
    let first_layer_1 = "img/5_background/desert_1.png";
    let first_layer_2 = "img/5_background/desert_2.png";
    let house = "img/5_background/house.png";
    let hay_car = "img/5_background/hay_car.png";
    let hay = "img/5_background/hay.png";
    let bottle_boxes = "img/5_background/bottle_boxes.png";
    let pickup_bottle = "img/5_background/pickup_bottle.png";
    let cacti_y_adjust = -95;
    let mountains_y_adjust = -30;

    level1 = new Level(
        (endboss = [new Endboss()]),
        (coins = []),
        (enemies = []),
        (clouds = []),
        (backgroundSky = []),
        (backgroundMountains = []),
        (backgroundCacti = []),
        (backgroundObjects = []),
        (backgroundItems = [
            new BackgroundObject(house, 490, -21),
            new BackgroundObject(bottle_boxes, -440, 0),
            new BackgroundObject(pickup_bottle, 1170, -16),
            new BackgroundObject(hay_car, 719 * 4, 0),
            new BackgroundObject(hay, 719 * 6, -10), // x = 4300
            new BackgroundObject(hay, 719 * 13, -10), // x = 9300
        ]),
    );

    for (let i = 0; i < 14; i++) {
        backgroundSky.push(
            new BackgroundObject(air, (960-1) * i, 0),
        );

        backgroundMountains.push(
            new BackgroundObject(third_layer, (960-1) * i, mountains_y_adjust),
        );

        backgroundCacti.push(
            new BackgroundObject(second_layer, (960-1) * i, cacti_y_adjust),
        );

        let first_layer = (i % 2 === 0) ? first_layer_1 : first_layer_2;
        backgroundObjects.push(
            new BackgroundObject(first_layer, (960-1) * i, 0),
        );

        clouds.push(
            new Cloud(),
        );

        // random enemies.
        const randomEnemy = Math.random() < 0.5 ? new Chicken() : new SmallChicken();
        enemies.push(randomEnemy);
    }

    const coinDistance = 30; // minimum distance between coins
    const totalCoins = 30; // total number of coins
    for (let i = 0; i < totalCoins; i++) {
        let isOverlap = true;
        let randomX, randomY;
    
        // generate random coordinates until a non-overlapping one is found
        while (isOverlap) {
            isOverlap = false;
            randomX = Math.floor(Math.random() * 7400) + 600;
            randomY = Math.random() < 0.5 ? 360 : 220;
    
            // check if the new coin overlaps with any of the existing coins
            for (let j = 0; j < coins.length; j++) {
                let existingCoin = coins[j];
                let distance = Math.sqrt(Math.pow(existingCoin.x - randomX, 2) + Math.pow(existingCoin.y - randomY, 2));
                if (distance < coinDistance) {
                    isOverlap = true;
                    break;
                }
            }
        }
        // add the non-overlapping coin to the coins array
        coins.push(new Coins(randomX, randomY));
    }
}
