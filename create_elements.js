import {recordForm} from './formValidation.js';
import {months, selectedMonth} from './calendar.js';

const timeContainer = document.getElementById('timeContainer');
const timeLabels = timeContainer.querySelectorAll('.timeLabel');
const popUp = document.getElementById('modalPopup');
const confirmation = document.getElementById('confirmation');
const notificationContainer = document.getElementById('notification');

const dataInformation = localStorage.getItem('recordData');
export const lsData = dataInformation ? JSON.parse(dataInformation) : null;
export const recordDates = lsData ? Object.keys(lsData) : [];

function removeVisible() {
  popUp.classList.remove('visible');
  popUp.querySelectorAll('.visible').forEach(item => item.classList.remove('visible'));
}


export function createItem(arr, isTitle) {
  const list = document.createElement("ul");
  list.className = "list"
  
  for(let i = 0; i < arr.length; i++) {
    const listItem = document.createElement("li");
	  listItem.className = isTitle ? "listTitle" : "listItem";

    const innerContent = arr[i] !== -1 ? `${arr[i]}`: '';
    if(innerContent === '') {
      listItem.classList.add('empty');
    }
    listItem.innerHTML = `${innerContent}`;

    if(recordDates.length) {
      for (let i = 0; i < recordDates.length; i++) {
        if(recordDates[i].startsWith(listItem.innerHTML) && recordDates[i].includes(months[selectedMonth]) && listItem.innerHTML !== ''){
          listItem.classList.add('selectedDate');
        }
      }
    }

    listItem.addEventListener("click", () => {
      popUp.classList.add('visible');
      

      if(recordDates.length) {
        for (let i = 0; i < recordDates.length; i++) {
          if(recordDates[i].startsWith(listItem.innerHTML) && recordDates[i].includes(months[selectedMonth])){
            listItem.classList.add('selectedDate');
            notificationContainer.classList.add('visible');
            timeContainer.classList.remove('visible');
            const recordMonth = `${lsData[recordDates[i]].month + 1}`;
            notificationContainer.innerHTML = `
              <p>Вы записаны на ${lsData[recordDates[i]].date}.${recordMonth < 10 ? 0 + recordMonth: recordMonth}</p>
              <p>Ждём Вас в ${lsData[recordDates[i]].time}</p>`
              return;
          }  
        }
        timeContainer.classList.add('visible');
        
      } else {
        timeContainer.classList.add('visible');
      }
      
      listItem.classList.add('activeListItem');
    })  

    list.append(listItem)
  }
  
  return list
}

export function onCloseModalPopUp() {
  const closeButton = document.getElementById('close_popUp_button');
  popUp.addEventListener('click', (event) => { 
      if(popUp === event.target) {
        removeVisible();
      }
  })

  closeButton.addEventListener('click', () => {
    removeVisible();
  })
}

timeLabels.forEach(timeLabel => {
  timeLabel.addEventListener('click', (event) => {
    event.stopPropagation();
    recordForm.classList.add('visible');
    timeContainer.classList.remove('visible');
  })
})

export function onCloseConfirmation() {
  confirmation.addEventListener('click', () => {

    confirmation.classList.remove('visible');
    removeVisible();
  })
}



