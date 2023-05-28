import runGame from "./game-scripts/engine.js";
import Global from "./global.js";
import Game from "./helpers/events.js";

// name prompt
const gamePanel = document.getElementById("game-panel");
gamePanel.style.height = "100vh";

// skip button
Game.click("game-panel__navigation-skip", () => {
    if (Global.getCurrentIndex() <= Global.getLimit()) {
        Global.incrementIndex();
        runGame();
    } else {
        makeToast("Last Word");
    }
});

Game.click("game-panel__navigation-definition", () => {
    document.getElementById("definition-panel").classList.add("active")
})

Game.click("definition-panel", (event) => {
    event.target.classList.remove("active")
})

runGame();

function handleOrientationChange() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        const fitText = (element, value) => window.fitText(element, value);
        fitText(document.getElementById("definition-panel"), 1.5);
    }
}

// Initial check on page load
handleOrientationChange();

// Listen for orientation change events
window.addEventListener("orientationchange", handleOrientationChange);

const setHeight = function () {
    const currentHeight = window.innerHeight;
    document.body.style.height = `${currentHeight}px`;
};
window.addEventListener("resize", setHeight);
setHeight();
