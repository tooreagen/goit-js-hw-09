import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const buttonStart = document.querySelector("button[data-start]");
const dateTimeInput = document.querySelector("#datetime-picker");
const spanDays = document.querySelector("span.value[data-days]");
const spanHours = document.querySelector("span.value[data-hours]");
const spanMinutes = document.querySelector("span.value[data-minutes]");
const spanSeconds = document.querySelector("span.value[data-seconds]");
let intervalId = null;

const optionsFlatpickr = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0] < new Date()) {
            buttonStart.disabled = true;
            window.alert("Please choose a date in the future");
        } else {
            buttonStart.disabled = false;
        }
    },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(dateElement) {
    return dateElement.toString().padStart(2, "0");
}

function timer() {
    const endTime = dateTimeInput.value;
    buttonStart.disabled = true;

    intervalId = setInterval(() => {
        const timeDifference = Date.parse(endTime) - new Date();
        if (timeDifference < 0) {
            clearInterval(intervalId)
            buttonStart.disabled = false;
        } else {
            const date = convertMs(timeDifference);
            spanDays.textContent = addLeadingZero(date.days);
            spanHours.textContent = addLeadingZero(date.hours);
            spanMinutes.textContent = addLeadingZero(date.minutes);
            spanSeconds.textContent = addLeadingZero(date.seconds);
            console.log(timeDifference);
        }
    }, 1000);
}

flatpickr(dateTimeInput, optionsFlatpickr);
buttonStart.addEventListener("click", timer);



