const context = new AudioContext()
let audioFiles = {}
let sound = ["click", "wrong", "win", "lose", "wordCorrect"]

for (let index = 0; index < sound.length; index++) {
  
    fetch(`./assets/audio/${sound[index]}.mp3`)
        .then(data => data.arrayBuffer())
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
        .then(decodedAudio => {
            audioFiles[sound[index]] = decodedAudio
        })

}

function playSound(color) {
    const play = context.createBufferSource()
    play.buffer = audioFiles[color]
    play.connect(context.destination)
    play.start(context.currentTime)
}