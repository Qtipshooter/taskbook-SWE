const date = new Date();

//function to render the calendar days
const renderCalendar = () => {
  //set the date to the first of the month being rendered
  date.setDate(1);

  //get the div that contains the days on the page
  const monthDays = document.querySelector(".days");

  //gets last number of the current month
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  //gets last number previous month
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  //gets weekday of first day of month
  const firstDayIndex = date.getDay();

  //gets weekday of last day of month
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  //finds how many days of the next month to display
  const nextDays = 7 - lastDayIndex - 1;

  //array of each month to display the words for it
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  //array of numbers so that all numbers are 2 digit for day and month when created in id field
  const numbers = ["00",
    "01","02","03","04","05","06","07","08","09","10",
    "11","12","13","14","15","16","17","18","19","20",
    "21","22","23","24","25","26","27","28","29","30",
    "31"
  ];
  
  
  //sets the header telling the user the current month and year displayed
  document.querySelector(".date h1").innerHTML = months[date.getMonth()] + " " + date.getFullYear();

  //tells the user the current date and provides a link back to the current day
  document.querySelector(".date p").innerHTML = `` + new Date().toDateString() + ``;

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    let id = (date.getMonth() == 0 ? date.getFullYear()-1 : date.getFullYear()) + `-` + 
             numbers[(date.getMonth() == 0 ? 12 : date.getMonth())] + `-` + 
             numbers[prevLastDay - x + 1];
    
    days += `<div id="`+ id +`" class="prev-days">` +
              `<p id="`+ id +`-num" class="day-number">${prevLastDay - x + 1}</p>` + 
            `</div>`;
    
    displayTasks(id);
  }

  for (let i = 1; i <= lastDay; i++) {
    let id = date.getFullYear() + `-` + numbers[date.getMonth() + 1] + `-` + numbers[i];
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div id="`+ id +`" class="today">` +
                `<p id="`+ id +`-num" class="day-number">${i}</p>` + 
              `</div>`;
    } else {
      days += `<div id="`+ id +`">` +
                `<p id="`+ id +`-num" class="day-number">${i}</p>` + 
              `</div>`;
    }
    displayTasks(id);
  }

  for (let j = 1; j <= nextDays; j++) {
    let id = date.getFullYear() + `-` + numbers[date.getMonth() + 2] + `-` + numbers[j];
    days += `<div id="`+ id +`" class="next-days">` +
                `<p id="`+ id +`-num" class="day-number">${j}</p>` + 
            `</div>`;
    displayTasks(id);
  }
  monthDays.innerHTML = days;
};

// Function to display tasks in calendar view
function displayTasks(key) {
  console.log(key);
  let taskDesc = "";
  let count = 0;
  api_get_tasks(function(result){
    for (const task of result.tasks) {
      if(task.date == key){
        count++;
        if (count < 3) {
          taskDesc += `<p class="taskdesc">` + task.description + `</p>`;
        }
      }
    }
    if (count > 3)
      taskDesc += `<p>${count - 2} More . . .</p>`
    
    //append to day number tag
    console.log(taskDesc)
    $(`#${key}`).append(taskDesc);
  });
}

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

document.querySelector(".current-date-header").addEventListener("click", () => {
  date.setFullYear(new Date().getFullYear());
  date.setMonth(new Date().getMonth());
  date.setDate(new Date().getDate());
  renderCalendar();
})

$(document).ready(function() {
  renderCalendar();
});