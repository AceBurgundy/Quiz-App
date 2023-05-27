export default class Game {
    static click(elementId, callback) {
      const element = document.getElementById(elementId);
      element.addEventListener("click", callback);
    }
}
