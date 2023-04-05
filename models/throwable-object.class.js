class ThrowableObject extends MovableObject {
    IMAGES_BOTTLE = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/1.5_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2.5_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3.5_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4.5_bottle_rotation.png",
    ];

    IMAGES_BOTTLE_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];
    groundPos = 430;

    constructor(x, y) {
        super();
        this.loadImage(
            "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
        );
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x - 20;
        this.y = y + 5;
        this.height = 50;
        this.width = 50;
        this.throw();
    }

    throw() {
        this.speedY = 9;
        this.applyGravity();
        this.playInterval = setInterval(() => {
            if (this.aboveGroundBottle()) {
                this.x += 32;
                this.playAnimation(this.IMAGES_BOTTLE);
            } else {
                this.y = 430;
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                // this.bottle_smash_sound.currentTime = 0;
                // this.bottle_smash_sound.play();
                clearInterval(this.playInterval);
            }
        }, 70);
    }
}
