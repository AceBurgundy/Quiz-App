import makeToast from "./scripts/toast.js";
import runGame from "./scripts/gameEngine.js";
import { IndexStatus } from "./scripts/globalContext.js";

let playerName = ""

document.getElementById("submit-name").addEventListener("click", () => {
    const nameInput = document.getElementById("name-input")
    if (nameInput.value != "") {
        IndexStatus.setPlayerName(nameInput.value)
        document.getElementById("name-prompt").style.height = "0vh"
        document.getElementById("game-panel").style.height = "100vh"
        IndexStatus.resetIndex()
        runGame()
        makeToast("Name added!");
    } else {
        makeToast("Name is required!");
    }
})

document.getElementById("game-panel__navigation-skip-div").addEventListener("click", () => {
    if (IndexStatus.isAllowed()) {
        IndexStatus.incrementIndex()
        runGame()    
    } else {
        makeToast("Last Word")
    }
})

const startButton = document.getElementById("menu-panel__buttons-start")

startButton.addEventListener("click", () => {
    document.getElementById("name-prompt").style.height = "100vh"
    document.getElementById("menu-panel").style.height = "0vh"
})