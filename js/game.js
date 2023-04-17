let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen = false;
let lastMoved;
let touchStartTime = 0;
const doubleTouchThreshold = 500; // in milliseconds

window.addEventListener("load", function () {
    const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        let action = document.getElementById("actions");
        let walk = document.getElementById("walk");
        action.style.visibility = "visible";
        walk.style.visibility = "visible";
        touchButtons();
    }
});

function isTouchDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile =
        /iphone|ipod|ipad|android|blackberry|webos|windows phone|iemobile|opera mini/i.test(
            userAgent
        );
    const isTablet = /ipad|android|windows (?!phone)/i.test(userAgent);
    return isMobile || isTablet;
}

function screenSize() {
    if (fullscreen) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        fullscreen = false;
        hideElementsOnFullscreen();
    } else {
        let element = document.getElementById("fullscreen");
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        fullscreen = true;
        showElementsOnFullscreen();
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

function showElementsOnFullscreen() {
    document.getElementById('settings_fullscreen').style.visibility = 'visible';
}

function hideElementsOnFullscreen() {
    document.getElementById('settings_fullscreen').style.visibility = 'hidden';
}

function closeHowToPlay() {
    document.getElementById('how_to_play').style.visibility = "hidden";
}

function showHowToPlay() {
    document.getElementById('how_to_play').style.visibility = "visible";
}

function playAgain() {
    event.preventDefault();
    clearAllInterval();
    clearScreen();
    init();
    resetAudio();
}

function playGame() {
    event.preventDefault();
    // clearAllInterval();
    clearScreen();
    init();
    resetAudio();
}

function resetAudio() {
    world.music.currentTime = 0;
    world.endboss_ambience_sound.currentTime = 0;
    world.ambience_lvl1.pause();
    world.ambience_lvl1.currentTime = 0;
    world.success_audio.pause();
    world.success_audio.currentTime = 0;
}

function toggleAudio() {
    const img1 = document.getElementById("audio_icon1");
    const img2 = document.getElementById("audio_icon2");
    try {
        if (world.AUDIO_MUTE) {
            world.unmuteAllAudio();
            world.AUDIO_MUTE = false;
            img1.src = "./img/11_html_img/mute.png";
            img2.src = "./img/11_html_img/mute.png";
        } else if (world.AUDIO_MUTE == false) {
            world.muteAllAudio();
            world.AUDIO_MUTE = true;
            img1.src = "./img/11_html_img/unmute.png";
            img2.src = "./img/11_html_img/unmute.png";
        }
    } catch (error) {
        if (error.name === 'NotAllowedError' || error.name === 'NotSupportedError') {
            console.log('Error: ' + error.name + ': ' + error.message);
        } else {
            console.log(error);
        }
    }
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

    const audio_icon1 = document.getElementById("audio_icon1");
    const audio_icon2 = document.getElementById("audio_icon2");
    const fullscreen_icon1= document.getElementById("fullscreen_icon1");
    const fullscreen_icon2 = document.getElementById("fullscreen_icon2");
    const how_to_play_btn1 = document.getElementById("how_to_play_btn1");

    audio_icon2.addEventListener("click", toggleAudio);
    audio_icon2.addEventListener("touchstart", toggleAudio);

    fullscreen_icon1.addEventListener("click", screenSize);
    fullscreen_icon1.addEventListener("touchstart", screenSize);

    fullscreen_icon2.addEventListener("click", screenSize);
    fullscreen_icon2.addEventListener("touchstart", screenSize);

    how_to_play_btn1.addEventListener("click", showHowToPlay);
    how_to_play_btn1.addEventListener("touchstart", showHowToPlay);

    audio_icon1.addEventListener("click", toggleAudio);
    audio_icon1.addEventListener("touchstart", toggleAudio);

    let lastTouched = 0;
    let timeout;

    function handleDoubleTap() {
        clearTimeout(timeout);
        lastTouched = 0;
        screenSize();
    }

    function handleSingleTap() {
        timeout = setTimeout(() => {
            lastTouched = 0;
        }, 250);
    }

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

    const now = new Date().getTime();
    if (now - lastTouched < 250) {
        handleDoubleTap();
    } else {
        handleSingleTap();
    }
    lastTouched = now;
}