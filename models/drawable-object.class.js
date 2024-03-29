class DrawableObject {
    img;
    imgCache = {};
    currentImg = 0;
    x = 120;
    y = 200;
    height = 140;
    width = 135;
    num = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.img.onload = () => {
            this.imgCache[path] = this.img;
        };
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.error(e);
        }
    }

    drawFrame(ctx) {
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "white";
            ctx.rect(
                this.x + 25,
                this.y + 115,
                this.width - 63,
                this.height - 128
            );
            // ctx.stroke();
        }
    }

    drawFrameBottle(ctx) {
        if (this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "yellow";
            ctx.rect(
                this.x + 12,
                this.y + 12,
                this.width - 22,
                this.height - 22
            );
            // ctx.stroke();
        }
    }

    drawFrameChicken(ctx) {
        if (this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "white";
            ctx.rect(
                this.x + 12,
                this.y + 12,
                this.width - 22,
                this.height - 22
            );
            // ctx.stroke();
        }
    }

    drawFrameCoin(ctx) {
        if (this instanceof Coins) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "orange";
            ctx.rect(
                this.x, 
                this.y, 
                this.width,
                this.height
            );
            // ctx.stroke();
        }
    }

    drawFrameEndboss(ctx) {
        if (this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "red";
            ctx.rect(
                this.x, 
                this.y, 
                this.width, 
                this.height
            );
            // ctx.stroke();
        }
    }
}
