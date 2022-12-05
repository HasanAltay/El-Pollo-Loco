class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  throwableObject = [];

  // enemies = level1.enemies;
  // clouds = level1.clouds;
  // backgroundObjects = level1.backgroundObjects;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }


  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }


  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(this.character.x +79, this.character.y +120);
      this.throwableObject.push(bottle);
    }
  }


  checkCollisions() {
  this.level.enemies.forEach((enemy) => {
    if (this.character.isColliding(enemy) ) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
      console.log('Collision with Enemy, Energy:', this.character.energy);
    }
  });
}


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);    
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObject);  
    
      this.ctx.translate(-this.camera_x, 0); // Back
        this.addToMap(this.statusBar);
      this.ctx.translate(this.camera_x, 0); // Forward

    this.ctx.translate(-this.camera_x, 0);
    

    // Draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function() {
      self.draw();
    });
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


}