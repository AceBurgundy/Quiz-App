import Global from "./global.js";
import Game from "./helpers/events.js";
import redirect from "./helpers/redirect.js";
import makeToast from "./helpers/toast.js";

const element = (element) => document.querySelector(element);

window.onload = () => {
    element("#menu-panel").style.transform = "translateY(0%)";
};

const playerName = Global.getPlayerName();
if (playerName == "" || playerName == undefined) {
    redirect("menu-panel", "name.html")
}

function menuPanelChild(props) {
    const { title, button, playerName, menuScore, menuScoreLimit } = props;

    const template = `
      <div id="menu-panel__top">
        <div id="menu-panel__name-container">
          <p id="menu-panel__name">${playerName}</p>
        </div>
        <div id="menu-panel__game-title-section">
          <p id="menu-panel__game-title">${title}</p>
          <p id="menu-panel__game-title-description">
            A Computer Science Scrambled Word Challenge
          </p>
          <p id="menu-panel__score-data">
            Score:
            <span id="menu-panel__score">${menuScore}</span>/<span id="menu-panel__score-limit">${menuScoreLimit}</span>
          </p>
        </div>
      </div>
      <div id="menu-panel__buttons-container">
        <button id="menu-panel__buttons-start" class="button-primary">${button}</button>
        <div id="menu-panel__buttons-instructions" class="button-primary">Instructions</div>
        <div id="menu-panel__buttons-show-players" class="button-primary">Leaderboards</div>
        <button id="menu-panel__buttons-settings" class="button-primary">Settings</button>
        <button id="menu-panel__buttons-quit" class="button-primary">Quit</button>
      </div>
    `;

    return template;
}

const firstTimePlaying = Global.getCurrentIndex() === 0;

const props = {
    title: "QuizMe",
    button: firstTimePlaying ? "Start" : "Continue",
    playerName: firstTimePlaying
        ? `Welcome ${playerName}`
        : `Welcome back ${playerName}`,
    menuScore: Global.getScore(),
    menuScoreLimit: Global.getLimit(),
    firstTimePlaying: Global.getCurrentIndex() === 0,
};

const menuPanelTemplate = menuPanelChild(props);
element("#menu-panel").innerHTML = menuPanelTemplate;

const title = element("#menu-panel__game-title");
fitText(title, 0.37);

const menuButtonsContainer = element("#menu-panel__buttons-container").children;
const settings = element("#settings").children;

function handleOrientationChange() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        const fitText = (element, value) => window.fitText(element, value);

        fitText(element("#menu-panel__game-title-description"), 2.5);
        fitText(element("#menu-panel__buttons-start"), 0.7);
        [...menuButtonsContainer].forEach((child) => fitText(child, 1.1));
        [...settings].forEach((child) => fitText(child, 0.9));
        fitText(element("#menu-panel__score-data"), 2.5);
    } else {
        [...menuButtonsContainer].forEach((child) => fitText(child, 0.9));
        [...settings].forEach((child) => fitText(child, 1.4));
    }
}

// Initial check on page load
handleOrientationChange();

// Listen for orientation change events
window.addEventListener("orientationchange", handleOrientationChange);

const scoreContainerChildren = element("#menu-panel__score-data");

Global.getScore() === 0
    ? (scoreContainerChildren.style.display = "none")
    : (scoreContainerChildren.style.display = "block");

const backgroundPanel = document.getElementById("background-panel");
Game.click("x-icon", () => {
    backgroundPanel.classList.remove("active");
    element(element("#x-icon").getAttribute("data-clip")).classList.remove(
        "show"
    );
    element("#x-icon").setAttribute("data-clip", "");
});

//resets data
Game.click("menu-panel__buttons-reset", () => {

    if (!navigator.onLine) {
        makeToast("No internet connection")
        return
    }

    Global.resetData();
    backgroundPanel.classList.remove("active");
    redirect("menu-panel", "name.html");
});

// starts game
Game.click("menu-panel__buttons-start", () => {
    redirect("menu-panel", "game.html");
});

Game.click("menu-panel__buttons-settings", () => {
    backgroundPanel.classList.add("active");
    backgroundPanel.firstElementChild.setAttribute("data-clip", "#settings");
    element("#settings").classList.add("show");
});

Game.click("menu-panel__buttons-quit", () => {
    redirect("menu-panel", "../index.html");
});

const playerContainer = document.getElementById("players");

Game.click("menu-panel__buttons-show-players", () => {

    if (!navigator.onLine) {
        makeToast("No internet connection")
        return
    }

    backgroundPanel.classList.add("active");
    backgroundPanel.firstElementChild.setAttribute("data-clip", "#players");

    element("#players").classList.add("show");

    playerContainer.innerHTML += `<p>Loading Players</p>`;
    fetch("https://quizeme.pythonanywhere.com/get_players", {
        method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.status === "success") {
            playerContainer.innerHTML = ``;
            data.players.forEach((data) => {
                playerContainer.innerHTML += `
                  <div class="player-item">
                    <p class="player-name">Player: ${data.name}</p> 
                    <p class="player-score">Score: ${data.score}</p>
                  </div><br>`;
            });
        } else {
            playerContainer.innerHTML = `<p>${data.message}</p>`;
        }
    })
    .catch((error) => {
        playerContainer.innerHTML = `<p class="error-message">Failed to connect to the server.</p>`;
    });
});

Game.click("menu-panel__buttons-clear", () => {
    
    if (!navigator.onLine) {
        makeToast("No internet connection")
        return
    }

    element("#extra-background-panel").classList.add("active");
    element("#delete-players-form").classList.add("show");
});

Game.click("form-close-icon", () => {
    element("#extra-background-panel").classList.remove("active");
    element("#delete-players-form").classList.remove("show");
});

Game.click("delete-players-form__submit", () => {

	const password = element("#password")

	if (password.value.trim() === "") {
        makeToast("Password is needed")
        return
    }
    
	fetch("https://quizeme.pythonanywhere.com/delete_players", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password.value }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.status === "success") {
            makeToast(data.message)
        } else {
            makeToast(data.message);
        }
    });
    Global.resetData()
    redirect("menu-panel", "name.html")
});

Game.click("menu-panel__buttons-instructions", () => {
    backgroundPanel.classList.add("active");
    element("#game-instructions").classList.add("show");
    backgroundPanel.firstElementChild.setAttribute(
        "data-clip",
        "#game-instructions"
    );
});
