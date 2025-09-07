const DAYS = document.getElementById("days");
const HOURS = document.getElementById("hours");
const MINUTES = document.getElementById("minutes");
const SECONDS = document.getElementById("seconds");
const PROGRESSBAR = document.getElementById("progress-bar");

const inputDays = document.getElementById("input-days");
const inputHours = document.getElementById("input-hours");
const inputMinutes = document.getElementById("input-minutes");
const inputSeconds = document.getElementById("input-seconds");

const startbtn = document.getElementById("start-btn");
const pausebtn = document.getElementById("pause-btn");
const resumebtn = document.getElementById("resume-btn");
const resetbtn = document.getElementById("reset-btn");

let totalTime = 0;
let endTime = 0;
let timerInterval = null;
let paused = false;
let remainingTime = 0;

startbtn.addEventListener("click", () => {
    const d = parseInt(inputDays.value) || 0;
    const h = parseInt(inputHours.value) || 0;
    const m = parseInt(inputMinutes.value) || 0;
    const s = parseInt(inputSeconds.value) || 0;

    totalTime = (d * 24 * 3600) + (h * 3600) + (m * 60) + s;
    remainingTime = totalTime;
    endTime = Date.now() + totalTime * 1000;

    startTimer();
});

pausebtn.addEventListener("click", pauseTimer);
resumebtn.addEventListener("click", resumeTimer);
resetbtn.addEventListener("click", resetTimer);

function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (paused) return;

        remainingTime = Math.max(0, Math.round((endTime - Date.now()) / 1000));
        updateDisplay(remainingTime);

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            document.getElementById("alarm").play();

            if (totalTime >= 3600) {
                document.getElementById("reward").style.display = "flex";
            } else {
                document.getElementById("custom-alert").style.display = "flex";
            }
        }
    }, 500);
}

function pauseTimer() {
    if (!timerInterval) return;
    paused = true;
    remainingTime = Math.max(0, Math.round((endTime - Date.now()) / 1000));
}

function resumeTimer() {
    if (!timerInterval) startTimer();
    if (paused) {
        paused = false;
        endTime = Date.now() + remainingTime * 1000;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    paused = false;
    remainingTime = totalTime;
    endTime = Date.now() + totalTime * 1000;
    updateDisplay(remainingTime);
}

function updateDisplay(secondsLeft) {
    const d = Math.floor(secondsLeft / 86400);
    const h = Math.floor((secondsLeft % 86400) / 3600);
    const m = Math.floor((secondsLeft % 3600) / 60);
    const s = secondsLeft % 60;

    DAYS.textContent = d.toString().padStart(2, "0");
    HOURS.textContent = h.toString().padStart(2, "0");
    MINUTES.textContent = m.toString().padStart(2, "0");
    SECONDS.textContent = s.toString().padStart(2, "0");

    if (totalTime > 0) {
        const progress = ((totalTime - secondsLeft) / totalTime) * 100;
        PROGRESSBAR.style.width = progress + "%";
    }
}

const introScreen = document.getElementById("intro-screen");
const app = document.getElementById("app");
const diveBtn = document.getElementById("dive-btn");

diveBtn.addEventListener("click", () => {
    introScreen.style.display = "none";
    app.style.display = "block";
});

const closeRewardBtn = document.getElementById("close-reward");
if (closeRewardBtn) {
    closeRewardBtn.addEventListener("click", () => {
        document.getElementById("reward").style.display = "none";
    });
}

const closeAlertBtn = document.getElementById("close-alert");
if (closeAlertBtn) {
    closeAlertBtn.addEventListener("click", () => {
        document.getElementById("custom-alert").style.display = "none";
    });
}
