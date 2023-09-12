import {monthContainer, selectedMonth} from './calendar.js';

const EMPTY_INPUT_NAME_ERROR = "*Вы забыли указать имя";
const LENGTH_INPUT_NAME_ERROR = "*Имя не может быть короче 2-х символов";
const EMPTY_INPUT_LAST_NAME_ERROR = "*Вы забыли указать фамилию";
const LENGTH_INPUT_LAST_NAME_ERROR = "*Фамилия не может быть короче 2-х символов";
const EMPTY_INPUT_PHONE_ERROR = "*Вы забыли указать номер телефона";

export const recordForm = document.querySelector('.recordForm');

const nameInput = recordForm['name'];
const lastNameInput = recordForm['lastName'];


const nameLabel = recordForm.querySelector('.nameLabel');
const lastNameLabel = recordForm.querySelector('.lastNameLabel');
const phoneLabel = recordForm.querySelector('.phoneLabel');

const timeInputs = timeContainer.querySelectorAll('.timeInput');
const recordFormInputs = recordForm.querySelectorAll('.recordForm__input');
export const calendarContainer = document.getElementById('calendar_container');


const lsData = localStorage.getItem('recordData');
export const recordData = lsData ? JSON.parse(lsData) : {};
// console.log(recordData);

export function onSubmit() {
  recordForm.addEventListener('submit', (event) => {
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
  })
}

function formValidation() {
  const nameValue = nameInput.value.trim();
  const lastNameValue = lastNameInput.value.trim();
  const nameErrorContainer = nameLabel.querySelector('.recordForm__error');
  const lastNameErrorContainer = lastNameLabel.querySelector('.recordForm__error');

  let errorText = '';

  if(nameValue === '' || nameValue.length < 2) {  
    errorText = nameValue === '' ? EMPTY_INPUT_NAME_ERROR : LENGTH_INPUT_NAME_ERROR;
    nameInput.classList.add('error');
    nameErrorContainer.innerHTML = errorText;
    inputOnChange(nameInput);
  } 

  if(errorText === '' && ( lastNameValue === '' || lastNameValue.length < 2 )) {
    errorText =  lastNameValue === '' ? EMPTY_INPUT_LAST_NAME_ERROR : LENGTH_INPUT_LAST_NAME_ERROR;
    lastNameInput.classList.add('error');
    lastNameErrorContainer.innerHTML= errorText;
    inputOnChange(lastNameInput);
  } 

  return errorText;
}

function inputOnChange(input) {
  input.addEventListener('change', () => {
    input.classList.remove('error');
  })
}
