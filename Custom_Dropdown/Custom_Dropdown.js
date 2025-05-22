const dropdownList = document.querySelector(".DropdownList");
const dropdownButton = document.querySelector(".DropdownButton");
const dropdownItem = document.querySelectorAll(".DropdownItem");
const mainItem = document.querySelector(".mainItem");

const arrayItems = [...dropdownItem];
const arrayItemsLength = arrayItems.length;

let currentItemPos = null;

function UpdateItemState(itemPos) {
        if (currentItemPos !== null) {
            const previousElement = document.querySelector(`[data-item='${currentItemPos}']`);
            previousElement.removeChild(previousElement.lastChild)
        }
    const element = document.querySelector(`[data-item='${itemPos}']`);
    const template = document.getElementById("template")
    const Checkmark = template.content.querySelector(".svgCheckmark").cloneNode(true);
    currentItemPos = itemPos;
    mainItem.innerText = element.innerText;
    dropdownList.classList.toggle("hidden");
    element.appendChild(Checkmark);
    return;
}


dropdownButton.addEventListener("click", function () {
    dropdownList.classList.toggle("hidden");
    dropdownButton.children[1].classList.toggle("rotate-180")
    dropdownButton.children[1].classList.toggle("rotate-360")
})

    for (let i = 0;arrayItemsLength > i;i++) {
        arrayItems[i].addEventListener("click", function () {
            UpdateItemState(arrayItems[i].dataset.item);
        })
    }

