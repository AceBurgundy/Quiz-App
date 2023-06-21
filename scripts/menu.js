import Global from "./global.js";
import Game from "./helpers/events.js";
import redirect from "./helpers/redirect.js";

const element = (element) => document.querySelector(element);

window.onload = () => { 
  element("#menu-panel").style.transform = "translateY(0%)"
}

const settingsCover = document.getElementById("background-cover");

const playerName = Global.getPlayerName();

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
const settingsContainer = element("#settings-container").children;

function handleOrientationChange() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        const fitText = (element, value) => window.fitText(element, value);

        fitText(element("#menu-panel__game-title-description"), 2.5);
        fitText(element("#menu-panel__buttons-start"), 0.7);
        [...menuButtonsContainer].forEach((child) => fitText(child, 1.1));
        [...settingsContainer].forEach((child) => fitText(child, 0.9));
        fitText(element("#menu-panel__score-data"), 2.5);
    } else {
        [...menuButtonsContainer].forEach((child) => fitText(child, 0.9));
        [...settingsContainer].forEach((child) => fitText(child, 0.9));
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

//resets data
Game.click("menu-panel__buttons-reset", () => {
    Global.resetData();
    settingsCover.classList.remove("active");
    redirect("menu-panel", "name.html");
});

// starts game
Game.click("menu-panel__buttons-start", () => {
    redirect("menu-panel", "game.html");
});

Game.click("x-icon", () => {
    settingsCover.classList.remove("active");
});

Game.click("menu-panel__buttons-settings", () => {
    settingsCover.classList.add("active");
});

Game.click("menu-panel__buttons-quit", () => {
    redirect("menu-panel", "../index.html");
});

const gameCover = document.getElementById("players-cover")
const playerContainer = document.getElementById("players")

Game.click("menu-panel__buttons-show-players", () => {
  gameCover.classList.add("active");

  fetch("http://127.0.0.1:5000/get_players", {
                method: "GET"
            })
			.then(response => response.json())
			.then(data => {

				if (data.status === "success") {
          data.players.forEach(data => {
            playerContainer.innerHTML += `
            <li class="player-item">
              <p class="player-name">Player: ${data.name}</p> 
              <p class="player-score">Score: ${data.score}</p>
            </li>`
          })
        }
			})
});

Game.click("player-x-icon", () => {
  gameCover.classList.remove("active");
  playerContainer.innerHTML = ""
});

Game.click("menu-panel__buttons-instructions", () => {
  document.getElementById("game-instructions-box").classList.add("show")
})

Game.click("panel-x-icon", () => {
  document.getElementById("game-instructions-box").classList.add("hide")
})
