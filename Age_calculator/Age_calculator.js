const dateInput = document.querySelector(".date")
const ageDisplayed = document.querySelectorAll(".ageNumber")
const button = document.querySelector(".button")

function GetAge(date) {

const dateArrayBirth = date.value.split("-");

const dateToday = new Date();

let ageYearMonth = {
    Year: dateToday.getFullYear() - dateArrayBirth[0],
    Month: dateToday.getMonth() + 1 - dateArrayBirth[1],
}

    if (ageYearMonth.Month < 0) {
        ageYearMonth.Month += 12
        ageYearMonth.Year--
    }

return ageYearMonth;

}

button.addEventListener("click", function () {
    let age = GetAge(dateInput)
    ageDisplayed[0].innerText = age.Year;
    ageDisplayed[1].innerText = age.Month;
})

