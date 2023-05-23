export const IndexStatus = (() => {
    let currentIndex = 0;
    let limit = 0;
  
    const isAllowed = () => currentIndex <= limit;
  
    const setLimit = (newLimit) => {
      if (typeof newLimit === "number") {
        limit = newLimit;
      }
    };
  
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
      getCurrentIndex,
      getLimit,
      incrementIndex,
    };
  })();