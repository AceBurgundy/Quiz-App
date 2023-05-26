import { IndexStatus } from "../globalContext"

export default function updateMenu() {
    // menu panel
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
        lastStoped.textContent = `Last stopped at number ${IndexStatus.getCurrentIndex()}`
        menuScoreContainer.style.display = "block"
        lastStoped.style.display = "block"
    }

}