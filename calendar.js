import {createCalendar} from './index.js';

export const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const activeDate = new Date();
/*Получение текущего месяца */
export const currentMonth = activeDate.getMonth();
export let selectedMonth = currentMonth;

const year = activeDate.getFullYear();


/*Кнопки переключения месяца */
const prevMonthButton = document.getElementById('month-prev');
const nextMonthButton = document.getElementById('month-next');


const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/*Переключение месяца */

function getPrevMonth() {
  nextMonthButton.classList.remove('hide')
  if(selectedMonth > 0) {
    selectedMonth -= 1;
  }
  if(selectedMonth === 0) {
    prevMonthButton.classList.add('hide');
  }
  renderMonth();
  createCalendar();
}

function getNextMonth() {
  prevMonthButton.classList.remove('hide');
  if(selectedMonth < 11) {
    selectedMonth += 1;
  } 
  if(selectedMonth === 11) {
    nextMonthButton.classList.add('hide')
  } 
  renderMonth();
  createCalendar();
}

prevMonthButton.addEventListener('click', getPrevMonth);
nextMonthButton.addEventListener('click', getNextMonth);


/*Получение максимального количества дней в выбранном месяце */

function getMaxDays(month) {
  const maxDays = nDays[month];
  if (month == 1) { // February
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      maxDays += 1;
    }
  }
  return maxDays;
}

const maxDays = getMaxDays(selectedMonth);



/*Получение первого дня выбранного месяца */
function getFirstDay() {
  const firstDay = new Date(year, selectedMonth, 1).getDay();
  let currentFirstDay = firstDay;
  if(firstDay === 0) {
    currentFirstDay += 7
  } 
  currentFirstDay--;
  return currentFirstDay;
}


/*Генерация сетки календаря */

export function  generateMatrix() {
  const firstDay = getFirstDay();
  const matrix = [];
  // Create header
  matrix[0] = weekDays;

  let counter = 1;
  for (let row = 1; row < 7; row++) {
    matrix[row] = [];
    for (let col = 0; col < 7; col++) {
      matrix[row][col] = -1;
      if (row == 1 && col >= firstDay) {
        matrix[row][col] = counter++;
      } else if (row > 1 && counter <= maxDays) {
        matrix[row][col] = counter++;
      }
    }
  }
 
return matrix;
}

export const monthContainer = document.getElementById('month_container');

export function renderMonth() {

  monthContainer.innerHTML = months[selectedMonth];
}

