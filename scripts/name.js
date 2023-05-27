import redirect from "./helpers/redirect.js";
import makeToast from "./helpers/toast.js";
import Game from "./helpers/events.js";
import Global from "../scripts/global.js"

if (Global.getPlayerName() !== "") {
    redirect("name-prompt", "menu.html")
}

// name prompt
document.getElementById("name-prompt").style.height = "100vh"

Game.click("name-panel__submit-name", () => {

    const nameInput = document.getElementById("name-panel__input").value;

    if (nameInput !== "") {
        Global.setPlayerName(nameInput)
        Global.saveData();
        makeToast("Name added!");
        redirect("name-prompt", "menu.html")
    } else {
        makeToast("Name is required!");
    }

})