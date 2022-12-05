class StatusBar extends DrawableObject {
  IMAGES_HEALTH = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
  ];

  IMAGES_COIN = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
  ];

  IMAGES_BOTTLE = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.loadImages(this.IMAGES_COIN);
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 30;
    this.y = 10;
    this.width = 198;
    this.height = 53;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage; // => 0...5
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imgCache[path];
  }

    resolveImageIndex() {
      if (this.percentage == 100) {
        return 5;
      }
      else if (this.percentage > 80) {
        return 4;
      }
      else if (this.percentage > 60) {
        return 3;
      }
      else if (this.percentage > 40) {
        return 2;
      }
      else if (this.percentage > 20) {
        return 1;
      }
      else {
        return 0;
      }
    }
  

}