import {monthContainer, selectedMonth} from './calendar.js';

const LENGTH_INPUT_NAME_ERROR = "*Имя не может быть короче 2-х символов";
const LENGTH_INPUT_LAST_NAME_ERROR = "*Фамилия не может быть короче 2-х символов";
const LENGTH_INPUT_PHONE_ERROR = "*Номер телефона слишком короткий"

export const recordForm = document.querySelector('.recordForm');

const nameInput = recordForm['name'];
const lastNameInput = recordForm['lastName'];
const phoneInput = recordForm['phone'];


const nameLabel = recordForm.querySelector('.nameLabel');
const lastNameLabel = recordForm.querySelector('.lastNameLabel');
const phoneLabel = recordForm.querySelector('.phoneLabel');

const timeInputs = timeContainer.querySelectorAll('.timeInput');
const recordFormInputs = recordForm.querySelectorAll('.recordForm__input');
export const calendarContainer = document.getElementById('calendar_container');


const lsData = localStorage.getItem('recordData');
export const recordData = lsData ? JSON.parse(lsData) : {};

function onSubmit(event) {
    event.preventDefault();
    if(formValidation()) return;
    
    const calendarActiveDate = calendarContainer.querySelector('.activeListItem');
    const recordDataKey = `${calendarActiveDate.innerHTML} ${monthContainer.innerHTML}`;
    recordData[recordDataKey] = {};
    recordData[recordDataKey].date = `${calendarActiveDate.innerHTML}`;
    recordData[recordDataKey].month = selectedMonth;

    timeInputs.forEach(timeInput => {
      if(timeInput.checked) {
        recordData[recordDataKey].time = timeInput.value
      }
    })

    recordFormInputs.forEach(recordInput => {
      recordData[recordDataKey][recordInput.name] = recordInput.value
    })


    localStorage.setItem('recordData', JSON.stringify(recordData));
    recordForm.classList.remove('visible');
    confirmation.classList.add('visible');
    recordForm.reset();
  }


function formValidation() {
  const nameValue = nameInput.value.trim();
  const lastNameValue = lastNameInput.value.trim();
  const phoneValue = phoneInput.value;
  const nameErrorContainer = nameLabel.querySelector('.recordForm__error');
  const lastNameErrorContainer = lastNameLabel.querySelector('.recordForm__error');
  const phoneErrorContainer = phoneLabel.querySelector('.recordForm__error');

  let errorText = '';

  if(nameValue.length < 2) {  
    errorText = LENGTH_INPUT_NAME_ERROR;
    nameInput.classList.add('error');
    nameErrorContainer.innerHTML = errorText;
    inputOnChange(nameInput);
  } 

  if(errorText === '' && lastNameValue.length < 2 ) {
    errorText = LENGTH_INPUT_LAST_NAME_ERROR;
    lastNameInput.classList.add('error');
    lastNameErrorContainer.innerHTML= errorText;
    inputOnChange(lastNameInput);
  } 

  if(errorText === '' &&  phoneValue.length < 18) {
    errorText = LENGTH_INPUT_PHONE_ERROR;
    phoneInput.classList.add('error');
    phoneErrorContainer.innerHTML = errorText;
    inputOnChange(phoneInput);

  }
  return errorText;
}

function inputOnChange(input) {
  input.addEventListener('input', () => {
    input.classList.remove('error');
  })
}

export function onHandleSubmit() {
  recordForm.addEventListener('submit', onSubmit);
}
