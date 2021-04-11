//Set up the play button
const playButton = document.querySelector(".player__button");
const vid = document.querySelector("video");
let videoOn = false;
playButton.addEventListener("click", togglePlayVideo)
vid.addEventListener("click", togglePlayVideo)
function togglePlayVideo() {
    videoOn = !videoOn;
    if(videoOn)
    {
        vid.play();
    }
    else {
        vid.pause();
    }
}
//Set up volume slider
const playerSlider = document.querySelector(".player__slider");
playerSlider.addEventListener("mousemove", adjustVolume);
playerSlider.addEventListener("touchmove", adjustVolume);
function adjustVolume() {
    vid.volume = playerSlider.value;
}
//Set up speed slider
const playerSlider2 = document.querySelectorAll(".player__slider")[1];
playerSlider2.addEventListener("mousemove", adjustSpeed);
playerSlider2.addEventListener("touchmove", adjustSpeed);
function adjustSpeed() {
    vid.playbackRate = playerSlider2.value;
}
//Go back and forward seconds
const forwardButton = document.querySelectorAll(".player__button")[1];
const backwardButton = document.querySelectorAll(".player__button")[2];
forwardButton.addEventListener("click", skip)
backwardButton.addEventListener("click", skip)
function skip() {
    // console.dir(vid)
    let skipAmount = parseFloat(vid.currentTime) + parseInt(this.dataset.skip);
    if(skipAmount < 0) {
        vid.currentTime = 0;
    }
    else if(skipAmount > vid.duration) {
        vid.currentTime = vid.duration;
    }
    else {
        vid.currentTime = skipAmount;
    }
}
//Set up scrubber
const progressDiv = document.querySelector(".progress");
const progressFilledDiv = document.querySelector(".progress__filled");
const player = document.querySelector(".player");
progressFilledDiv.style.flexBasis = '0%';
progressDiv.addEventListener("mousedown", adjustFrame);
progressDiv.addEventListener("mousemove", adjustingFrame);
progressDiv.addEventListener("mouseup", stopAdjustFrame);
// player.addEventListener("mouseout", stopAdjustFrame);

progressDiv.addEventListener("touchmove", adjustFrame);
vid.addEventListener("timeupdate", watchFrame);
function watchFrame() {
    const vidPercentCompleted = parseFloat(vid.currentTime) / parseFloat(vid.duration) * 100;
    
    progressFilledDiv.style.flexBasis = `${vidPercentCompleted}%`;
}
let adjustOn = false;
function adjustFrame(e) {
    console.log(e.button)
    if(e.button === 0) {
        adjustOn = true;
    }
}
function adjustingFrame(e) {
    if(adjustOn) {
        progressFilledDiv.style.flexBasis = `${e.offsetX /6.25}%`;
        const newTime = parseFloat(progressFilledDiv.style.flexBasis) /100 * vid.duration;
        vid.currentTime = newTime;
    }
}
function stopAdjustFrame() {
    adjustOn = false;
}