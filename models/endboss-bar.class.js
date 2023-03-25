class EndbossBar extends DrawableObject {
    IMAGES_HEALTH_BOSS = [
        "img/7_statusbars/2_endboss/boss_bar_06.png",
        "img/7_statusbars/2_endboss/boss_bar_05.png",
        "img/7_statusbars/2_endboss/boss_bar_04.png",
        "img/7_statusbars/2_endboss/boss_bar_03.png",
        "img/7_statusbars/2_endboss/boss_bar_02.png",
        "img/7_statusbars/2_endboss/boss_bar_01.png",
    ];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_BOSS);
        this.x = 707;
        this.y = 23;
        this.width = 218;
        this.height = 43;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => 0...5
        let path = this.IMAGES_HEALTH_BOSS[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
