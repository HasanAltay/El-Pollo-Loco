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

// to mute the browser tab. doesnt work right now!
let audioContext = null;
let gainNode = null;
let audioEnabled = true;

function toggleAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
  }

  if (audioEnabled) {
    gainNode.gain.value = 0;
    audioEnabled = false;
  } else {
    gainNode.gain.value = 1;
    audioEnabled = true;
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
    document.getElementById('game_over').style.display = 'none';
    document.getElementById('you_lost').style.display = 'none';
    document.getElementById('btn_play_game').style.display = 'none';
    document.getElementById('btn_play_again').style.display = 'none';
    document.getElementById('canvas').style.backgroundImage = 'unset';
}


function init() {
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
}