export default function redirect(currentPageElement, endPageElement) {
    const currentPage = document.getElementById(currentPageElement);
    currentPage.style.transform = "translateY(-100%)";

    setTimeout(() => {
        window.location.href = endPageElement;
    }, 400);
}
