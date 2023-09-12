import { createItem, onCloseModalPopUp, onCloseConfirmation, recordDates, lsData } from './create_elements.js';
import { generateMatrix, renderMonth } from './calendar.js'
import {onSubmit} from './formValidation.js';

export const calendar = document.getElementById('calendar');



export function createCalendar() {
  cleanCalendar();
  renderMonth();
  const matrix = generateMatrix();
  const calendarTitleRow =  createItem(matrix[0], true);
  calendar.append(calendarTitleRow);
  for(let i = 1; i < matrix.length; i++) {
    const calendarItem = createItem(matrix[i], false)
    calendar.append(calendarItem)
  }
}

export function cleanCalendar() {
  calendar.innerHTML='';
}


createCalendar();
onCloseModalPopUp();
onSubmit();
onCloseConfirmation();

