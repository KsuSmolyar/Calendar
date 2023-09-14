import {recordForm} from './formValidation.js';
import {months, selectedMonth} from './calendar.js';
import {calendar} from './index.js';

const timeContainer = document.getElementById('timeContainer');
const timeLabels = timeContainer.querySelectorAll('.timeLabel');
const popUp = document.getElementById('modalPopup');
const confirmation = document.getElementById('confirmation');
const notificationContainer = document.getElementById('notification');
const closeButton = document.getElementById('close_popUp_button');

function getFromLocalStorage() {
  const dataInformation = localStorage.getItem('recordData');
  const lsData = dataInformation ? JSON.parse(dataInformation) : null;
  return lsData;
}

function removeVisible() {
  popUp.classList.remove('visible');
  popUp.querySelectorAll('.visible').forEach(item => item.classList.remove('visible'));
}


export function createItem(arr, isTitle) {
  const list = document.createElement("ul");
  list.className = "list";
  
  const lsData = getFromLocalStorage();
  const recordDates = lsData ? Object.keys(lsData) : [];

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

    function onHandleListItemClick() {
      popUp.classList.add('visible');
      const lsData = getFromLocalStorage();
      const recordDates = lsData ? Object.keys(lsData) : [];    
      
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
    }

    listItem.addEventListener("click", onHandleListItemClick);

    list.append(listItem)
  }
  
  return list
}


function onHandleClosePopUp(event){
  if(confirmation.classList.contains('visible')) {
    addSelectedDateClass();
  }

  if(popUp === event.target || closeButton === event.target) {
    removeVisible();
    removeActiveClass();
  } 
}
  
function onHandleTimeLabelClick(event) {
  event.stopPropagation();
  recordForm.classList.add('visible');
  console.log('recordForm', recordForm);
  timeContainer.classList.remove('visible');
}

timeLabels.forEach(timeLabel => {
  timeLabel.addEventListener('click', onHandleTimeLabelClick);
})

function removeActiveClass() {
  const listItems = calendar.querySelectorAll('.listItem');
  listItems.forEach(listItem => {
    if(listItem.classList.contains('activeListItem')) {
      listItem.classList.remove('activeListItem');
    }
  })
}

function addSelectedDateClass() {
  const listItems = calendar.querySelectorAll('.listItem');
  listItems.forEach(listItem => {
    if(listItem.classList.contains('activeListItem')){
      listItem.classList.add('selectedDate');
    }
  })
}


function onCloseConfirmation(event) {
    confirmation.classList.remove('visible');
    removeVisible();
    addSelectedDateClass();
    removeActiveClass();
}



export function onHandleEventListeners() {
  popUp.addEventListener('click', onHandleClosePopUp);
  closeButton.addEventListener('click', onHandleClosePopUp);
  confirmation.addEventListener('click', onCloseConfirmation);
}
