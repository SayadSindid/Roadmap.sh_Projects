const windowDropdown = document.querySelector(".dropdownwindow");
const buttonDropdown = document.querySelector(".dropdownButton");
const arrowSvg = document.querySelector(".arrowSVG")
const lineSeperatorLanguage = document.querySelector(".languageSeparator")
const liOriginal = document.querySelector(".languageDropdown")
const languageSelectionZone = document.querySelector(".languageSelectionZone")
const refreshButton = document.querySelector(".refreshButton");
const errorButton = document.querySelector(".errorButton");
const afterBody = document.querySelector(".afterBody");

    fetch('https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Request Error status:${response.status}`)
            }
        return response.json(); 
        })
        .then(data => {
            let dataLength = data.length;
            for (let i = 0;dataLength > i;i++) {
                if (data[i].value !== "" && data[i].value !== "JavaScript") {
                    let listTemplate = liOriginal.cloneNode(true)
                    listTemplate.innerText = data[i].title
                    listTemplate.dataset.language = data[i].value
                    windowDropdown.appendChild(listTemplate)
                    windowDropdown.appendChild(lineSeperatorLanguage.cloneNode(true))
                }
            }
        })
        .catch(error => {
            // Optional but important: Handle errors (network failed, server down, etc.)
            console.error('Error fetching languages:', error);
            // Maybe display an error message to the user?
        });

function colorFetching (languageName) {
    return fetch("https://raw.githubusercontent.com/ozh/github-colors/refs/heads/master/colors.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Request Error status:${response.status}`)
            }
            return response.json();
        }
    )
        .then(data => {
            return data[languageName].color;
        })
        .catch(error => {
            console.error("Error fetching GitHub Database", error)
        })
}


function fetchGithubAPI(languageWanted) {
    const apiUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(`language:${languageWanted}`)}`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Request Error status:${response.status}`)
            }
            return response.json();
        }
    )
        .then(data => {
            let arrayLength = data.items.length;
            let randomRepoNumber = Math.floor(Math.random() * arrayLength);
            return data.items[randomRepoNumber];
        })
        .catch(error => {
            console.error("Error fetching GitHub Database", error)
            if (!refreshButton.classList.contains("hidden")) {
                refreshButton.classList.add("hidden");
            }
            errorButton.classList.remove("hidden");
            changeToErrorState();
        })
}

function reloadStateRepo(clickedLanguage) {
    const templateRepoHTML = document.querySelector("#TemplateLanguageInfos");
    const originalRepoDiv = templateRepoHTML.content.children[0];
    const RepoDiv = originalRepoDiv.cloneNode(true)    

    fetchGithubAPI(clickedLanguage)
        .then(languageObject => {
                colorFetching(clickedLanguage)
                    .then(colorValue => {
                        RepoDiv.children[2].children[0].classList.add(`bg-[${colorValue}]`)
                    })
                RepoDiv.children[0].innerText = languageObject.name;
                RepoDiv.children[1].innerText = languageObject.description;
                RepoDiv.children[2].children[1].innerText = languageObject.language;
                RepoDiv.children[2].children[3].innerText = languageObject.stargazers_count;
                RepoDiv.children[2].children[5].innerText = languageObject.forks_count;
                RepoDiv.children[2].children[7].innerText = languageObject.open_issues;
                afterBody.children[2].replaceWith(RepoDiv);
                refreshButton.classList.remove("hidden");
        })
}

function changeToErrorState() {
    afterBody.children[2].replaceWith(languageSelectionZone);
    languageSelectionZone.classList.remove("bg-gray-600/20");
    languageSelectionZone.classList.add("bg-red-600/20");
    languageSelectionZone.innerText = "Error fetching repositories";
}




buttonDropdown.addEventListener("click", function() {
    arrowSvg.classList.toggle("rotate-180");
    windowDropdown.classList.toggle("hidden");
})

document.body.addEventListener("click", function() {
    if (!windowDropdown.classList.contains("hidden") && !windowDropdown.contains(event.target) && !buttonDropdown.contains(event.target)) {
        windowDropdown.classList.add("hidden");
        arrowSvg.classList.toggle("rotate-180");
    }
})

windowDropdown.addEventListener("click", function() {
    if (event.target.tagName === "LI") {
        let languageValue = event.target.dataset.language;
        let languageTitle = event.target.innerText;
        const waitingText = "Loading, please wait...";
        buttonDropdown.children[0].innerText = languageTitle;
        buttonDropdown.classList.add("font-['Winky_Rough']", "text-lg")
        windowDropdown.classList.add("hidden");
        languageSelectionZone.innerText = waitingText;
        reloadStateRepo(languageValue);
    }
})

refreshButton.addEventListener("click", function() {
    reloadStateRepo(buttonDropdown.children[0].innerText);
})

errorButton.addEventListener("click", function() {
    reloadStateRepo(buttonDropdown.children[0].innerText);
    errorButton.classList.add("hidden")
})