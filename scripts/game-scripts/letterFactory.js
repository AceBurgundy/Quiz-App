import toggleHints from "./toggleHints.js";
import toggleAchievedPanel from "./toggleAchievedPanel.js";
import validateLetter from "./letterValidation.js";
import clearTextContainers from "./clearTextContainers.js";
import Global from "../global.js";

let letter = 0;

export default function addScrambledLetters(wordObject, quizHints) {
    const hintContainer = document.getElementById("game-panel__hints");
    const scrambleLetters = document.getElementById("game-panel__scramble-letters");
    const gamePanelTextDivs = document.getElementById("game-panel__text-container").children;
    let currentHint = "";
    let hints = quizHints;
    let currentWord = wordObject.word.toLowerCase();
    let addedWord = [];

    const shuffledString = currentWord.split("").sort(() => Math.random() - 0.5).join("");

    function handleKeyUp(event) {
        letter = event.key.toLowerCase();
        for (const gameText of gamePanelTextDivs) {
            if (gameText.textContent === "") {
                if (validateLetter(currentWord, letter, addedWord)) {
                    gameText.textContent = letter;
                    addedWord.push(letter);
                    playSound("click");

                    if (addedWord.length === currentWord.length) {
                        if (currentWord === addedWord.join("")) {
                            Global.incrementScore();
                            toggleAchievedPanel();
                            Global.saveData();
                        } else {
                            playSound("wrong");
                            hints && toggleHints(hints, currentHint, hintContainer);
                            clearTextContainers(gamePanelTextDivs);
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
            playSound("click");
            addLetter(letter, letterBox);
            disableKeyUp(); // Disable the keyup event listener after a letter is clicked
        });
    }

    enableKeyUp(); // Enable the keyup event listener initially

    function addLetter(letter, element) {
        for (const gameText of gamePanelTextDivs) {
            if (gameText.textContent === "") {
                if (validateLetter(currentWord, letter, addedWord)) {
                    gameText.textContent = letter;
                    addedWord.push(letter);
                    element.classList.add("active")

                    if (addedWord.length === currentWord.length) {
                        if (currentWord === addedWord.join("")) {
                            Global.incrementScore();
                            toggleAchievedPanel();
                            Global.saveData();
                        } else {
                            playSound("wrong");
                            hints && toggleHints(hints, currentHint, hintContainer);
                            clearTextContainers(gamePanelTextDivs);
                            addedWord.length = 0;
                        }
                    }
                    break;
                }
            }
        }
    }
}