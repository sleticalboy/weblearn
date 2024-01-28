const media = document.querySelector("video");
const controls = document.querySelector(".controls");

const play = document.querySelector(".play");
const stop = document.querySelector(".stop");
const rwd = document.querySelector(".rwd");
const fwd = document.querySelector(".fwd");

const timerWrapper = document.querySelector(".timer");
const timer = document.querySelector(".timer span");
const timerBar = document.querySelector(".timer div");

media.removeAttribute('controls');
controls.style.visibility = 'visible';

play.addEventListener('click', playOrPause)
stop.addEventListener('click', stopMedia)
media.addEventListener('ended', stopMedia)
media.addEventListener('timeupdate', setTime)
rwd.addEventListener('click', backward)
fwd.addEventListener('click', forward)

document.onclick = (e) => {
    const rect = timer.getBoundingClientRect();
    console.log(`${e.x}, ${e.y} -> ${JSON.stringify(rect)}`)
}

function playOrPause() {
    if (media.paused) {
        play.setAttribute('data-icon', 'u');
        media.play();
    } else {
        play.setAttribute('data-icon', 'P');
        media.pause();
    }
}

function stopMedia() {
    media.pause();
    media.currentTime = 0;
    play.setAttribute('data-icon', 'P');

    rwd.classList.remove("active");
    fwd.classList.remove("active");
    clearInterval(intervalBwd);
    clearInterval(intervalFwd);
}

let intervalFwd, intervalBwd;

function backward() {
    clearInterval(intervalFwd);
    fwd.classList.remove('active');
    if (rwd.classList.contains('active')) {
        rwd.classList.remove('active');
        clearInterval(intervalBwd);
        media.play();
    } else {
        rwd.classList.add('active');
        media.pause();
        intervalBwd = setInterval(windBackward, 200)
    }
}

function forward() {
    clearInterval(intervalBwd);
    rwd.classList.remove('active');
    if (fwd.classList.contains("active")) {
        fwd.classList.remove("active");
        clearInterval(intervalFwd);
        media.play();
    } else {
        fwd.classList.add("active");
        media.pause();
        intervalFwd = setInterval(windForward, 200);
    }
}

function windBackward() {
    if (media.currentTime <= 3) {
        rwd.classList.remove("active");
        clearInterval(intervalBwd);
        stopMedia();
    } else {
        media.currentTime -= 3;
    }
}

function windForward() {
    if (media.currentTime >= media.duration - 3) {
        fwd.classList.remove("active");
        clearInterval(intervalFwd);
        stopMedia();
    } else {
        media.currentTime += 3;
    }
}

function setTime() {
    const minutes = Math.floor(media.currentTime / 60);
    const seconds = Math.floor(media.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;

    if (minutes < 10) {
        minuteValue = "0" + minutes;
    } else {
        minuteValue = minutes;
    }

    if (seconds < 10) {
        secondValue = "0" + seconds;
    } else {
        secondValue = seconds;
    }

    timer.textContent = minuteValue + ":" + secondValue;

    const barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
    timerBar.style.width = barLength + "px";
}
