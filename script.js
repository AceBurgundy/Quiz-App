import makeToast from "./scripts/toast.js";
import runGame from "./scripts/gameEngine.js";
import { IndexStatus } from "./scripts/globalContext.js";

let playerName = ""

// document.getElementById("submit-name").addEventListener("click", () => {
//     const nameInput = document.getElementById("name-input")
//     if (nameInput.value != "") {
//         playerName = nameInput.value;
//         document.getElementById("name-prompt").style.top = "100%"
//         makeToast("Name added!");
//     } else {
//         makeToast("Name is required!");
//     }
// })

runGame()

document.getElementById("game-panel__navigation-skip-div").addEventListener("click", () => {
    IndexStatus.incrementIndex()
    runGame()
})
