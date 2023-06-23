import redirect from "./helpers/redirect.js";
import makeToast from "./helpers/toast.js";

const Global = (() => {
    let currentIndex = 0;
    let limit = 0;
    let score = 0;
    let playerName = "";

    const setPlayerName = (newPlayerName) => {
		playerName = newPlayerName;
    };

    const isAllowed = () => currentIndex <= limit && currentIndex >= 0;

    const setCurrentIndex = (index) => {
        currentIndex = index;
    };

    const getScore = () => score;

    const incrementScore = () => {
        score++;
    };

    const isBound = () => currentIndex === limit;

    const setLimit = (newLimit) => {
        if (typeof newLimit === "number") {
            limit = newLimit;
        }
    };

    const getPlayerName = () => {

        // return playerName
        if (playerName === "") {
            const savedData = localStorage.getItem("userData");
            const localData = JSON.parse(savedData);
            
            if (localData === null) {
                return playerName
            }
            
            localData.playerName === "" ? 
                playerName :
                playerName = localData.playerName 

            return playerName
        } else {
            return playerName
        }
    
    };

    const getLimit = () => limit;

    const getCurrentIndex = () => currentIndex;

    const incrementIndex = () => {
        if (isAllowed()) {
            currentIndex++;
        }
    };

    const decrementIndex = () => {
        if (isAllowed()) {
            currentIndex--;
        }
    };

    const saveData = () => {

        const data = {
            score: score.toString(),
            playerName: playerName,
            lastStopped: currentIndex,
            numberOfItems: limit,
        };
        localStorage.setItem("userData", JSON.stringify(data));

    };

    const retrieveScore = () => {

        const savedData = localStorage.getItem("userData");

        if (savedData) {
            const localData = JSON.parse(savedData);

            if (!navigator.onLine) {

                makeToast("Cannot retrieve online data")
                makeToast("Score might not be saved")
                makeToast("Loading from offline data")
                score = parseInt(localData.score);
                currentIndex = parseInt(localData.lastStopped);
                playerName = localData.playerName;
                limit = localData.numberOfItems;

            } else {

                fetch("http://127.0.0.1:5000/get_player", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: localData.playerName })
                })
                .then(response => response.json())
                .then(data => {

                    if (data.status === "success") {
                    
                        score = parseInt(data.score);
                        currentIndex = parseInt(localData.lastStopped);
                        playerName = data.playerName;
                        limit = localData.numberOfItems;
                    
                    } else {
                        makeToast(data.message);
                    }
                })
            }


        }
    };

    const resetData = (goPost = true) => {

        if (goPost) {
            fetch("http://127.0.0.1:5000/delete_player", {
                method: "POST",
				headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: playerName })
            })
			.then(response => response.json())
			.then(data => {

				if (data.status === "success") {
					makeToast(data.message);
				} else {
					makeToast(data.message);
				}
			})
        }

        playerName = "";
        score = 0;
        currentIndex = 0;
        localStorage.removeItem("userData");

    };

    const initialize = () => {
        retrieveScore();
    };

    return {
        isAllowed,
        setLimit,
        setPlayerName,
        isBound,
        incrementScore,
        decrementIndex,
        getPlayerName,
        getCurrentIndex,
        getScore,
        getLimit,
        incrementIndex,
        saveData,
        retrieveScore,
        resetData,
        initialize,
        setCurrentIndex,
    };
})();

Global.initialize();

export default Global;
