import Global from "./global.js";
import Game from "./helpers/events.js";
import redirect from "./helpers/redirect.js";

document.getElementById("menu-panel").style.height = "100vh";
const settingsCover = document.getElementById("background-cover")

const patternBackground = document.getElementById("pattern-background")

for (let index = 0; index <= 20; index++) {
    const cube = document.createElement("div")
    cube.className = "cube"
    cube.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26))
    patternBackground.appendChild(cube)
}

//resets data
Game.click("menu-panel__buttons-reset", () => {
    Global.resetData();
    redirect("menu-panel", "name.html");
});

// starts game
Game.click("menu-panel__buttons-start", () => {
    redirect("menu-panel", "game.html");
});

Game.click("x-icon", () => {
    settingsCover.classList.remove("active")
})

Game.click("menu-panel__buttons-settings", () => {
    settingsCover.classList.add("active")
})

Game.click("menu-panel__buttons-quit", () => {
    redirect("menu-panel", "../index.html");
})

const playerName = Global.getPlayerName();
const getElement = (id) => document.getElementById(id);

// menu panel
const menuTitle = getElement("menu-panel__game-title")
const menuGameDescription = getElement("menu-panel__game-title-description");
const menuButton = getElement("menu-panel__buttons-start");
const menuPanelTitle = getElement("menu-panel__name");
const menuScoreContainer = getElement("menu-panel__score-data");
const menuScore = getElement("menu-panel__score");
const menuScoreLimit = getElement("menu-panel__score-limit");
const firstTimePlaying = Global.getCurrentIndex() === 0;
const menuButtonsContainer = getElement("menu-panel__buttons-container")
const settingsContainer = getElement("settings-container")

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
    if (menuScore && menuScoreLimit) {
        setText(menuScore, Global.getScore());
        setText(menuScoreLimit, Global.getLimit());
    }
    setText(menuButton, "Continue");
    setDisplay(menuScoreContainer, "block");
}

fitText(menuTitle, 0.37)

function handleOrientationChange() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        const fitText = (element, value) => window.fitText(element, value);

        fitText(menuGameDescription, 2.5);
        fitText(menuButton, 0.7);
        [...menuButtonsContainer.children].forEach(child => fitText(child, 0.9)),
        [...settingsContainer.children].forEach(child => fitText(child, 0.9))
        fitText(menuPanelTitle, 1.5);
        fitText(menuScoreContainer, 2.5);
    } else {
        [...menuButtonsContainer.children].forEach(child => fitText(child, 0.5)),
        [...settingsContainer.children].forEach(child => fitText(child, 0.9))
    }
}

// Initial check on page load
handleOrientationChange();

// Listen for orientation change events
window.addEventListener("orientationchange", handleOrientationChange);
