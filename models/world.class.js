class World {
    character = new Character();
    chicken = new Chicken();
    endboss = new Endboss();
    small_chicken = new SmallChicken();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    endbossBar = new EndbossBar();
    coinBar = new CoinBar();
    throwableObject = [];
    collectedCoins = [];
    WorldIntervals = [];
    AUDIO_MUTE = false;
    darkness = 1.1;
    killedChickens = 0;
    killedSmallChickens = 0;
    checkInterval;
    boss_near = false;
    boss_hit = false;

    endboss_ambience_sound = new Audio("audio/boss.mp3");
    ambience_lvl1 = new Audio("audio/ambience.mp3");
    music = new Audio("audio/la_bikina_remix.mp3");
    success_audio = new Audio("audio/success.mp3");
    boss_hit_audio = new Audio("audio/hit.mp3");
    walking_sound = new Audio("audio/walking.mp3");
    jumping_sound = new Audio("audio/jump.mp3");
    hurt_audio = new Audio("audio/hurt.mp3");
    dead_sound = new Audio("audio/dead.mp3");
    collecting_sound = new Audio("audio/coin.mp3");
    throw_sound = new Audio("audio/throw.mp3");
    bottle_smash_sound = new Audio("audio/breaking_glass.mp3");

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.resetMusic();
        this.draw();
        this.setWorld();
        this.initMusic();
        this.setAudios();
        this.run();
        this.muteAllAudio();
        this.unmuteAllAudio();
        this.M = false;
    }

    draw() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Translate the canvas to the camera position
        this.ctx.translate(this.camera_x, 0);
        // sky
        this.ctx.save();
        this.ctx.translate(-this.camera_x, 0);
        this.level.backgroundSky.forEach(obj => obj.draw(this.ctx));
        this.ctx.restore();
        // parallax mountain background
        this.ctx.save();
        this.ctx.translate(-this.camera_x * 0.2, 0);
        this.level.backgroundMountains.forEach(obj => obj.draw(this.ctx));
        this.ctx.restore();
        // parallax cacti background
        this.ctx.save();
        this.ctx.translate(-this.camera_x * 0.1, 0);
        this.level.backgroundCacti.forEach(obj => obj.draw(this.ctx));
        this.ctx.restore();
        // background desert walking ground
        this.ctx.save();
        this.ctx.translate(-this.camera_x * 0.01, 0);
        this.level.backgroundObjects.forEach(obj => obj.draw(this.ctx));
        this.ctx.restore();
        // draw items like house, cars and haystacks
        this.ctx.save();
        this.ctx.translate(-this.camera_x * 0.0, 0);
        this.level.backgroundItems.forEach(obj => obj.draw(this.ctx));
        this.ctx.restore();
        // Draw the clouds
        this.ctx.save();
        this.ctx.translate(-this.camera_x * 0.5, 0);
        this.level.clouds.forEach(cloud => cloud.draw(this.ctx));
        this.ctx.restore();
        // Draw the coins
        this.addObjectsToMap(this.level.coins);
        // Draw the character
        this.addToMap(this.character);
        // Draw the enemies
        this.addObjectsToMap(this.level.enemies);
        // Draw the endboss
        this.addObjectsToMap(this.level.endboss);
        // Draw the throwable object
        this.addObjectsToMap(this.throwableObject);
        // Translate the canvas back to the original position
        this.ctx.translate(-this.camera_x, 0);
        // Draw the status bar
        this.addToMap(this.statusBar);
        // Draw the endboss bar if the character is at a certain position
        if (this.boss_near) {
            this.endbossBar.draw(this.ctx);
        }
        // Draw the coin image
        this.addToMap(this.coinBar);
        // Draw the number of coins collected
        this.ctx.fillStyle = "white";
        this.ctx.font = "26px Cactus Regular";
        this.ctx.fillText(`x ${this.collectedCoins.length} / 30`, 468, 54);
        // Draw Blend in from Black Screen
        this.darkness -= 0.005;
        this.ctx.fillStyle = "rgba(0, 0, 0, " + this.darkness + ")";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Request another animation frame to continue drawing
        requestAnimationFrame(() => this.draw());
    }

    initMusic() {
        this.ambience_lvl1.play();
        this.music.play();
    }

    resetMusic() {
        this.music.pause();
        this.music.currentTime = 0;
        this.endboss_ambience_sound.pause();
        this.endboss_ambience_sound.currentTime = 0;
        this.ambience_lvl1.pause();
        this.ambience_lvl1.currentTime = 0;
        this.success_audio.pause();
        this.success_audio.currentTime = 0;
    }

    setAudios() {
        this.walking_sound.playbackRate = 2.2;
        this.walking_sound.volume = 1;
        this.jumping_sound.playbackRate = 0.8;
        this.hurt_audio.playbackRate = 1.4;
        this.music.loop = true;
        this.music.volume = 0.4;
        this.success_audio.volume = 0.5;
        this.success_audio.playbackRate = 1.2;
        this.ambience_lvl1.loop = true;
        this.endboss_ambience_sound.volume = 0.3;
        this.chicken.chicken_dead_sound.volume = 0.1;
        this.chicken.chicken_dead_sound.playbackRate = 1.5;
        this.collecting_sound.playbackRate = 1.7;
        this.boss_hit_audio.playbackRate = 2;
        this.dead_sound.volume = 0.3;
        this.dead_sound.playbackRate = 1.5;
        this.throw_sound.volume = 0.2;
        this.throw_sound.playbackRate = 1;
        this.bottle_smash_sound.volume = 0.4;
    }

    setWorld() {
        this.character.world = this;
        this.chicken.world = this;
        this.endboss.world = this;
    }

    run() {
        this.interval1 = setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsWithBoss();
        }, 330);

        this.interval2 = setInterval(() => {
            this.checkThrowObjects();
            this.checkDistanceBoss();
            this.bossHit();
        }, 350);

        this.interval3 = setInterval(() => {
            this.checkCollisionThrowBottle();
            // this.characterJumpKill();
        }, 5);

        this.interval4 = setInterval(() => {
            this.checkCollisionsCharacterWithCoins();
        }, 100);

        this.interval5 = setInterval(() => {
            this.endbossMusicChange();
            this.checkCollisionBottleEndboss();
            // console.log(this.music.currentTime);
        }, 750);

        this.interval6 = setInterval(() => {
            this.bossJumpAttack();
        }, 2000);

        this.interval7 = setInterval(() => {
            this.setAllAudio();
        }, 80);

        this.interval8 = setInterval(() => {
            this.checkBossAlive();
        }, 100);

        this.interval9 = setInterval(() => {
            console.log("Character Position x = ", this.character.x);
        }, 10000);

        this.WorldIntervals.push(
            this.interval1,
            this.interval2,
            this.interval3,
            this.interval4,
            this.interval5,
            this.interval6,
            this.interval8,
            this.interval9
        );
    }

    // checking if the bottle is already colliding with an enemy, if so,
    // it plays the sound, stops the walking animation, starts dying
    // animation for enemy and set timeout for enemy to disappear off-screen.
    checkCollisionThrowBottle() {
        this.throwableObject.forEach(bottle => {
            this.level.enemies.forEach(enemy => {
                if (bottle.isCollidingBottle(enemy)) {
                    this.chicken.chicken_dead_sound.play();
                    clearInterval(this.chicken.chicken_intervals.values());

                    if (enemy instanceof Chicken) {
                        this.rip_01 = setInterval(() => {
                            enemy.playAnimation(this.chicken.IMAGES_DYING);
                        }, 200);
                        setTimeout(() => {
                            enemy.y = this.offScreenY;
                            clearInterval(this.rip_01);
                            clearInterval(
                                this.chicken.chicken_intervals.values()
                            );
                        }, 450);
                    } else if (enemy instanceof SmallChicken) {
                        clearInterval(
                            this.small_chicken.small_chicken_intervals.values()
                        );

                        this.rip_02 = setInterval(() => {
                            enemy.playAnimation(
                                this.small_chicken.IMAGES_DYING
                            );
                            setTimeout(() => {
                                enemy.y = this.offScreenY;
                                clearInterval(this.rip_02);
                                clearInterval(
                                    this.small_chicken.small_chicken_intervals.values()
                                );
                            }, 100);
                        }, 200);
                    }
                }
            });
        });
    }

    checkCollisionBottleEndboss() {
        this.throwableObject.forEach(bottle => {
            this.level.endboss.forEach(endboss => {
                if (bottle.isCollidingBottle(endboss)) {
                    this.boss_hit = true;
                }
            });
        });
    }

    // check if the character is jumping on top of the enemy
    characterJumpKill() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isJumpingOn(enemy instanceof Chicken)) {
                console.log("kill");
                // this.chicken.chicken_dead_sound.play();
                // clearInterval(this.chicken.chicken_intervals.values());

                // if (enemy instanceof Chicken) {
                //     this.rip_01 = setInterval(() => {
                //         enemy.playAnimation(this.chicken.IMAGES_DYING);
                //     }, 200);
                //     setTimeout(() => {
                //         enemy.y = this.offScreenY;
                //         clearInterval(this.rip_01);
                //         clearInterval(
                //             this.chicken.chicken_intervals.values()
                //         );
                //     }, 450);
                // } else if (enemy instanceof SmallChicken) {
                //     clearInterval(
                //         this.small_chicken.small_chicken_intervals.values()
                //     );

                //     this.rip_02 = setInterval(() => {
                //         enemy.playAnimation(
                //             this.small_chicken.IMAGES_DYING
                //         );
                //         setTimeout(() => {
                //             enemy.y = this.offScreenY;
                //             clearInterval(this.rip_02);
                //             clearInterval(
                //                 this.small_chicken.small_chicken_intervals.values()
                //             );
                //         }, 100);
                //     }, 200);
                // }
            }
        });
    }

    bossHit() {
        if (this.boss_hit) {
            this.endboss.energy -= 5;
            console.log("Endboss Life = ", this.endboss.energy);
            this.endbossBar.setPercentage(this.endboss.energy);
            this.level.endboss.forEach(e =>
                e.playAnimation(this.endboss.IMAGES_HURT)
            );
            this.boss_hit_audio.currentTime = 0;
            this.boss_hit_audio.play();
            setTimeout(() => {
                this.boss_hit = false;
            }, 700);
        } else {
            this.level.endboss.forEach(endboss => {
                endboss.x -= endboss.speed;
                this.level.endboss.forEach(e =>
                    e.playAnimation(this.endboss.IMAGES_ATTACK)
                );
                this.boss_hit = false;
            });
        }
    }

    bossJumpAttack() {
        if (this.endboss.energy <= 99 && this.endboss.energy >= 0) {
            this.level.endboss.forEach(endboss => {
                this.jump01 = setTimeout(() => {
                    endboss.x = endboss.x - 30;
                }, 1000);
                this.jump01a = setTimeout(() => {
                    endboss.x = endboss.x - 60;
                }, 1500);
                this.jump01b = setTimeout(() => {
                    endboss.x = endboss.x - 90;
                }, 2000);
                this.jump02 = setTimeout(() => {
                    endboss.x = endboss.x + 60;
                }, 2500);
            });
        }
    }

    checkBossAlive() {
        if (this.endboss.energy <= 0) {
            this.endboss.energy = 0;
            this.level.endboss.forEach(e =>
                e.playAnimation(this.endboss.IMAGES_DYING)
            );
            this.music.currentTime = 0;
            this.success_audio.play();
            this.keyboard = false;
            this.endboss.deadIsTrue();
            setTimeout(() => {
                clearAllInterval(this.WorldIntervals.length);
                this.level.endboss.y = this.offScreenY;
            }, 160);
        }
    }

    checkDistanceBoss() {
        this.distance = Math.abs(this.endboss.x - this.character.x);
        if (this.distance < 600) {
            this.boss_near = true;
            this.level.endboss.forEach(e =>
                e.playAnimation(this.endboss.IMAGES_ALERT)
            );
            console.log("Boss Chicken spotted you!");
        }
    }

    endbossMusicChange() {
        if (this.boss_near) {
            this.music.pause();
            // this.music.currentTime = 0;
            // this.endboss_ambience_sound.currentTime = 0;
            this.endboss_ambience_sound.play();
        }
    }

    // press D and throw bottle
    checkThrowObjects() {
        if (this.keyboard.D && !this.character.walkingLeft) {
            this.bottle = new ThrowableObject(
                this.character.x + 79,
                this.character.y + 120  
            );
            this.throw_sound.currentTime = 0;
            this.throw_sound.play();
            this.throwableObject.push(this.bottle);
            this.character.loadImage("img/2_character_pepe/2_walk/W-23.png");
            setTimeout(() => {
                this.bottle_smash_sound.currentTime = 0;
                this.bottle_smash_sound.play();  
            }, 500);
        }
    }

    // character hit enemy then lose health
    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                console.log(
                    "Collision with Enemy, Life:",
                    this.character.energy
                );
            }
        });
    }

    checkCollisionsWithBoss() {
        this.level.endboss.forEach(endboss => {
            if (this.character.isColliding(endboss)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                console.log(
                    "Collision with Boss, Life:",
                    this.character.energy
                );
            }
        });
    }

    //  Checks for collisions between character and coins,
    //  plays sound, moves coin off-screen, adds to collected
    //  coins and logs total collected und uncollected.
    checkCollisionsCharacterWithCoins() {
        const uncollectedCoins = this.level.coins.filter(
            coin => !this.collectedCoins.includes(coin)
        );
        uncollectedCoins.forEach(coin => {
            if (this.character.isCollidingCoin(coin)) {
                this.collecting_sound.currentTime = 0;
                this.collecting_sound.play();
                coin.y = this.offScreenY;
                this.collectedCoins.push(coin);
                console.log("Collected Coins: ", this.collectedCoins.length);
                console.log("Coins Left: ", uncollectedCoins.length);
            }
        });
    }

    hitBoss() {
        this.endboss.energy -= 5;
        this.endbossBar.setPercentage(this.endboss.energy);
        console.log("Endboss Life = ", this.endboss.energy);
        setInterval(() => {
            this.endboss.playAnimation(this.endboss.IMAGES_HURT);
        }, 100);
        if (this.endboss.energy <= 0) {
            this.endboss.energy = 0;

            setInterval(() => {
                this.endboss.playAnimation(this.endboss.IMAGES_HURT);
            }, 100);
        } else {
            this.endboss.lastHitBoss = new Date().getTime();

            setInterval(() => {
                this.endboss.playAnimation(this.endboss.IMAGES_HURT);
            }, 100);
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.turn) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawFrameBottle(this.ctx);
        mo.drawFrameChicken(this.ctx);
        mo.drawFrameCoin(this.ctx);
        mo.drawFrameEndboss(this.ctx);
        if (mo.turn) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    setAllAudio() {
        if (this.keyboard.M) {
            // 'M' key is pressed, mute or unmute the audio...
            if (this.AUDIO_MUTE) {
                // Audio is currently muted, unmute it
                this.AUDIO_MUTE = false;
                console.log("unmute", this.AUDIO_MUTE);
                this.muteAllAudio();
            } else {
                // Audio is currently unmuted, mute it
                this.AUDIO_MUTE = true;
                console.log("mute", this.AUDIO_MUTE);
                this.unmuteAllAudio();
            }
        }
    }

    muteAllAudio() {
        let audioList = [
            this.music,
            this.endboss_ambience_sound,
            this.ambience_lvl1,
            this.success_audio,
            this.boss_hit_audio,
            this.throw_sound,
            this.bottle_smash_sound,
            this.walking_sound,
            this.jumping_sound,
            this.hurt_audio,
            this.dead_sound,
            this.collecting_sound,
            this.chicken.chicken_dead_sound,
        ];

        for (let i = 0; i < audioList.length; i++) {
            audioList[i].muted = true;
        }
    }

    unmuteAllAudio() {
        let audioList = [
            this.music,
            this.endboss_ambience_sound,
            this.ambience_lvl1,
            this.success_audio,
            this.boss_hit_audio,
            this.throw_sound,
            this.bottle_smash_sound,
            this.walking_sound,
            this.jumping_sound,
            this.hurt_audio,
            this.dead_sound,
            this.collecting_sound,
            this.chicken.chicken_dead_sound,
        ];

        for (let i = 0; i < audioList.length; i++) {
            audioList[i].muted = false;
        }
    }

    // audioCurrentTime(currentState) {
    //     this.music.currentTime = 0;
    //     this.endboss_ambience_sound.currentTime = currentState;
    //     this.ambience_lvl1.currentTime = currentState;
    //     this.success_audio.currentTime = currentState;
    //     this.boss_hit_audio.currentTime = currentState;
    //     this.throw_sound.currentTime = currentState;
    //     this.bottle_smash_sound.currentTime = currentState;
    //     this.walking_sound.currentTime = currentState;
    //     this.jumping_sound.currentTime = currentState;
    //     this.hurt_audio.currentTime = currentState;
    //     this.dead_sound.currentTime = currentState;
    //     this.collecting_sound.currentTime = currentState;
    // }
}
