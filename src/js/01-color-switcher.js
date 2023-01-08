const buttonStart = document.querySelector("button[data-start]");
const buttonStop = document.querySelector("button[data-stop]");
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setBackgroundColor() {
    buttonStart.disabled = true;
    buttonStop.disabled = false;
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor(); 
    }, 1000);
}

function stopInterval() {
    clearInterval(intervalId);
    buttonStart.disabled = false;
    buttonStop.disabled = true;
}

buttonStart.addEventListener("click", setBackgroundColor);
buttonStop.addEventListener("click", stopInterval);