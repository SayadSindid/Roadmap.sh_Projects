let nodeListButtons = document.querySelectorAll(".button")
let container = document.querySelectorAll(".thingy")

// Far more optimised code, Scalable but only to a certain point like 20 tab max maybe
    for (let i = 0; i < nodeListButtons.length;i++) {
        nodeListButtons[i].addEventListener('click', function() {
            let tabValue = this.dataset.tab;
            let containerSelector = `[data-div="${tabValue}"]`;
            let ContainerListening = document.querySelector(containerSelector);
            for (let j=0;j < container.length;j++) {
                container[j].classList.add("hidden")
            }
            ContainerListening.classList.remove("hidden");
            // console.log(ContainerListening);
        })
        // console.log(nodeListButtons[i].dataset.tab)    
    }

const modal = document.querySelector(".modal");
const modalButton = document.querySelectorAll(".modalButton")

    function Clickhandling(event) {
        const clickedButton = event.currentTarget;
        modal.classList.add("hidden");
        localStorage.setItem("CookieSave", clickedButton.dataset.cookie);
        clickedButton.removeEventListener('click', Clickhandling)
    }

    

    if (localStorage.getItem("CookieSave") !== "Accepted") {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        for (let g=0; g < modalButton.length;g++) {
            modalButton[g].addEventListener(('click'), Clickhandling);
        }
    }

        


// Not Optimised and not scalable since I need to add a case everytime

// for (let i = 0 ;i < nodeListButtons.length;i++) {
//     nodeListButtons[i].addEventListener('click', () => {
//         switch(i) {
//             case 0 :
//                 container.textContent = `CONTENT OF TAB 1DSQDQS`;
//                 break;
//             case 1 :
//                 container.textContent = `CONTENT OF TAB 2LDMS¨FSF`
//                 break;
//             case 2 :
//                 container.textContent = `CONTENT OF TAB 3fdsfsdf`
//                 break;
//             case 3 :
//                 container.textContent = `CONTENT OF TAB 4dsd`
//                 break;
//         }
// });
// }


