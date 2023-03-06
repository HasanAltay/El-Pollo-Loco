class Coins extends MovableObject {
    width = 30;
    height = 30;
    x = 0;
    y = 0;
    world;
    character;
    collectedCoins = [];

    IMAGES_COIN = [
        "img/8_coin/coin_01.png",
        "img/8_coin/coin_02.png",
        "img/8_coin/coin_03.png",
        "img/8_coin/coin_04.png",
        "img/8_coin/coin_05.png",
        "img/8_coin/coin_06.png",
    ];

    constructor(x, y) {
        super().loadImage("img/8_coin/coin_01.png");
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 100);
    }
}
