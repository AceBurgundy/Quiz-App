import runGame from "../gameEngine.js";
import {
    IndexStatus
} from "../globalContext.js";
import makeToast from "../toast.js";

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

export default function addScrambleLetters(wordObject) {
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
                            makeToast("Current word is the same as the added word!");
                            IndexStatus.incrementIndex();
                            
                            if (IndexStatus.isBound() === false) {
                                setTimeout(() => {
                                    runGame();
                                }, 1000);
                            } else {
                                makeToast("Render Congratulations!")
                            }
                        } else {
                            makeToast("Wrong word");
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
                            makeToast("Current word is the same as the added word!");
                            IndexStatus.incrementIndex();
                            
                            if (IndexStatus.isBound() === false) {
                                setTimeout(() => {
                                    runGame();
                                }, 1000);
                            } else {
                                makeToast("Render Congratulations!")
                            }
                        } else {
                            makeToast("Wrong word");
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