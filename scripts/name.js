import redirect from "./helpers/redirect.js";
import makeToast from "./helpers/toast.js";
import Game from "./helpers/events.js";
import Global from "../scripts/global.js";

if (Global.getPlayerName() !== "" && Global.getPlayerName() !== undefined) {
    redirect("name-prompt", "menu.html");
}

window.onload = () => {
    document.getElementById("name-prompt").style.transform = "translateY(0%)";
};

Game.click("name-panel__submit-name", (e) => {
    
    if (!navigator.onLine) {
        makeToast("No internet connection")
        return
    }

    const nameInput = document.getElementById("name-panel__input").value;
    
    makeToast("Adding Player")
    
    if (nameInput !== "") {
        fetch("https://quizeme.pythonanywhere.com/add_player", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: nameInput }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                makeToast(data.message);
                Global.setPlayerName(nameInput);
                Global.saveData();
                setTimeout(() => {
                    redirect("name-prompt", "menu.html")
                }, 5000);
            } else {
                makeToast(data.message);
            }
        });
    } else {
        makeToast("Name required")
    }
});

const setHeight = function () {
    const currentHeight = window.innerHeight;
    document.body.style.height = `${currentHeight}px`;
};
window.addEventListener("resize", setHeight);
setHeight();
