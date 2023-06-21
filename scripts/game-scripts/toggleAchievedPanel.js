import Global from "../global.js";
import runGame from "./engine.js";
import Game from "../helpers/events.js";
import makeToast from "../helpers/toast.js";
import redirect from "../helpers/redirect.js";

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

    if (Global.getScore() == Global.getLimit() || congratulations) {

        const won = Global.getScore() === Global.getLimit()
        const score = won ? "win" : "lose"
        playSound(score)

        panelText.textContent = won ? `Congratulations!` : "Better Luck Next Time";
        stopButton.textContent = "Menu";
        nextButton.style.display = "none"
        scorePlaceholder.textContent = `Score: ${Global.getScore()}/${Global.getLimit()}`;

        stopButton.onclick = function() {

            fetch("https://quizeme.pythonanywhere.com/update_score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: Global.getPlayerName(), score: Global.getScore() }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    redirect("game-panel", "menu.html")
                    makeToast(data.message);
                } else {
                    makeToast(data.message);
                }
            })

            scorePlaceholder.textContent = ""
            panelText.textContent = ""
            panel.classList.remove("active");
            panelBackground.classList.remove("active")            
            nextButton.style.display = "block"
        };

        return;

    } else {

        playSound("wordCorrect")
        panelText.textContent = "You got it right!";
        stopButton.textContent = "End";
        nextButton.textContent = "Next";

        stopButton.onclick = function() {
            Global.setCurrentIndex(Global.getScore())
            Global.saveData()
            showPassedPanel(true);

            fetch("https://quizeme.pythonanywhere.com/update_score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: Global.getPlayerName(), score: Global.getScore() }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    makeToast(data.message);
                    redirect("game-panel", "menu.html")
                } else {
                    makeToast(data.message);
                }
            })
        };

        nextButton.onclick = function(event) {

            event.preventDefault()

            fetch("https://quizeme.pythonanywhere.com/update_score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: Global.getPlayerName(), score: Global.getScore() }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    makeToast(data.message);
                } else {
                    makeToast(data.message);
                }
            })
            panel.classList.remove("active");
            panelBackground.classList.remove("active")
            runGame();
        };
        return;
    }
}

Game.click("menu-prompt__yes", () => {
    Global.setCurrentIndex(Global.getScore())
    Global.saveData()

    fetch("https://quizeme.pythonanywhere.com/update_score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: Global.getPlayerName(), score: Global.getScore() }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            redirect("game-panel", "menu.html")
            makeToast(data.message);
        } else {
            makeToast(data.message);
        }
    })

})
