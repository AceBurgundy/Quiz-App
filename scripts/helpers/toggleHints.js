export default function toggleHints(hints, currentHint, hintContainer) {
    let hint = hints[Math.floor(Math.random() * hints.length)];

    while (hint === currentHint) {
        hint = hints[Math.floor(Math.random() * hints.length)];
    }

    currentHint = hint;

    hintContainer.innerHTML = hint;
    hintContainer.classList.add("active");

    setTimeout(() => {
        hintContainer.classList.remove("active");
    }, 2500);
}
