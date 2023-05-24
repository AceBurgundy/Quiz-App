export default function clearGamePanelTextContainer(gamePanelTextDivs) {
    setTimeout(() => {
        [...gamePanelTextDivs].map((div) => (div.textContent = ""));
    }, 800);
}
