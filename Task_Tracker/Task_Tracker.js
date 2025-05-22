const enterButton = document.querySelector(".EnterButton");
const input = document.querySelector(".inputText");
const listTask = document.querySelector(".taskList");


let dataTask = [];

function AddNewTask(text) {
    if (text === "") {
        return;
    } else {
        dataTask.push({content: `${text}`, completed:false});
        renderTask();
    }
}

function renderTask() {
    removeAllChilds(listTask);
    let lengthArray =  dataTask.length;
    dataTask.sort((a, b) => a.completed - b.completed);
    for (let i = 0;lengthArray > i ;i++) {
        const lineTaskTemp = tmpl.content.cloneNode(true);
        const [lineTask, stateButton, eraseButton] = CreateTaskElement(lineTaskTemp, i)
        listTask.append(lineTask);

            eraseButton.addEventListener("click", function () {
                // eraseButton.dataset.index = i; // Store the index on the button itself

                // const indexToDelete = parseInt(event.target.dataset.index);
                // if (!isNaN(indexToDelete)) { // Ensure we got a valid number
                dataTask.splice(i, 1, )
                renderTask()
            })

            stateButton.addEventListener("click", function () {
                if (dataTask[i].completed === false) {
                    dataTask[i].completed = true;
                    renderTask();
                } else {    
                    dataTask[i].completed = false;
                    renderTask();
                }
            })

    }
}

function CreateTaskElement(taskObject, index) {
    let array = []
        taskObject.querySelector(".textTask").textContent = dataTask[index].content;
        const eraseButton = taskObject.querySelector(".eraseButton");
        const stateButton = taskObject.querySelector(".stateButton");
        const textLine = taskObject.querySelector(".textTask");
        if (dataTask[index].completed === true) {
            stateButton.classList.add("bg-gray-500");
            textLine.classList.add("text-gray-500", "line-through");
            
        } else if (dataTask[index].completed === false){
            stateButton.classList.remove("bg-gray-500");
            textLine.classList.remove("text-gray-500", "line-through");
        }
        return array = [taskObject, stateButton, eraseButton]
}


function removeAllChilds(node) {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
    return;
}


enterButton.addEventListener("click", function () {
    AddNewTask(input.value);
    input.value = "";

})

window.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
    AddNewTask(input.value);
    input.value = "";

}
})