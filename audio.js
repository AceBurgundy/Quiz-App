const context = new (window.AudioContext || window.webkitAudioContext)();

let audioFiles = {};
let sound = ["click", "wrong", "win", "lose", "wordCorrect"];

function loadAudio(file) {
    return fetch(`../assets/audio/${file}.mp3`)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
        .then(decodedAudio => {
            audioFiles[file] = decodedAudio;
        });
}

function loadAllAudio() {
    const promises = sound.map(file => loadAudio(file));
    return Promise.all(promises);
}

function playSound(color) {
    const play = context.createBufferSource();
    play.buffer = audioFiles[color];
    const volume = context.createGain();
    volume.gain.value = 0.6; // Set the volume to 70% (0.7)
    play.connect(volume);
    volume.connect(context.destination);
    play.start(0);
}

// Load all audio files
loadAllAudio().then(() => {
    // Audio files are loaded, you can now call playSound() function
    playSound("click");
});
