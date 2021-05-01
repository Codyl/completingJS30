const timeButtons = document.getElementsByClassName('timer__button');
const timeLeft = document.querySelector(".display__time-left");
const timeEnd = document.querySelector('.display__end-time');
const minutesInput = document.querySelector('[name="minutes"]');
function timer(seconds) {
    if(typeof timeout !== 'undefined')
    clearInterval(timeout)
    if(seconds > 0) {
        timeout = setInterval(function(){
            timeLeft.innerText = seconds;
            if(seconds) seconds--;
            else clearInterval(timeout)
            console.log(seconds)
            }, 1000)
    }
}
function setReturnTime(secondsAdded) {
    const time = new Date();
    let secs = (parseInt(Date.now())+parseInt(secondsAdded*1000));
    time.setTime(secs)
    timeEnd.innerText = `Be back at ${time.getHours()%12}:${time.getMinutes()}`
}
[...timeButtons].forEach(btn => {
    btn.addEventListener('click', () => {
        let timeout;
        timer(btn.dataset.time)
        setReturnTime(btn.dataset.time);
    });
});
minutesInput.addEventListener('blur', () => {
    timer(parseInt(minutesInput.value*60))
    setReturnTime(parseInt(minutesInput.value*60));
})