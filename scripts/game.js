import runGame from "./game-scripts/engine.js";
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

runGame();

function handleOrientationChange() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        const fitText = (element, value) => window.fitText(element, value);

        document.querySelectorAll(".nav-link").forEach((link) => {
            fitText(link, 0.1);
        });
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
