import Notiflix from 'notiflix';

const form = document.querySelector(".form");
const { delay, step, amount } = form;

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay);
  })
    
  return promise;
}

const callPromise = (event) => {
  let delayStep = Number(delay.value);
  event.preventDefault();

  for (let index = 1; index <= amount.value; index += 1) {
    createPromise(index, delayStep)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delayStep += Number(step.value);
  }
}

form.addEventListener("submit", callPromise);