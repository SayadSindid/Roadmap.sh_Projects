const button = document.querySelectorAll(".buttonInteraction");
const flashcardContent = document.querySelector(".flashcardZone");
const progressBar = document.querySelector(".progressBar")

let flashcard = {
    1: {questions: "What is the difference between var, let and const ?", answer:"In javascript, var is a function-scoped and can be re-declared; let and const are block-scoped, with let allowing re-assignement and const preventing it. However, const objects can have their contents modified"},
    2: {questions: "q2", answer:"a2"},
    3: {questions: "q3", answer:"a3"},
    4: {questions: "q4", answer:"a4"},
    5: {questions: "q5", answer:"a5"},
    6: {questions: "q6", answer:"a6"},
    7: {questions: "q7d", answer:"a7"},
    8: {questions: "q8", answer:"a8"},
    9: {questions: "q9", answer:"a9"},
    10: {questions: "q10", answer:"a10"},
    11: {questions: "q11", answer:"a11"},
    12: {questions: "q12", answer:"a12"},
}

let CurrentFlashcard = 1;
const numberFlashcard = Object.keys(flashcard).length;


function UpdatePercent(curr) {
    const currentPercent = Number((curr / numberFlashcard * 100).toFixed(2)) + "%";
    return progressBar.style.width = currentPercent
}

UpdatePercent(CurrentFlashcard)

function UpdateFlashcard(State) {
    if (State === "Next") {
        if (CurrentFlashcard === numberFlashcard) {
            return;
        } else {
            return flashcardContent.innerText = flashcard[CurrentFlashcard + 1].questions;
        }
    } else {
        if (CurrentFlashcard === 1) {
            return;
        } else {
            return flashcardContent.innerText = flashcard[CurrentFlashcard - 1].questions
            }
        }
}


    for (let i = 0;button.length > i;i++) {
        button[i].addEventListener("click", function () {
            switch (i) {
                case 0:
                    flashcardContent.innerText = flashcard[CurrentFlashcard].answer;
                    break;
                case 1:
                    UpdateFlashcard("Next");
                    CurrentFlashcard === numberFlashcard ? CurrentFlashcard = numberFlashcard : CurrentFlashcard++;
                    UpdatePercent(CurrentFlashcard);
                    break;
                case 2:
                    UpdateFlashcard("Previous");
                    CurrentFlashcard === 1 ? CurrentFlashcard = 1 : CurrentFlashcard--;
                    UpdatePercent(CurrentFlashcard);
                    break;
            }
        })
    }
