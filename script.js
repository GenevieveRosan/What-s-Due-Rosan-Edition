// Get current date and initialize calendar
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedDate = null;
let events = {};

function generateCalendar() {
  const calendarElement = document.getElementById('calendar');
  const firstDay = new Date(currentYear, currentMonth, 1);
  const startingDay = firstDay.getDay();
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();

  // Clear the calendar before generating
  calendarElement.innerHTML = '';

  // Days of the week header
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysOfWeek.forEach(day => {
    const dayElement = document.createElement('div');
    dayElement.innerHTML = day;
    calendarElement.appendChild(dayElement);
  });

  // Add empty cells for the days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    calendarElement.appendChild(document.createElement('div'));
  }

  // Add day numbers to the calendar
  for (let day = 1; day <= totalDays; day++) {
    const dayElement = document.createElement('div');
    dayElement.innerHTML = day;
    const currentDay = new Date(currentYear, currentMonth, day);

    // Highlight today's date
    if (currentDay.toDateString() === new Date().toDateString()) {
      dayElement.classList.add('today');
    }

    // Highlight weekends (Saturday and Sunday)
    if (currentDay.getDay() === 0 || currentDay.getDay() === 6) {
      dayElement.classList.add('weekend');
    }

    // Add click event for adding events
    dayElement.addEventListener('click', () => {
      selectedDate = currentDay;
      document.getElementById('eventModal').style.display = 'flex';
      document.getElementById('eventText').value = events[currentDay.toDateString()] || ''; // Pre-fill event if it exists
    });

    calendarElement.appendChild(dayElement);
  }
}

// Event listener for Save Event button
document.getElementById('saveEventBtn').addEventListener('click', () => {
  const eventText = document.getElementById('eventText').value;
  if (selectedDate && eventText) {
    events[selectedDate.toDateString()] = eventText;
    alert(`Event saved for ${selectedDate.toDateString()}: ${eventText}`);
    document.getElementById('eventModal').style.display = 'none';
    displayEventDetails(selectedDate);
  }
});

// Event listener for Close Modal button
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('eventModal').style.display = 'none';
});

// Display events for selected day
function displayEventDetails(date) {
  const eventDetailsElement = document.getElementById('eventDetails');
  const eventText = events[date.toDateString()] || 'No events for this day.';
  eventDetailsElement.innerHTML = `<strong>Event for ${date.toDateString()}:</strong><br>${eventText}`;
}

// Event navigation for previous and next month
document.getElementById('prevMonthBtn').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar();
});

document.getElementById('nextMonthBtn').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar();
});

// Initial call to generate the calendar
generateCalendar();
// To-Do List Functionality
const todoItemsList = document.getElementById('todoItems');
const addTodoBtn = document.getElementById('addTodoBtn');
const newTodoInput = document.getElementById('newTodo');

// Add a new task to the to-do list
function addTodo() {
  const todoText = newTodoInput.value.trim();
  if (todoText) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${todoText} <button onclick="deleteTodo(event)">Delete</button>`;
    todoItemsList.appendChild(listItem);
    newTodoInput.value = ''; // Clear input field
  }
}

// Delete a task
function deleteTodo(event) {
  const itemToDelete = event.target.parentElement;
  itemToDelete.remove();
}

// Event listener for Add Task button
addTodoBtn.addEventListener('click', addTodo);

// Allow pressing "Enter" to add a task
newTodoInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTodo();
  }
});
  