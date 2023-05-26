
export const IndexStatus = (() => {
  let currentIndex = 0;
  let limit = 0;
  let score = 0;
  let playerName = document.getElementById("player-name").value

  const isAllowed = () => currentIndex <= limit >= 0;

  const resetIndex = () => {
    currentIndex = 0;
    score = 0;
    limit = 0;
  };

  const getScore = () => score;
  const incrementScore = () => score++;

  const isBound = () => currentIndex === limit;

  const setLimit = (newLimit) => {
    if (typeof newLimit === "number") {
      limit = newLimit;
    }
  };

  const setPlayerName = (nameInput) => {
    playerName = nameInput
  };

  const getPlayerName = () => playerName;

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
      lastStoped: currentIndex,
      numberOfItems: limit
    };
    localStorage.setItem("userData", JSON.stringify(data));
  };

  const retrieveScore = () => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      const data = JSON.parse(savedData);
      score = parseInt(data.score);
      currentIndex = parseInt(data.lastStoped)
      playerName = data.playerName
      limit = data.numberOfItems

      console.table(score, playerName, currentIndex, limit);
    }
  };

  const resetData = () => {
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
    isBound,
    resetIndex,
    setPlayerName,
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
  };
})();

IndexStatus.initialize();
