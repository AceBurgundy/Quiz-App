import Game from "./helpers/events.js";
import Global from "../scripts/global.js";
import redirect from "./helpers/redirect.js";

let preloadLink =
    Global.getPlayerName() === ""
        ? "./templates/name.html"
        : "./templates/menu.html";

// title panel
Game.click("title-panel__buttons-proceed", () => {
    document.getElementById("title-panel").height == "0vh";
    redirect("title-panel", preloadLink);
});

const setHeight = function () {
    const currentHeight = window.innerHeight;
    document.body.style.height = `${currentHeight}px`;
};
window.addEventListener("resize", setHeight);
setHeight();

window.onload = () => {
    document.getElementById("title-panel").style.transform = "translateY(0%)"
}
