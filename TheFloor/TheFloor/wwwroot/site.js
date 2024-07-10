window.toggleAnimation = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle('animate');
    }
};
function toggleFullScreenAnimation(elementId, isActive) {
    const element = document.getElementById(elementId);
    if (element) {
        if (isActive) {
            element.classList.add('fullscreen');
        } else {
            element.classList.remove('fullscreen');
        }
    }
}