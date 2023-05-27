import Global from "./global.js";
import Game from "./helpers/events.js";
import redirect from "./helpers/redirect.js";

document.getElementById("menu-panel").style.height = "100vh"

//resets data
Game.click("menu-panel__buttons-reset", () => {
    Global.resetData();
    redirect("menu-panel", "name.html");
});

// starts game
Game.click("menu-panel__buttons-start", () => {
    redirect("menu-panel", "game.html");
});

const playerName = Global.getPlayerName()
const getElement = (id) => document.getElementById(id);

// menu panel
const menuGameTitle = getElement("menu-panel__game-title");
const menuGameDescription = getElement("menu-panel__game-title-description");
const menuButton = getElement("menu-panel__buttons-start");
const resetButton = getElement("menu-panel__buttons-reset");
const menuPanelTitle = getElement("menu-panel__title");
const menuScoreContainer = getElement("menu-panel__score-data");
const menuScore = getElement("menu-panel__score");
const menuScoreLimit = getElement("menu-panel__score-limit");
const lastStopped = getElement("menu-panel__last-stopped");
const firstTimePlaying = Global.getCurrentIndex() === 0;

const setText = (element, text) => {
    element.textContent = text;
    return element;
};

const setDisplay = (element, display) => {
    element.style.display = display;
    return element;
};

if (firstTimePlaying) {
    setText(menuPanelTitle, `Welcome ${playerName}`);
    setText(menuButton, "Start");
} else {
    setText(menuPanelTitle, `Welcome back ${playerName}`);
    setText(menuScore, Global.getScore());
    setText(menuScoreLimit, Global.getLimit());
    setText(menuButton, "Continue");
    setText(lastStopped, `Last stopped at number ${Global.getCurrentIndex() - 1}`);
    setDisplay(menuScoreContainer, "block");
    setDisplay(lastStopped, "block");
}

function handleOrientationChange() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        const fitText = (element, value) => window.fitText(element, value);

        fitText(menuGameTitle, 0.4);
        fitText(menuGameDescription, 2.5);
        fitText(menuButton, 2);
        fitText(resetButton, 2);
        fitText(menuPanelTitle, 1.5);
        fitText(menuScoreContainer, 2);
        fitText(lastStopped, 2);
    }
}

// Initial check on page load
handleOrientationChange();

// Listen for orientation change events
window.addEventListener("orientationchange", handleOrientationChange);
