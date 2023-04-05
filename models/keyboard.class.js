class Keyboard {
    constructor() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.DOWN = false;
        this.SPACE = false;
        this.D = false;
        this.M = false;

        window.addEventListener("keydown", event => {
            switch (event.key) {
                // Other cases...
                case "m":
                    this.M = true;
                    break;
            }
        });
        
        window.addEventListener("keyup", event => {
            switch (event.key) {
                // Other cases...
                case "m":
                    this.M = false;
                    break;
            }
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
}
