function removeTransition(e) {
    if(e.propertyName !== "transform") return;
    this.classList.remove("playing");
}

Array.from(document.getElementsByClassName("key")).forEach(element => {
    element.addEventListener("click", (e) => {
        element.classList.add("playing");         
    });
   element.addEventListener('transitionend', removeTransition)
});
window.addEventListener("keydown", (e) => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if(!audio) return;
    audio.play();
    audio.currentTime = 0;
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    key.classList.add("playing");
}); 
window.addEventListener("keyup", (e) => {
    removeTransition();
});