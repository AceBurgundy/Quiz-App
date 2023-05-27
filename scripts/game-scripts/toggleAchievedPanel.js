import Global from "../global.js";
import runGame from "./engine.js";
import redirect from "../helpers/redirect.js"

export default function showPassedPanel(congratulations = false) {

    const panelBackground = document.getElementById("background-cover");
    const panel = document.getElementById("achieved-panel");
    const panelText = document.getElementById("achieved-panel__text");
    const stopButton = document.getElementById("achieved-panel__buttons-stop");
    const nextButton = document.getElementById("achieved-panel__buttons-next");
    const scorePlaceholder = document.getElementById("achieved-panel__text-score")
    
    Global.incrementIndex();
    panel.classList.add("active");
    panelBackground.classList.add("active")
    Global.saveData()

    if (Global.isBound() || congratulations) {

        const won = Global.getScore() === Global.getLimit()
        const score = won ? "win" : "lose"
        playSound(score)

        panelText.textContent = won ? `Congratulations! ${playerName}` : "Better Luck Next Time";
        stopButton.textContent = "Menu";
        nextButton.textContent = "Save";
        scorePlaceholder.textContent = `Score: ${Global.getScore()}/${Global.getLimit()}`;

        stopButton.onclick = function() {
            scorePlaceholder.textContent = ""
            panelText.textContent = ""
            panel.classList.remove("active");
            panelBackground.classList.remove("active")
            redirect("game-panel", "menu.html")
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
            Global.setCurrentIndex(Global.getScore())
            Global.saveData()
            showPassedPanel(true);
        };

        nextButton.onclick = function() {
            panel.classList.remove("active");
            panelBackground.classList.remove("active")
            runGame();
        };
        return;
    }
}
