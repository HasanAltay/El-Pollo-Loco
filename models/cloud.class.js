class Cloud extends MovableObject {
    y = 40;
    x = 0;
    width = 400;
    height = 100;
    clouds = [];
    cloudImages = [
        "img/5_background/clouds_1.png",
        "img/5_background/clouds_2.png",
    ];
    currentImage = 0;

    constructor() {
        super().loadImage(this.cloudImages[this.currentImage]);
        this.currentImage = (this.currentImage + 1) % this.cloudImages.length;
        this.generatePosition();
        this.animate();
        this.clouds.push(this);
    }

    generatePosition() {
        let x = Math.random() * 9000;
        let overlap = false;
        for (let i = 0; i < this.clouds.length; i++) {
            let cloud = this.clouds[i];
            if (x > cloud.x - this.width && x < cloud.x + cloud.width + 200) {
                overlap = true;
                break;
            }
        }
        if (overlap) {
            this.generatePosition();
        } else {
            this.x = x;
        }
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 40);
    }
}
