const myButton = document.querySelector(".buttonxdd");
const myText = document.querySelector(".myText");

function myFunction(aDiv) {
    let OpacityReduce = 90;
    let movingReduce = 1;
    const Anim = setInterval((x) => {
            aDiv.classList.remove(`text-white/${OpacityReduce}`)
            aDiv.classList.remove(`-translate-y-${movingReduce}`)
            OpacityReduce -= 10;
            movingReduce += 1
            aDiv.classList.add(`text-white/${OpacityReduce}`)
            aDiv.classList.add(`-translate-y-${movingReduce}`)

            if (OpacityReduce === 0) {
                clearInterval(Anim)
                basicState(aDiv);
            }
        }, 100)
    return;
}

function basicState(aDiv) {
    aDiv.classList = "";
    aDiv.classList.add("text-white/100", "-translate-y-0", "transform", "transition-all", "hidden", "myText");
}

myButton.addEventListener("click", function() {
    myText.classList.remove("hidden")
    setTimeout((x) => {myFunction(myText)}, 3000);
})




