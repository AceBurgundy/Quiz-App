export default function redirect(currentPageElement, endPageElement) {
    document.getElementById(currentPageElement).style.height = "0vh"

    setTimeout(() => {
        window.location.href = endPageElement
    }, 300);
}