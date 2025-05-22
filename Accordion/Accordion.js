const button = document.querySelectorAll(".question");
const answer = document.querySelectorAll(".answer");
const svg = document.querySelectorAll(".icon");

let { length } = button;

for (let i = 0;length > i;i++) {
    button[i].addEventListener("click", function () {
            for (let g=0;answer.length > g;g++) {
                if (g === i) continue;
                if (!answer[g].classList.contains("hidden")) {
                    answer[g].classList.toggle("hidden");
                    svg[g].classList.toggle("-rotate-90")
                    svg[g].classList.toggle("rotate-180");
                }
            }
        answer[i].classList.toggle("hidden");
        svg[i].classList.toggle("-rotate-90")
        svg[i].classList.toggle("rotate-180")
    })
}
