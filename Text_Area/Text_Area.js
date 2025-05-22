const charCount = document.querySelector(".count");
const textString = document.querySelector(".string");
const counter = document.querySelector(".counter");

const OVERFLOW_CLASSES = {
    input: ["border-red-600", "text-red-600"],
    border: "focus:ring-4",
    counter: "text-red-600",
};


textString.addEventListener("input", function () {
    charCount.innerText = +this.value.length;
    let limitReached = charCount.innerText >= 250;

    for (let i = 0;OVERFLOW_CLASSES.input.length > i;i++) {
        textString.classList.toggle(OVERFLOW_CLASSES.input[i], limitReached);
    }
        textString.classList.toggle(OVERFLOW_CLASSES.border, !limitReached);
        counter.classList.toggle(OVERFLOW_CLASSES.counter, limitReached);

});