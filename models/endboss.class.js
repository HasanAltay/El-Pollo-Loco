class Endboss extends MovableObject {
    height = 349;
    width = 300;
    y = 120;
    x = 0;
    energy = 100;
    speed = 1;
    dead = false;
    path = "img/4_enemie_boss_chicken/";

    IMAGES_ALERT = [
        this.path+"2_alert/G5.png",
        this.path+"2_alert/G6.png",
        this.path+"2_alert/G7.png",
        this.path+"2_alert/G8.png",
        this.path+"2_alert/G9.png",
        this.path+"2_alert/G10.png",
        this.path+"2_alert/G11.png",
        this.path+"2_alert/G12.png",
    ];

    IMAGES_WALK = [
        this.path+"1_walk/G1.png",
        this.path+"1_walk/G2.png",
        this.path+"1_walk/G3.png",
        this.path+"1_walk/G4.png",
    ];

    IMAGES_ATTACK = [
        this.path+"3_attack/G13.png",
        this.path+"3_attack/G14.png",
        this.path+"3_attack/G15.png",
        this.path+"3_attack/G16.png",
        this.path+"3_attack/G17.png",
        this.path+"3_attack/G18.png",
        this.path+"3_attack/G19.png",
        this.path+"3_attack/G20.png",
    ];

    IMAGES_HURT = [
        this.path+"4_hurt/G21.png",
        this.path+"4_hurt/G22.png",
        this.path+"4_hurt/G23.png",
        this.path+"4_hurt/G24.png",
    ];

    IMAGES_DYING = [
        this.path+"5_dead/G25.png",
        this.path+"5_dead/G26.png",
        this.path+"5_dead/G26.png",
        this.path+"5_dead/G26.png",
        this.path+"5_dead/G26.png",
        this.path+"5_dead/G26.png",
        this.path+"5_dead/G26.png",
        this.path+"5_dead/G26.png",
        this.path+"5_dead/G26.png",
        this.path+"5_dead/G26.png",
        this.path+"5_dead/G26.png",
        this.path+"5_dead/G24.png",
    ];

    constructor() {
        super();
        this.loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DYING);
        this.x = 9600;
        this.gameOver();
    }

    deadIsTrue() {
        this.dead = true;
        this.gameOver(this.dead);
    }

    gameOver(dead) {
        if (dead) {
            console.log("Boss is Dead!!!");
            this.world.music.currentTime = 0;
            this.world.endboss_ambience_sound.currentTime = 0;
            this.world.keyboard = false;
            this.world.muteAllAudio();
            document.getElementById("game_over").style.display = "block";
            document.getElementById("btn_play_again").style.display = "block";
            setTimeout(function () {
                for (let i = 1; i < 9999; i++) window.clearInterval(i);
            }, 500);
        }
    }
}
