class Endboss extends MovableObject {
// world;
// character;
height = 400;
width = 300;
y = 55;
x = 0;
characterCheckpoint = false;

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
];


constructor(){
  super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
  this.loadImages(this.IMAGES_ALERT);
  this.loadImages(this.IMAGES_WALK);
  this.loadImages(this.IMAGES_ATTACK);
  this.loadImages(this.IMAGES_HURT);
  this.loadImages(this.IMAGES_DYING);
  this.x = 4200;
  this.animate();
  this.characterAnimations();
}


animate(){
  setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
  }, 160);
}


characterAnimations() {
  
  this.attack = setInterval(() => {
    if (this.characterCheckpoint) {
      this.playAnimation(this.IMAGES_ATTACK);
      this.moveLeft();
      console.log("ENDBOSS!");
    }
  }, 100);
  
  setInterval(() => {
    if (this.isDeadBoss()) {
      this.playAnimation(this.IMAGES_DYING);    
      clearInterval(this.attack);
      this.dead = true;
      this.gameOver(this.dead);
    }    
  }, 300);

  setInterval(() => {
    if (this.isHurtBoss()) {
      this.playAnimation(this.IMAGES_HURT);
    }    
  }, 100);

  }


  gameOver(dead) {
    if (dead == true) {
      document.getElementById('game_over').style.display = 'block';
      document.getElementById('you_lost').style.display = 'none';
      document.getElementById('btn_play_again').style.display = 'block';
      
    }
  }
}
