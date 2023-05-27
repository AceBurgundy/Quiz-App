import redirect from "./helpers/redirect.js";
import Game from "./helpers/events.js";
import Global from "../scripts/global.js"

let preloadLink = Global.getPlayerName() === "" ? './templates/name.html' : './templates/menu.html'

// title panel
Game.click("title-panel__buttons-proceed", () => {
  document.getElementById("title-panel").height == "0vh"
  redirect("title-panel", preloadLink)
});