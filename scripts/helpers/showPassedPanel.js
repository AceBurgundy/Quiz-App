import runGame from "../gameEngine.js";
import makeToast from "../toast.js";
import { IndexStatus } from "../globalContext.js";
import { redirect } from "./redirect.js";

export default function showPassedPanel(congratulations = false) {
    const panelBackground = document.getElementById("background-cover");
    const panel = document.getElementById("achieved-panel");
    const panelText = document.getElementById("achieved-panel__text");
    const stopButton = document.getElementById("achieved-panel__buttons-stop");
    const nextButton = document.getElementById("achieved-panel__buttons-next");
    const scorePlaceholder = document.getElementById("achieved-panel__text-score")
    
    IndexStatus.incrementIndex();
    panel.classList.add("active");
    panelBackground.classList.add("active")
    IndexStatus.saveData()
    updateMenu()

    if (IndexStatus.isBound() || congratulations) {

        const won = IndexStatus.getScore() === IndexStatus.getLimit()
        const score = won ? "win" : "lose"
        playSound(score)

        panelText.textContent = won ? `Congratulations! ${playerName}` : "Better Luck Next Time";
        stopButton.textContent = "Menu";
        nextButton.textContent = "Save";
        scorePlaceholder.textContent = `Score: ${IndexStatus.getScore()}/${IndexStatus.getLimit()}`;

        stopButton.onclick = function() {
            redirect("game-panel", "menu-panel")
            scorePlaceholder.textContent = ""
            panelText.textContent = ""
            panel.classList.remove("active");
            panelBackground.classList.remove("active")
        };

        nextButton.onclick = function() {
            makeToast("toggle save");
        };

        return;

    } else {

        playSound("wordCorrect")
        panelText.textContent = "You got it right!";
        stopButton.textContent = "Nahh";
        nextButton.textContent = "Next";

        stopButton.onclick = function() {
            IndexStatus.saveData()
            panel.classList.remove("active");
            panelBackground.classList.remove("active")
            setTimeout(() => {
                showPassedPanel(true);
            }, 250);
        };

        nextButton.onclick = function() {
            panel.classList.remove("active");
            panelBackground.classList.remove("active")
            runGame();
        };
        return;
    }
}

function updateMenu() {
    const playerName = document.getElementById("player-name").value
    const menuPanelTitle = document.getElementById("menu-panel__title");
    const menuPanelPlayButton = document.getElementById("menu-panel__buttons-start");
    const menuScoreContainer = document.getElementById("menu-panel__score-data");
    const menuScore = document.getElementById("menu-panel__score");
    const menuScoreLimit = document.getElementById("menu-panel__score-limit");
    const lastStopped = document.getElementById("menu-panel__last-stopped");
    const firstTimePlaying = IndexStatus.getCurrentIndex() === 0;

    console.log(`current index ${IndexStatus.getCurrentIndex()}`);
    menuPanelTitle.textContent = "";
    menuPanelPlayButton.textContent = "";

    if (!firstTimePlaying) {
        menuScore.textContent = "";
        menuScoreLimit.textContent = "";
        lastStopped.textContent = "";
        menuPanelTitle.textContent = `Welcome back ${playerName}`;
        menuPanelPlayButton.textContent = firstTimePlaying ? "Start" : "Continue";
        menuScore.textContent = IndexStatus.getScore();
        menuScoreLimit.textContent = IndexStatus.getLimit();
        lastStopped.textContent = `Last stopped at number ${IndexStatus.getCurrentIndex() - 1}`;
        menuScoreContainer.style.display = "block";
        lastStopped.style.display = "block";
    } else {
        menuPanelTitle.textContent = `Welcome ${playerName}`
        menuScoreContainer.style.display = "none";
        lastStopped.style.display = "none";
        menuPanelTitle.textContent = `Welcome ${playerName}`;
        menuPanelPlayButton.textContent = "Start";
    }
}
