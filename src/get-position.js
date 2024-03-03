export function getElementPosition(id) {
    const element = document.getElementById(id)
    var rect = element.getBoundingClientRect();
    return [
        rect.left + window.scrollX,
        rect.top + window.scrollY
    ]
}