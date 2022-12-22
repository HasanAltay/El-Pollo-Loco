let canvas;
let world;
let keyboard = new Keyboard();
let fullscr = false;


function screenSize() {
    if (fullscr == true) {
        exitFullscreen();
        fullscr = false;
    }
    else if (fullscr == false) {
        enterFullscreen(document.getElementById("fullscreen"));
        fullscr = true;    
    }      
}


function enterFullscreen(element) {
    if(element.requestFullscreen) {
    element.requestFullscreen();
    } else if(element.msRequestFullscreen) {  // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
    element.webkitRequestFullscreen();
    }
}


function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
}


function playAgain() {
    clearAllInterval();
    clearScreen();
    init();
}


function clearAllInterval() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


function clearScreen() {
    document.getElementById('game_over').style.display = 'none';
    document.getElementById('you_lost').style.display = 'none';
    document.getElementById('btn_play_game').style.display = 'none';
    document.getElementById('btn_play_again').style.display = 'none';
}


function init() {
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
}


window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
    if (e.keyCode == 77) {
        keyboard.M = true;
    }
    // console.log(e)
});


window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
    if (e.keyCode == 77) {
        keyboard.M = false;
    }
    // console.log(e)
});