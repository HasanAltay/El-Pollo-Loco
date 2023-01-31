class Endboss extends MovableObject {
  height = 349;
  width = 300;
  y = 100;
  x = 0;
  energy = 100;
  speed = 1;


  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  IMAGES_WALK = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  IMAGES_DYING = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];


  constructor() {
    super();
    this.loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DYING);
    this.x = 600;  //4200
    this.gameOver();
    this.dead = false;
  }


  deadIsTrue() {
    let dead = true;
    setTimeout(() => {
      this.gameOver(dead);
    }, 40000);
    console.log('Boss is Dead!');
    this.gameOver(dead);
  }


  gameOver(dead) {
    if (dead == true) {

      this.world.music.currentTime = 0;
      this.world.endboss_ambience_sound.currentTime = 0;
      this.world.keyboard = false;
      this.world.stopAllMusic();
      document.getElementById('game_over').style.display = 'block';
      document.getElementById('btn_play_again').style.display = 'block';
      setTimeout(function() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
      }, 650)
    }
  }

}