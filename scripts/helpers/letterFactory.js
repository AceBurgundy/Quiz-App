import runGame from "../gameEngine.js";
import {
    IndexStatus
} from "../globalContext.js";
import makeToast from "../toast.js";

let currentHint = ""
let hints = []
const hintContainer = document.getElementById("game-panel__hints")

function toggleHints() {

    let hint = hints[Math.floor(Math.random() * hints.length)]

    while (hint === currentHint) {
        hint = hints[Math.floor(Math.random() * hints.length)]
    }

    currentHint = hint

    hintContainer.innerHTML = hint
    hintContainer.classList.add("active")

    setTimeout(() => {
        hintContainer.classList.remove("active")
    }, 2500);
}

function showPassedPanel(congratulations = false) {
    
    const panel = document.getElementById("achieved-panel")
    const panelText = document.getElementById("achieved-panel__text")
    const stopButton = document.getElementById("achieved-panel__buttons-stop")
    const nextButton = document.getElementById("achieved-panel__buttons-next")
    
    IndexStatus.incrementIndex()
    panel.classList.add("active")

    if (IndexStatus.isBound() === true || congratulations) {
        panelText.textContent = "Congratulations!"
        stopButton.textContent = "Menu"
        nextButton.textContent = "Save"
        document.getElementById("achieved-panel__text-score").textContent = `Score: ${IndexStatus.getScore()}`
        stopButton.onclick = function() {
            document.getElementById("game-panel").style.height = "0vh";
            document.getElementById("menu-panel").style.height = "100vh";
            panel.classList.remove("active")
        }
    
        nextButton.onclick = function() {
            makeToast("toggle save")
        }
        return

    } else {

        panelText.textContent = "You got it right!"
        stopButton.textContent = "Nahh"
        nextButton.textContent = "Next"

        stopButton.onclick = function() {
            panel.classList.remove("active")
            setTimeout(() => {
                showPassedPanel(congratulations = true)
            }, 250);
        }
    
        nextButton.onclick = function() {
            panel.classList.remove("active")
            runGame()
        }
        return
    }


}
const scrambleLetters = document.getElementById("game-panel__scramble-letters");
const gamePanelTextDivs = document.getElementById(
    "game-panel__text-container"
).children;

function allowPush(currentWord, letter, addedWord) {
    const countInCurrentWord = countOccurrences(currentWord, letter);
    const countInAddedWord = countOccurrences(addedWord.join(""), letter);

    return countInCurrentWord > countInAddedWord;
}

function countOccurrences(str, letter) {
    const occurrences = str.split("").filter((char) => char === letter);
    return occurrences.length;
}

function clearGamePanelTextContainer() {
    setTimeout(() => {
        [...gamePanelTextDivs].map((div) => (div.textContent = ""));
    }, 800);
}

function isCurrentWordSameAsAddedWord(currentWord, addedWord) {
    return currentWord === addedWord.join("");
}

export default function addScrambleLetters(wordObject, quizHints) {
    hints = quizHints
    let currentWord = wordObject.word;
    let addedWord = [];
    const shuffledString = currentWord
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

    function handleKeyUp(event) {

        const letter = event.key;

        for (let index = 0; index < gamePanelTextDivs.length; index++) {
            const gameText = gamePanelTextDivs[index];

            if (gameText.textContent === "") {
                if (allowPush(currentWord, letter, addedWord)) {
                    gameText.textContent = letter;
                    addedWord.push(letter);

                    if (addedWord.length === currentWord.length) {
                        if (isCurrentWordSameAsAddedWord(currentWord, addedWord)) {
                            IndexStatus.incrementScore()
                            showPassedPanel()
                        } else {
                            if (hints) {
                                toggleHints()
                            }
                            clearGamePanelTextContainer();
                            addedWord.length = 0;
                        }
                    }
                    break;
                }
            }
        }
    }

    function enableKeyUp() {
        document.addEventListener("keyup", handleKeyUp);
    }

    function disableKeyUp() {
        document.removeEventListener("keyup", handleKeyUp);
    }

    for (let index = 0; index < currentWord.length; index++) {
        const letter = shuffledString.charAt(index);

        const letterBox = document.createElement("button");
        letterBox.textContent = letter;
        letterBox.className = "game-panel__scramble-letters-letter";
        scrambleLetters.appendChild(letterBox);

        letterBox.addEventListener("click", () => {
            addLetter(letter);
            disableKeyUp(); // Disable the keyup event listener after a letter is clicked
        });
    }

    enableKeyUp(); // Enable the keyup event listener initially

    function addLetter(letter) {
        for (let index = 0; index < gamePanelTextDivs.length; index++) {
            const gameText = gamePanelTextDivs[index];

            if (gameText.textContent === "") {
                if (allowPush(currentWord, letter, addedWord)) {
                    gameText.textContent = letter;
                    addedWord.push(letter);

                    if (addedWord.length === currentWord.length) {
                        if (isCurrentWordSameAsAddedWord(currentWord, addedWord)) {
                            IndexStatus.incrementScore()
                            showPassedPanel()
                        } else {
                            if (hints) {
                                toggleHints()
                            }
                            clearGamePanelTextContainer();
                            addedWord.length = 0;
                        }
                    }
                    break;
                }
            }
        }
    }
}