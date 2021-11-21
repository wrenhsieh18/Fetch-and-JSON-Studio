// TODO: add code here
const displayArrayWithSpace = (arr) => {
    if (arr.length === 1) {
        return arr[0];
    } else {
        return arr.shift() + ", " + displayArrayWithSpace(arr);
    }
}

const outputHTML = (obj) => {
    return `
        <div class="astronaut">
            <div class="bio">
                <h3>${obj.firstName} ${obj.lastName}</h3>
                <ul>
                    <li>Hours in space: ${obj.hoursInSpace}</li>
                    <li class = "activity">Active: ${obj.active}</li>
                    <li>Skills: ${displayArrayWithSpace(obj.skills)}</li>
                </ul>
            </div>
            <img class="avatar" src="${obj.picture}">
        </div>`;
}

const init = () => {
    const allCrewDisplay = document.getElementById("container");
    fetch("https://handlers.education.launchcode.org/static/astronauts.json").then( (response) => {
        console.log(response);
        response.json().then( (json) => {
            console.log(json);
            let allHoursInSpace = [];
            for (let astronaut of json) {
                allHoursInSpace.push(astronaut.hoursInSpace);
            }
            allHoursInSpaceSorted = allHoursInSpace.sort((a, b) => {return b - a})
            for (let hours of allHoursInSpaceSorted) {
                for (let astronaut of json) {
                    if (hours === astronaut.hoursInSpace) {
                        allCrewDisplay.innerHTML += outputHTML(astronaut);
                    }
                }
            }
            const allActivity = document.getElementsByClassName("activity");
            for (i = 0; i < allActivity.length; i++) {
                if (allActivity[i].innerHTML === "Active: true") {
                    allActivity[i].style.color = "green";
                }
            }
            const countOfAstronauts = document.getElementById("count");
            countOfAstronauts.innerHTML = `Total Count of Astronauts: ${json.length}`;
        })
    })
}

window.addEventListener("load", init)