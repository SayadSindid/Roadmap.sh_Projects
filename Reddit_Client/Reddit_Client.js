const popupAddSub = document.querySelector(".popupSubreddit");
const addingZone = document.querySelector(".addingZone");
let templateNewLane = document.querySelector(".templateNewLane").content.firstElementChild;
const buttonAddSubreddit = document.querySelector(".buttonAddSub");
const lineZone = document.querySelector(".lineZone");
let inputNameSubreddit = document.querySelector(".inputNameSubreddit").value;
const informationMessage = popupAddSub.querySelector(".information-Message");
const alertBox = document.querySelector(".alert-Box");

const storageKey = "RedditClientSate_v1";
let StringMessage = "";
let openedPopup = "";
let SubredditLane = [];

function storeToLocalStorage() {
    localStorage.setItem(storageKey, JSON.stringify(SubredditLane));
}

function exportFromLocalStorage() {
    if (localStorage.getItem(storageKey) === null) return [];
    const ArrayExported = localStorage.getItem(storageKey);

    try {
        if (ArrayExported) {
            return JSON.parse(ArrayExported);
        }
    } catch (error) {
        console.log("Error while exporting previous Data: ", error);
        localStorage.removeItem(storageKey);
        // a function that show a message or a popup saying that Data were corrupted after your last visit, we couldn't recover it.
        showAlertMessage("Previous data has been corrupted, they couldn't be recovered.")
        return [];
    }

}

document.body.addEventListener("click", function() {
    if ((event.target.closest(".plusShowPopup") === null)) {
        return;
    }
    popupAddSub.classList.toggle("hidden");
});

lineZone.addEventListener("click", function(event) {
    let target = event.target;
    if (target.closest(".dotMenu") === null) {

        if (target.closest(".delete-button") !== null) {
            let nameSubToDelete = findNameSubreddit(target);
            deleteSubreddit(nameSubToDelete);
            return null;
        } else if (target.closest(".refresh-button") !== null) {
            let nameSubtoRefresh = findNameSubreddit(target);
            refreshSubreddit(nameSubtoRefresh);
        }
    } else {
        closeAllMenu();
        let currentColumnSub = target.closest(".dotMenu").parentElement.parentElement.querySelector(".columnSub");
        let currentPopupStateSub = target.closest(".dotMenu").parentElement.parentElement.querySelector(".popupStateSub");
        currentPopupStateSub.classList.toggle("hidden");
        currentColumnSub.classList.toggle("opacity-30");
        openedPopup = currentPopupStateSub;
        return null;
    }


});

document.body.addEventListener("click", function() {
    if (openedPopup === "") {
        return;
    } else if (!openedPopup.classList.contains("hidden") && (event.target.closest(".dotMenu") === null) && (!openedPopup.contains(event.target))) {
        openedPopup.classList.add("hidden");
        const ColumnLaneOfOpenedPopup = openedPopup.closest(".laneSubreddit").querySelector(".columnSub");
        ColumnLaneOfOpenedPopup.classList.remove("opacity-30")
    }
})

document.addEventListener("click", function() {
    if (!popupAddSub.classList.contains("hidden") && (event.target.closest(".plusShowPopup") === null) && (!popupAddSub.contains(event.target))) {
        popupAddSub.classList.add("hidden");
    }
})


buttonAddSubreddit.addEventListener("click", async function() {
    hidePopupMessage();
    inputNameSubreddit = document.querySelector(".inputNameSubreddit").value;
    StringMessage = "Loading..."
    changeToNotifState(StringMessage);
    const SubResponse = await addNewSubreddit(inputNameSubreddit);
    if (SubResponse === null) return null;
    hidePopupMessage();
    renderAllLanes();

})


window.addEventListener("load", function() {
    SubredditLane = exportFromLocalStorage();
    renderAllLanes();
    return null;
})

document.addEventListener('keydown', async function(e) {
    if (e.key === "Enter" && !popupAddSub.classList.contains("hidden")) {
        hidePopupMessage();
        inputNameSubreddit = document.querySelector(".inputNameSubreddit").value;
        StringMessage = "Loading..."
        changeToNotifState(StringMessage);
        const SubResponse = await addNewSubreddit(inputNameSubreddit);
        if (SubResponse === null) return null;
        hidePopupMessage();
        renderAllLanes();
    
    }
});

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        popupAddSub.classList.add("hidden");
        closeAllMenu();
    }
})


function findNameSubreddit(target) {
    let theLane = target.parentElement.parentElement;
    return theLane.querySelector(".titleSubreddit").innerText.slice(3);
}

async function refreshSubreddit(name) {

    try {
        const refreshedSubreddit =  await fetchRedditAPI(name);
        for (let i = 0;i < SubredditLane.length;i++) {
            if (SubredditLane[i].name === name) {
                SubredditLane.splice(i,1, refreshedSubreddit);
                break;
            }
        }
    renderAllLanes();
    return null;

    } catch (error) {
        showAlertMessage("A problem happenened during the refresh.")
        return null;
    }

}

function deleteSubreddit(name) {
    for (let i = 0;i < SubredditLane.length;i++) {
        if (SubredditLane[i].name === name) {
            SubredditLane.splice(i,1);
            break;
        }
    }
    renderAllLanes();
    return null;
}

function closeAllMenu() {
    let popupStateSubAll = document.querySelectorAll(".popupStateSub");
    for (let i = 0; i < popupStateSubAll.length;i++) {
        if (!popupStateSubAll[i].classList.contains("hidden")) {
            const foundLane = popupStateSubAll[i];
            const ColumnFoundLane = foundLane.closest(".laneSubreddit").querySelector(".columnSub");
            foundLane.classList.add("hidden");
            ColumnFoundLane.classList.remove("opacity-30");
            return;
        }
    }
}


async function fetchRedditAPI(nameSubreddit) {
    const apiURL = `https://www.reddit.com/r/${nameSubreddit}.json`;

    try {

        const response = await fetch(apiURL);
                if (!response.ok) {
                    throw new Error(`HTTP Request Error status:${response.status} for/r/${nameSubreddit}`);
                }
                const data = await response.json();
            

            if (data && data.data && data.data.children) {
                return {
                    name: nameSubreddit,
                    posts: data.data.children.map((x) => ({
                    postTitle: x.data.title,
                    author: x.data.author,
                    score: x.data.score,
                    content: x.data.selftext
                })).filter((x) => x.content !== "")
            }
            } else {
                throw new Error(`No data or unexpected data structure for /r/${nameSubreddit}`)
            }
        } catch (error) {
                console.error("Error fetching Reddit API for", nameSubreddit, error)
                throw error;
            }

}


async function addNewSubreddit(title) {
    if (title === "") {
        return null;
    } else if (SubredditLane.length >= 5) {
        StringMessage = "Error the maximum amount of Subreddit has been added.";
        changeToErrorState(StringMessage);
        return null;
    } else {

        for (let i = 0; i < SubredditLane.length; i++) {
            if (SubredditLane[i].name.toLowerCase() === title.toLowerCase()) {
                StringMessage = "This Subreddit already exist.";
                changeToErrorState(StringMessage);
                return null;
            }
        }

        try {
            hidePopupMessage();
            const newSubredditData = await fetchRedditAPI(title);
            SubredditLane.push(newSubredditData);
        } catch (error) {
            console.log("Failed to fetch", error);
            changeToErrorState(error);
            return null;
        }
        
    }
}

function changeToErrorState(error) {
    if (error.message) {
        informationMessage.innerText = error.message;
    } else {
        informationMessage.innerText = error;
    }
    informationMessage.classList.remove("hidden");
    informationMessage.classList.remove("text-blue-600");
    informationMessage.classList.add("text-red-600");

}

function changeToNotifState(message) {
    informationMessage.innerText = message;
    informationMessage.classList.remove("hidden");
    informationMessage.classList.remove("text-red-600");
    informationMessage.classList.add("text-blue-600");
}

function hidePopupMessage() {
    informationMessage.classList.add("hidden");
    // Just in case if some residual colors classes are still there
    informationMessage.classList.remove("text-red-600");
    informationMessage.classList.remove("text-blue-600");

}

function showAlertMessage(text) {
    alertBox.querySelector(".inner-text").innerText = text;
    let opacity = 100;
    let movingStep = 0;
    const basicState = alertBox.classList.toString();
    alertBox.classList.remove("hidden");

    setTimeout(() => {
        
    const fadingAnim = setInterval(() => {
        alertBox.classList.remove(`-translate-y-${movingStep}`);
        alertBox.classList.remove(`opacity-${opacity}`);
        opacity -= 10;
        movingStep++;
        alertBox.classList.add(`opacity-${opacity}`);
        alertBox.classList.add(`-translate-y-${movingStep}`);

        if (opacity <= 0) {
            clearInterval(fadingAnim);    
            alertBox.className = basicState;
            console.log(alertBox.className);
            return null;
        }

    }, 110);    
    }, 2500);
    



}


async function renderAllLanes() {
    removeAllLanes(lineZone)

    for (let i = 0;i < SubredditLane.length;i++) {
        let newSubredditLane = templateNewLane.cloneNode(true);

            newSubredditLane.querySelector(".titleSubreddit").innerText = `/r/${SubredditLane[i].name}`;
            const newSubredditColumnSub = newSubredditLane.querySelector(".columnSub");

            for (let j = 0; j < SubredditLane[i].posts.length;j++) {
                let newRedditPost = newSubredditLane.querySelector(".postTemplate").cloneNode(true);
                newRedditPost.querySelector(".scoreUpvote").innerText = SubredditLane[i].posts[j].score;
                newRedditPost.querySelector(".postTile").innerText = SubredditLane[i].posts[j].postTitle;
                newRedditPost.querySelector(".authorPost").innerText = SubredditLane[i].posts[j].author;
                newRedditPost.querySelector(".contentPost").innerText = SubredditLane[i].posts[j].content;
                newSubredditColumnSub.appendChild(newRedditPost);
            }
        newSubredditColumnSub.firstElementChild.remove();    
        lineZone.appendChild(newSubredditLane);
    }

    storeToLocalStorage();
}

function removeAllLanes(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }

    return null;
}

