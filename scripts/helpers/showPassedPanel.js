import runGame from "../gameEngine.js";
import makeToast from "../toast.js";
import { IndexStatus } from "../globalContext.js";

export default function showPassedPanel(congratulations = false) {
    const panel = document.getElementById("achieved-panel");
    const panelText = document.getElementById("achieved-panel__text");
    const stopButton = document.getElementById("achieved-panel__buttons-stop");
    const nextButton = document.getElementById("achieved-panel__buttons-next");
    const scorePlaceholder = document.getElementById("achieved-panel__text-score")

    IndexStatus.incrementIndex();
    panel.classList.add("active");

    if (IndexStatus.isBound() || congratulations) {
        panelText.textContent = "Congratulations!";
        stopButton.textContent = "Menu";
        nextButton.textContent = "Save";
        scorePlaceholder.textContent = `Score: ${IndexStatus.getScore()}`;
        
        stopButton.onclick = function() {
            document.getElementById("game-panel").style.height = "0vh";
            document.getElementById("menu-panel").style.height = "100vh";
            scorePlaceholder.textContent = ""
            panelText.textContent = ""
            panel.classList.remove("active");
        };

        nextButton.onclick = function() {
            makeToast("toggle save");
        };

        return;
    } else {
        panelText.textContent = "You got it right!";
        stopButton.textContent = "Nahh";
        nextButton.textContent = "Next";

        stopButton.onclick = function() {
            panel.classList.remove("active");
            setTimeout(() => {
                showPassedPanel(true);
            }, 250);
        };

        nextButton.onclick = function() {
            panel.classList.remove("active");
            runGame();
        };

        return;
    }
}
