let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen = false;
let lastMoved;

// Überprüfen, ob das Gerät ein Touchscreen hat
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

// Wenn es sich um ein Touchscreen-Gerät handelt, fügen Sie den Eventlistener hinzu
if (isTouchDevice) {
    // Wählen Sie die Elemente aus
    const action = document.querySelector(".action");
    const walk = document.querySelector(".walk");

    // Setzen Sie den Style von visibility auf visible
    action.style.visibility = "visible";
    walk.style.visibility = "visible";
}

function screenSize() {
    if (fullscreen) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        fullscreen = false;
    } else {
        let element = document.getElementById("fullscreen");
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        fullscreen = true;
    }
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function playAgain() {
    clearAllInterval();
    clearScreen();
    init();
    resetAudio();
}

function playGame() {
    clearAllInterval();
    clearScreen();
    init();
    resetAudio();
}

function resetAudio() {
    world.music.currentTime = 0;
    world.endboss_ambience_sound.currentTime = 0;
    world.ambience_lvl1.currentTime = 0;
    world.success_audio.currentTime = 0;
}

function clearAllInterval() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function clearScreen() {
    document.getElementById("game_over").style.display = "none";
    document.getElementById("you_lost").style.display = "none";
    document.getElementById("btn_play_game").style.display = "none";
    document.getElementById("btn_play_again").style.display = "none";
    document.getElementById("canvas").style.backgroundImage = "unset";
}

function init() {
    canvas = document.getElementById("canvas");
    initLevel();
    world = new World(canvas, keyboard);
    touchButtons();
    lastMoved = new Date().getTime();
}

function touchButtons() {
    const btnLeft = document.getElementById("btn_left");
    const btnRight = document.getElementById("btn_right");
    const btnThrow = document.getElementById("btn_throw");
    const btnJump = document.getElementById("btn_jump");

    btnLeft.addEventListener("touchstart", e => {
        e.preventDefault();
        keyboard.LEFT = true;
        lastMoved = new Date().getTime();
    });
    btnLeft.addEventListener("touchend", e => {
        e.preventDefault();
        keyboard.LEFT = false;
        lastMoved = new Date().getTime();
    });
    btnRight.addEventListener("touchstart", e => {
        e.preventDefault();
        keyboard.RIGHT = true;
        lastMoved = new Date().getTime();
    });
    btnRight.addEventListener("touchend", e => {
        e.preventDefault();
        keyboard.RIGHT = false;
        lastMoved = new Date().getTime();
    });
    btnThrow.addEventListener("touchstart", e => {
        e.preventDefault();
        keyboard.D = true;
        lastMoved = new Date().getTime();
    });
    btnThrow.addEventListener("touchend", e => {
        e.preventDefault();
        keyboard.D = false;
        lastMoved = new Date().getTime();
    });
    btnJump.addEventListener("touchstart", e => {
        e.preventDefault();
        keyboard.SPACE = true;
        lastMoved = new Date().getTime();
    });
    btnJump.addEventListener("touchend", e => {
        e.preventDefault();
        keyboard.SPACE = false;
        lastMoved = new Date().getTime();
    });
}
