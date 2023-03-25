class Level {
    endboss;
    coins;
    enemies;
    clouds;
    backgroundSky;
    backgroundMountains;
    backgroundObjects;
    backgroundItems;
    level_end = 9400;
    level_start = 250;

    constructor(
        endboss,
        coins,
        enemies,
        clouds,
        backgroundSky,
        backgroundMountains,
        backgroundCacti,
        backgroundObjects,
        backgroundItems
    ) {
        this.endboss = endboss;
        this.coins = coins;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundSky = backgroundSky;
        this.backgroundMountains = backgroundMountains;
        this.backgroundCacti = backgroundCacti;
        this.backgroundObjects = backgroundObjects;
        this.backgroundItems = backgroundItems;
    }
}
