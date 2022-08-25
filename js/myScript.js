let missionData = document.getElementById("missionData")
let missionDate = document.getElementById("missionDate")
let missionTime = document.getElementById("missionTime")
let missions = []

let changeDateFormat = (date) => { //Set the Date as DD/MM/YYYY
    x = date.split('-');
    return x[2] + '/' + x[1] + '/' + x[0]
}

let addMission = (data, date, time) => {
    date = changeDateFormat(date)
    index = new Date(); //required to arrange the notes by time of assignment
    mission = { index: index, data: data, date: date, time: time }
    localStorage.setItem(data, JSON.stringify(mission))
    getLocalStorage()
    showNotes()
}

let remMission = (data) => {
    localStorage.removeItem(data)
    getLocalStorage()
    showNotes(false)
}

getLocalStorage = () => {
    missions = []
    for (let i = 0, len = localStorage.length; i < len; ++i) {
        missions.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        missions.sort(function (a, b) {
            const indexA = a.index
            const indexB = b.index
            if (indexA < indexB) {
                return -1;
            }
            if (indexA > indexB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
    }
}

showNotes = (fade = true) => { // add fade in to variable and shorten code
    noteLoc.innerHTML = ""
    for (let i = 0; i < missions.length; i++) {
        if (i == missions.length - 1 && fade == true) classInfo = "col-auto my-4 note-bg ms-2 pt-4 pb-4 pe-4 position-relative animate__animated animate__fadeInUp"
        else classInfo = "col-auto my-4 note-bg ms-2 pt-4 pb-4 pe-4 position-relative"
        
        noteLoc.innerHTML += `
            <div class="${classInfo}"
                onmouseover="document.getElementById('icon${i}').style.display = 'block';" onmouseout="document.getElementById('icon${i}').style.display = 'none';">
                <i id="icon${i}" class="bi bi-x-square-fill position-absolute top-0 end-0 pt-3 pe-4"
                    style="font-size: 1rem; color: black; display: none;" onclick="remMission(document.getElementById('noteData${i}').innerHTML)"></i>
                <div id="noteData${i}" class="note-txt overflow-auto">${missions[i].data}</div>
                <div class="mt-2">${missions[i].date}</div>
                <div>${missions[i].time}</div>
            </div>
        `
    }
}

getLocalStorage()
showNotes()