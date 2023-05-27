const gamePanelText = document.getElementById("game-panel__text-container")

export default function addLetterContainers(currentWord) {

    for (let index = 0; index < currentWord.word.length; index++) {
        const letterBox = document.createElement("button")
        letterBox.className = "game-panel__text"
        gamePanelText.appendChild(letterBox)
    }

}