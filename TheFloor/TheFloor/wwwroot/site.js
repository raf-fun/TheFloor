window.toggleAnimation = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle('animate');
    }
};