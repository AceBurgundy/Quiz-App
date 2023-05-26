import makeToast from "./scripts/toast.js";
import runGame from "./scripts/gameEngine.js";
import { IndexStatus } from "./scripts/globalContext.js";
import { redirect } from "./scripts/helpers/redirect.js";

// Call the initialize() function during game initialization
IndexStatus.initialize();
// IndexStatus.resetData()
let playerName = IndexStatus.getPlayerName()

// name prompt
document.getElementById("name-panel__submit-name").addEventListener("click", () => {
    const nameInput = document.getElementById("name-panel__input")
    if (nameInput.value != "") {
        IndexStatus.setPlayerName(nameInput.value)  
        IndexStatus.saveData()
        IndexStatus.resetIndex()
        document.getElementById("menu-panel__title").textContent = `Welcome ${nameInput.value}`
        redirect("name-prompt","menu-panel")
        makeToast("Name added!");
        runGame()
    } else {
        makeToast("Name is required!");
    }
})

document.getElementById("game-panel__navigation-skip-div").addEventListener("click", () => {
    if (IndexStatus.isAllowed()) {
        IndexStatus.incrementIndex()
        runGame()    
    } else {
        makeToast("Last Word")
    }
})

// title panel
const titlePanelProceedButton = document.getElementById("title-panel__buttons-proceed")

titlePanelProceedButton.addEventListener("click", () => {
    if (playerName === "") {
        redirect("title-panel", "name-prompt")
    } else {
        redirect("title-panel", "menu-panel")
    }
})

// menu panel
const menuGameTitle = document.getElementById("menu-panel__game-title")
const menuGameDescription = document.getElementById("menu-panel__game-title-description")
const menuButton = document.getElementById("menu-panel__buttons-start")
const menuPanelTitle = document.getElementById("menu-panel__title")
const menuScoreContainer = document.getElementById("menu-panel__score-data")
const menuScore = document.getElementById("menu-panel__score")
const menuScoreLimit = document.getElementById("menu-panel__score-limit")
const menuPanelPlayButton = document.getElementById("menu-panel__buttons-start")
const lastStoped = document.getElementById("menu-panel__last-stopped")
const firstTimePlaying = IndexStatus.getCurrentIndex() === 0

if (firstTimePlaying) {
    menuPanelTitle.textContent = `Welcome ${playerName}`
    menuPanelPlayButton.textContent = "Start"
} else {
    menuPanelTitle.textContent = `Welcome back ${playerName}`
    menuScore.textContent = IndexStatus.getScore()
    menuScoreLimit.textContent = IndexStatus.getLimit()
    menuPanelPlayButton.textContent = "Continue"
    lastStoped.textContent = `Last stopped at number ${IndexStatus.getCurrentIndex() - 1}`
    menuScoreContainer.style.display = "block"
    lastStoped.style.display = "block"
}

// starts game
menuPanelPlayButton.addEventListener("click", () => {
    redirect("menu-panel", "game-panel")
    runGame()
})

function handleOrientationChange() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        window.fitText(menuGameTitle, 0.4)
        window.fitText(menuGameDescription, 2.5)
        window.fitText(menuButton, 2)
        window.fitText(menuPanelTitle, 1.5)        
        window.fitText(menuScoreContainer, 2)
        window.fitText(lastStoped, 2)
    }
  }
  
  // Initial check on page load
  handleOrientationChange();
  
  // Listen for orientation change events
  window.addEventListener("orientationchange", handleOrientationChange);
  