import { createItem, onCloseModalPopUp, onCloseConfirmation } from './create_elements.js';
import { generateMatrix, renderMonth } from './calendar.js'
import {onSubmit} from './formValidation.js';
import './phoneMask.js'
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

document.addEventListener('DOMContentLoaded', () => {
  createCalendar();
  onCloseModalPopUp();
  onSubmit();
  onCloseConfirmation();
})

