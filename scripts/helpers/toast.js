export default function makeToast(message) {

    const container = document.getElementById("flashes")
    const child = document.createElement("p")
    child.className = "message"
    child.textContent = message

    container.appendChild(child)

    child.classList.add("active")

    setTimeout(() => {
        child.style.right = "100%"
        setTimeout(() => {
            child.classList.remove("active")
            setTimeout(() => {
                child.remove()
            }, 200);
        }, 500);
    }, 1500);

}