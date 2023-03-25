class MovableObject extends DrawableObject {
    speed = 0.2;
    turn = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    energy_boss = 100;
    lastHit = 0;
    lastHitBoss = 0;
    walkingLeft;
    chicken_hit;
    chicken;
    intervalArray = [];

    applyGravity() {
        setInterval(() => {
            if (this.aboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    aboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 220;
        }
    }

    aboveGroundBottle() {
        return this.y < this.groundPos;
    }

    isJumpingOn(enemy) {
        // calculate the coordinates of the character's feet and the enemy's top
        let charFeetY = this.y + this.height;
        let enemyTopY = enemy.y;
        // console.log(enemy);
        console.log('kill')
        // check if the character is above the enemy's top and within a certain distance
        if (
          charFeetY < enemyTopY &&
          charFeetY >= enemyTopY - this.speedY / 2 &&
          Math.abs(this.x - enemy.x) <= enemy.width / 2
        ) {
          return true;
        } else {
          return false;
        }
      }
      
    isColliding(mo) {
        let object1X = this.x + 25;
        let object1Y = this.y + 115;
        let object1Width = this.width - 63;
        let object1Height = this.height - 128;

        let object2X = mo.x;
        let object2Y = mo.y;
        let object2Width = mo.width;
        let object2Height = mo.height;

        return (
            object1X + object1Width > object2X &&
            object1Y + object1Height > object2Y &&
            object1X < object2X + object2Width &&
            object1Y < object2Y + object2Height
        );
    }

    checkCollisionForStroke(mo) {
        if (this.isColliding(mo)) {
            let collisionX = max(this.x, mo.x);
            let collisionY = max(this.y, mo.y);
            let collisionWidth =
                min(this.x + this.width, mo.x + mo.width) - collisionX;
            let collisionHeight =
                min(this.y + this.height, mo.y + mo.height) - collisionY;

            this.ctx.beginPath();
            this.ctx.strokeStyle = "red";
            this.ctx.lineWidth = 2;
            this.ctx.rect(
                collisionX,
                collisionY,
                collisionWidth,
                collisionHeight
            );
            this.ctx.stroke();
        }
    }

    isCollidingBottle(mo) {
        let object1X = this.x;
        let object1Y = this.y;
        let object1Width = this.width;
        let object1Height = this.height;
        let object2X = mo.x + 7;
        let object2Y = mo.y + 7;
        let object2Width = mo.width - 7;
        let object2Height = mo.height - 7;

        return (
            object1X + object1Width > object2X &&
            object1Y + object1Height > object2Y &&
            object1X < object2X + object2Width &&
            object1Y < object2Y + object2Height
        );
    }

    isCollidingChicken(mo) {
        let object1X = this.x + 25;
        let object1Y = this.y + 115;
        let object1Width = this.width - 63;
        let object1Height = this.height - 128;
        let object2X = mo.x + 7;
        let object2Y = mo.y + 7;
        let object2Width = mo.width - 20;
        let object2Height = mo.height - 7;

        return (
            object1X + object1Width > object2X &&
            object1Y + object1Height > object2Y &&
            object1X < object2X + object2Width &&
            object1Y < object2Y + object2Height
        );
    }

    isCollidingCoin(mo) {
        let object1X = this.x + 25;
        let object1Y = this.y + 115;
        let object1Width = this.width - 63;
        let object1Height = this.height - 128;
        let object2X = mo.x;
        let object2Y = mo.y;
        let object2Width = mo.width;
        let object2Height = mo.height;

        return (
            object1X + object1Width > object2X &&
            object1Y + object1Height > object2Y &&
            object1X < object2X + object2Width &&
            object1Y < object2Y + object2Height
        );
    }

    isCollidingChickenBoss(mo) {
        let object1X = this.x + 25;
        let object1Y = this.y + 115;
        let object1Width = this.width - 63;
        let object1Height = this.height - 128;
        let object2X = mo.x;
        let object2Y = mo.y;
        let object2Width = mo.width;
        let object2Height = mo.height;

        return (
            object1X + object1Width > object2X &&
            object1Y + object1Height > object2Y &&
            object1X < object2X + object2Width &&
            object1Y < object2Y + object2Height
        );
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
            this.world.dead_sound.currentTime = 0;
            this.world.dead_sound.play();
        } else {
            this.lastHit = new Date().getTime();
            this.world.hurt_audio.currentTime = 0;
            this.world.hurt_audio.play();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImg % images.length;
        let path = images[i];
        if (this.imgCache[path]) {
            this.img = this.imgCache[path];
        } else {
            this.img = new Image();
            this.img.src = path;
            this.imgCache[path] = this.img;
        }
        this.currentImg++;
    }

    moveLeft() {
        this.x -= this.speed;
        this.walkingLeft = true;

        if (this.x <= 20) {
            // Remove the object from the game
            this.x = 8000;
        }
    }

    moveRight() {
        this.x += this.speed;
        this.turn = false;
        this.walkingLeft = false;
    }

    fallOut() {
        let fallingSpeed = this.speed;
        let fallingInterval = setInterval(() => {
            if (this.y >= window.innerHeight) {
                this.y = this.offScreenY;
                clearInterval(fallingInterval);
            } else {
                this.y += fallingSpeed;
                fallingSpeed += this.acceleration;
            }
        }, 40);
    }

    jump() {
        this.speedY = 20;
    }
}
