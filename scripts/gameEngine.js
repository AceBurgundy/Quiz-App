import addLetterContainers from "./helpers/letterContainer.js";
import addScrambleLetters from "./helpers/letterFactory.js";
import { IndexStatus } from "./globalContext.js"

export default function runGame() {
    const hints = document.getElementById("game-panel__hints");
  
    if (IndexStatus.getCurrentIndex() === IndexStatus.getLimit()) {
        // showWinner screen
    }
    
    // containers
    const gamePanelText = document.getElementById("game-panel__text-container");
    const scrambleLetters = document.getElementById("game-panel__scramble-letters");
  
    let quizData = [];
  
    function fetchData() {
      return fetch("./quiz.json")
        .then((response) => response.json())
        .then((jsonData) => {
            
            quizData = jsonData.quiz;
            IndexStatus.setLimit(quizData.length)
            const word = quizData[IndexStatus.getCurrentIndex()];

            gamePanelText.innerHTML = ""
            scrambleLetters.innerHTML = ""

            addLetterContainers(word);
            addScrambleLetters(word);
            })
        .catch((error) => {
            console.error("Error fetching JSON data:", error);
        });
    }
    fetchData();
}
  