export const IndexStatus = (() => {
    let currentIndex = 0;
    let limit = 0;
    let playerName = ""
    let score = 0;

    const isAllowed = () => currentIndex <= limit;
    
    const resetIndex = () => {
      currentIndex = 0
      score = 0
      playerName = ""
      limit = 0
    };

    const getScore = () => score
    const incrementScore = () => score++

    const isBound = () => currentIndex === limit;

    const setLimit = (newLimit) => {
      if (typeof newLimit === "number") {
        limit = newLimit;
      }
    };
  
    const setPlayerName = (newPlayerName) => {
        playerName = newPlayerName
    }

    const getPlayerName = () => playerName

    const getLimit = () => limit;

    const getCurrentIndex = () => currentIndex;
  
    const incrementIndex = () => {
      if (isAllowed()) {
        currentIndex++;
      }
    };
  
    return {
      isAllowed,
      setLimit,
      isBound,
      resetIndex,
      setPlayerName,
      incrementScore,
      getPlayerName,
      getCurrentIndex,
      getScore,
      getLimit,
      incrementIndex,
    };
  })();