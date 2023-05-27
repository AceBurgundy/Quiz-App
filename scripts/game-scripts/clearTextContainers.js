export default function clearTextContainers(gamePanelTextDivs) {
    setTimeout(() => {
        [...gamePanelTextDivs].map((div) => (div.textContent = ""));
    }, 800);
}
