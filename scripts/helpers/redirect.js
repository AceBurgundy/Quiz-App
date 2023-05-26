export function redirect(currentPageElement, endPageElement) {
    document.getElementById(currentPageElement).style.height = "0vh"
    document.getElementById(endPageElement).style.height = "100vh"
}