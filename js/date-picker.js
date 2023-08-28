const dateTable = document.getElementById("dateTable");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const currentMonthYearSpan = document.getElementById("currentMonthYear");

let currentDate = new Date();
let selectedDateCell = null;

function populateDates() {
  dateTable.innerHTML = "";

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const locale = document.documentElement.lang;

  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // Add translated day labels for Vietnamese
  if (locale === "vi-VN") {
    daysOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  }

  const daysOfWeekRow = document.createElement("tr");
  daysOfWeek.forEach((day) => {
    const dayLabelCell = document.createElement("th");
    dayLabelCell.textContent = day;
    daysOfWeekRow.appendChild(dayLabelCell);
  });
  dateTable.appendChild(daysOfWeekRow);

  let dateCounter = 1;

  for (let week = 0; week < 6; week++) {
    const row = document.createElement("tr");
    for (let day = 0; day < 7; day++) {
      const cell = document.createElement("td");

      if (week === 0 && day < firstDayIndex) {
        cell.classList.add("empty");
      } else if (dateCounter <= daysInMonth) {
        cell.textContent = dateCounter;

        // Apply disabled styles to weekends and December 24th
        if (day === 0 || day === 6 || (currentDate.getMonth() === 11 && dateCounter === 24)) {
          cell.classList.add("disabled");
        }

        // Add event listener for date selection
        cell.addEventListener("click", () => {
          if (selectedDateCell) {
            selectedDateCell.classList.remove("selected");
          }
          cell.classList.add("selected");
          selectedDateCell = cell;

          // Log the selected date
          console.log(
            `Selected date: ${currentDate.getFullYear()}-${
              currentDate.getMonth() + 1
            }-${dateCounter}`
          );
        });

        dateCounter++;
      } else {
        cell.classList.add("empty");
      }

      row.appendChild(cell);
    }
    dateTable.appendChild(row);
  }
}

function updateMonthDisplay(locale) {
  console.log(locale);
  const options = { year: "numeric", month: "long" };
  const monthYearString = currentDate.toLocaleDateString(locale, options);
  currentMonthYearSpan.textContent = monthYearString;
}

document.addEventListener("DOMContentLoaded", () => {
  populateDates();
  updateMonthDisplay();

  const languageButtons = document.querySelectorAll("button[id^='en-'], button[id^='vi-']");

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const locale = button.id; // Use the button's ID as the locale

      document.documentElement.lang = locale; // Set the document language attribute

      // Update day labels and placeholder text
      let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // Use let instead of const
      if (locale === "vi-VN") {
        daysOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
      }

      const dayLabels = document.querySelectorAll("th");
      dayLabels.forEach((label, index) => {
        label.textContent = daysOfWeek[index];
      });

      // Update month display and date table
      currentDate = new Date();
      populateDates();
      updateMonthDisplay(locale);

      if (locale === "vi-VN") {
        prevMonthButton.textContent = "Tháng trước";
        nextMonthButton.textContent = "Tháng sau";
      } else {
        prevMonthButton.textContent = "Previous";
        nextMonthButton.textContent = "Next";
      }
    });
  });

  prevMonthButton.addEventListener("click", () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    populateDates();
    updateMonthDisplay(document.documentElement.lang);
  });

  nextMonthButton.addEventListener("click", () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    populateDates();
    updateMonthDisplay(document.documentElement.lang);
  });
});

populateDates();
updateMonthDisplay(document.documentElement.lang);
