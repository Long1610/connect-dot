export function getElementPosition(id) {
    const element = document.getElementById(id)
    var rect = element.getBoundingClientRect();
    console.log([
        rect.left + window.scrollX,
        rect.top + window.scrollY
    ])
    return [
        rect.left + window.scrollX,
        rect.top + window.scrollY
    ]
}