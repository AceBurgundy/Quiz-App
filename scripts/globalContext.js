export const IndexStatus = (() => {
    let currentIndex = 0;
    let limit = 0;
    let playerName = ""

    const isAllowed = () => currentIndex <= limit;
  
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
      setPlayerName,
      getPlayerName,
      getCurrentIndex,
      getLimit,
      incrementIndex,
    };
  })();