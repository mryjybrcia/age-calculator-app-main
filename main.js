const form = document.getElementById("form");

const dayLabel = document.getElementById("day-label");
const dayInput = document.getElementById("day-input");
const dayRequired = document.getElementById("day-required");
const dayValid = document.getElementById("day-valid");
const validDate = document.getElementById("valid-date");

const monthLabel = document.getElementById("month-label");
const monthInput = document.getElementById("month-input");
const monthRequired = document.getElementById("month-required");
const monthValid = document.getElementById("month-valid");

const yearLabel = document.getElementById("year-label");
const yearInput = document.getElementById("year-input");
const yearRequired = document.getElementById("year-required");
const yearValid = document.getElementById("year-valid");
const submitBtn = document.getElementById("submit-btn");

const resultYears = document.getElementById("result-years");
const resultMonths = document.getElementById("result-months");
const resultDays = document.getElementById("result-days");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitBtn.classList.add("click");

  validation(event.target);

  setTimeout(() => {
    submitBtn.classList.remove("click");
  }, 350);
});

function validation(form) {
  const formData = new FormData(form);
  let validDay = false,
    validMonth = false,
    validYear = false;
  let birthdayDate,
    birthDay,
    birthMonth,
    birthYear,
    todayDate,
    currentDay,
    currentMonth,
    currentYear;
  todayDate = new Date();

  dayRequired.classList.add("hidden");
  dayValid.classList.add("hidden");
  validDate.classList.add("hidden");
  monthRequired.classList.add("hidden");
  monthValid.classList.add("hidden");
  yearRequired.classList.add("hidden");
  yearValid.classList.add("hidden");

  // ----- Validation -----
  if (formData.get("day") === "") {
    dayLabel.classList.add("invalid");
    dayInput.classList.add("invalid");
    dayRequired.classList.remove("hidden");
  } else if (formData.get("day") < 1 || formData.get("day") > 31) {
    dayLabel.classList.add("invalid");
    dayInput.classList.add("invalid");
    dayValid.classList.remove("hidden");
  } else {
    dayLabel.classList.remove("invalid");
    dayInput.classList.remove("invalid");

    validDay = true;
  }

  if (formData.get("month") === "") {
    monthLabel.classList.add("invalid");
    monthInput.classList.add("invalid");
    monthRequired.classList.remove("hidden");
  } else if (formData.get("month") < 1 || formData.get("month") > 12) {
    monthLabel.classList.add("invalid");
    monthInput.classList.add("invalid");
    monthValid.classList.remove("hidden");
  } else {
    monthLabel.classList.remove("invalid");
    monthInput.classList.remove("invalid");

    validMonth = true;
  }

  if (formData.get("year") === "") {
    yearLabel.classList.add("invalid");
    yearInput.classList.add("invalid");
    yearRequired.classList.remove("hidden");
  } else if (
    formData.get("year") < todayDate.getFullYear() - 110 ||
    formData.get("year") > todayDate.getFullYear()
  ) {
    yearLabel.classList.add("invalid");
    yearInput.classList.add("invalid");
    yearValid.classList.remove("hidden");
  } else {
    yearLabel.classList.remove("invalid");
    yearInput.classList.remove("invalid");

    validYear = true;
  }
  // ----------------------

  if (validDay === true && validMonth === true && validYear === true) {
    birthdayDate = new Date(
      formData.get("year"),
      formData.get("month") - 1,
      formData.get("day")
    );
    birthYear = birthdayDate.getFullYear();
    birthMonth = birthdayDate.getMonth();
    birthDay = birthdayDate.getDate();

    birthdayDate.setHours(0, 0, 0, 0);
    todayDate.setHours(0, 0, 0, 0);

    if (birthdayDate > todayDate) {
      dayLabel.classList.add("invalid");
      dayInput.classList.add("invalid");
      monthLabel.classList.add("invalid");
      monthInput.classList.add("invalid");
      yearLabel.classList.add("invalid");
      yearInput.classList.add("invalid");
      yearValid.classList.remove("hidden");
    } else if (
      !(formData.get("year") == birthYear) ||
      !(formData.get("month") - 1 == birthMonth) ||
      !(formData.get("day") == birthDay)
    ) {
      dayLabel.classList.add("invalid");
      dayInput.classList.add("invalid");
      monthLabel.classList.add("invalid");
      monthInput.classList.add("invalid");
      yearLabel.classList.add("invalid");
      yearInput.classList.add("invalid");
      validDate.classList.remove("hidden");
    } else {
      currentYear = new Date().getFullYear();
      currentMonth = new Date().getMonth();
      currentDay = new Date().getDate();

      if (currentDay < birthDay) {
        resultDays.innerHTML = currentDay - birthDay + 31;
        resultDays.classList.add("animate");
        currentMonth -= 1;
      } else {
        resultDays.innerHTML = currentDay - birthDay;
        resultDays.classList.add("animate");
      }

      if (currentMonth < birthMonth) {
        resultMonths.innerHTML = currentMonth - birthMonth + 12;
        resultMonths.classList.add("animate");
        currentYear -= 1;
      } else {
        resultMonths.innerHTML = currentMonth - birthMonth;
        resultMonths.classList.add("animate");
      }

      resultYears.innerHTML = currentYear - birthYear;
      resultYears.classList.add("animate");

      setTimeout(() => {
        resultDays.classList.remove("animate");
        resultMonths.classList.remove("animate");
        resultYears.classList.remove("animate");
      }, 600);
    }
  }
}
