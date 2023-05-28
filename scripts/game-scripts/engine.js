import Global from "../global.js";
import addLetterContainers from "./letterContainer.js";
import addScrambledLetters from "./letterFactory.js";

export default function runGame() {
      
    // containers
    const gamePanelText = document.getElementById("game-panel__text-container");
    const scrambleLetters = document.getElementById("game-panel__scramble-letters");
  
    let quizData = [];
  
    async function fetchData() {
      try {
            const response = await fetch("../quiz.json");
            const jsonData = await response.json();

            quizData = jsonData.quiz;
            Global.setLimit(quizData.length);
            
            const currentWord = quizData[Global.getCurrentIndex()]

            const word = currentWord;
            const hints = [...currentWord.hints];

            document.getElementById("definition-panel").textContent = currentWord.definition

            gamePanelText.innerHTML = "";
            scrambleLetters.innerHTML = "";

            addLetterContainers(word);
            addScrambledLetters(word, hints);
        } catch (error) {
            console.error("Error fetching JSON data:", error);
        }
    }

    fetchData();
}
  