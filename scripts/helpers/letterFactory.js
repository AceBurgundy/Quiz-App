import toggleHints from "./toggleHints.js";
import showPassedPanel from "./showPassedPanel.js";
import allowAddLetter from "./allowAddLetter.js";
import clearGamePanelTextContainer from "./clearGamePanelTextContainer.js";

import {
    IndexStatus
} from "../globalContext.js";
import isCurrentWordSameAsAddedWord from "./ifWordsMatch.js";

let count = 0

export default function addScrambleLetters(wordObject, quizHints) {

    const hintContainer = document.getElementById("game-panel__hints");
    const scrambleLetters = document.getElementById("game-panel__scramble-letters");
    const gamePanelTextDivs = document.getElementById("game-panel__text-container").children;
    let currentHint = "";
    let hints = quizHints;
    let currentWord = wordObject.word.toLowerCase();
    let addedWord = [];

    const shuffledString = currentWord.split("").sort(() => Math.random() - 0.5).join("");

    function handleKeyUp(event) {
        
        const letter = event.key;
        count++
        
        if (count === 2) {
            count = 0
            return
        }

        for (const gameText of gamePanelTextDivs) {
            if (gameText.textContent === "") {
                if (allowAddLetter(currentWord, letter, addedWord)) {
                    gameText.textContent = letter;
                    addedWord.push(letter);
                    playSound("click")

                    if (addedWord.length === currentWord.length) {
                        if (isCurrentWordSameAsAddedWord(currentWord, addedWord)) {
                            IndexStatus.incrementScore();
                            showPassedPanel();
                            IndexStatus.saveData()
                        } else {
                            playSound("wrong")
                            hints && toggleHints(hints, currentHint, hintContainer)
                            clearGamePanelTextContainer(gamePanelTextDivs);
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
        for (const gameText of gamePanelTextDivs) {
            if (gameText.textContent === "") {
                if (allowAddLetter(currentWord, letter, addedWord)) {
                    gameText.textContent = letter;
                    addedWord.push(letter);
                    playSound("click")

                    if (addedWord.length === currentWord.length) {
                        if (isCurrentWordSameAsAddedWord(currentWord, addedWord)) {
                            IndexStatus.incrementScore();
                            showPassedPanel();
                            IndexStatus.saveData()
                        } else {
                            playSound("wrong")
                            hints && toggleHints(hints, currentHint, hintContainer)
                            clearGamePanelTextContainer(gamePanelTextDivs);
                            addedWord.length = 0;
                        }
                    }
                    break;
                }
            }
        }
    }
}