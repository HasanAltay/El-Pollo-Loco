class Keyboard {

  constructor() {

    this.LEFT = false;
    this.RIGHT = false;
    this.UP = false;
    this.DOWN = false;
    this.SPACE = false;
    this.D = false;
    this.M = false;


    window.addEventListener("load", () => {
      this.initialize();
    });


    window.addEventListener("keydown", event => {
      switch (event.key) {
        case "ArrowRight":
          this.RIGHT = true;
          break;
        case "ArrowLeft":
          this.LEFT = true;
          break;
        case "ArrowUp":
          this.UP = true;
          break;
        case "ArrowDown":
          this.DOWN = true;
          break;
        case " ":
          this.SPACE = true;
          break;
        case "d":
          this.D = true;
          break;
        case "m":
          this.M = true;
          break;
      }
    });


    window.addEventListener("keyup", event => {
      switch (event.key) {
        case "ArrowRight":
          this.RIGHT = false;
          break;
        case "ArrowLeft":
          this.LEFT = false;
          break;
        case "ArrowUp":
          this.UP = false;
          break;
        case "ArrowDown":
          this.DOWN = false;
          break;
        case " ":
          this.SPACE = false;
          break;
        case "d":
          this.D = false;
          break;
        case "m":
          this.M = false;
          break;
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
      this.D = true;
    });
    btnThrow.addEventListener("touchend", () => {
      this.D = false;
    });
    btnJump.addEventListener("touchstart", () => {
      this.SPACE = true;
    });
    btnJump.addEventListener("touchend", () => {
      this.SPACE = false;
    });
  }

}