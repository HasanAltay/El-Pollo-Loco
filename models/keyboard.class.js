class Keyboard {

  constructor() {
    this.LEFT = false;
    this.RIGHT = false;
    this.UP = false;
    this.DOWN = false;
    this.SPACE = false;
    this.D = false;
    this.M = false;


    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 39) {
        this.RIGHT = true;
      } else if (e.keyCode === 37) {
        this.LEFT = true;
      } else if (e.keyCode === 38) {
        this.UP = true;
      } else if (e.keyCode === 40) {
        this.DOWN = true;
      } else if (e.keyCode === 32) {
        this.SPACE = true;
      } else if (e.keyCode === 68) {
        this.D = true;
      } else if (e.keyCode === 77) {
        this.M = true;
      }
    });

    
    window.addEventListener("keyup", (e) => {
      if (e.keyCode === 39) {
        this.RIGHT = false;
      } else if (e.keyCode === 37) {
        this.LEFT = false;
      } else if (e.keyCode === 38) {
        this.UP = false;
      } else if (e.keyCode === 40) {
        this.DOWN = false;
      } else if (e.keyCode === 32) {
        this.SPACE = false;
      } else if (e.keyCode === 68) {
        this.D = false;
      } else if (e.keyCode === 77) {
        this.M = false;
      }
    });
  }


    initialize() {
      const btnLeft = document.getElementById("btn_left");
      const btnRight = document.getElementById("btn_right");
      const btnThrow = document.getElementById("btn_throw");
      const btnJump = document.getElementById("btn_jump");
  
      btnLeft.addEventListener("touchstart", () => {
        this.LEFT = true;
      });
      btnLeft.addEventListener("touchend", () => {
        this.LEFT = false;
      });
      btnRight.addEventListener("touchstart", () => {
        this.RIGHT = true;
      });
      btnRight.addEventListener("touchend", () => {
        this.RIGHT = false;
      });
      btnThrow.addEventListener("touchstart", () => {
        this.SPACE = true;
      });
      btnThrow.addEventListener("touchend", () => {
        this.SPACE = false;
      });
      btnJump.addEventListener("touchstart", () => {
        this.UP = true;
      });
      btnJump.addEventListener("touchend", () => {
        this.UP = false;
      });
    }
  }


  window.addEventListener("load", () => {
    let keyboard = new Keyboard();
    keyboard.initialize();
  });