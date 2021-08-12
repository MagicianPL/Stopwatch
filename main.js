const questionMark = document.querySelector(".fa-question");
const brush = document.querySelector(".fa-paint-brush");
const stopWatch = document.querySelector(".stopwatch");
const time = document.querySelector(".time");
const start = document.querySelector(".start");
const pause = document.querySelector(".pause");
const stop = document.querySelector(".stop");
const reset = document.querySelector(".reset");
const history = document.querySelector(".history");
const timeList = document.querySelector(".time-list");
const modalShadow = document.querySelector(".modal-shadow");
const closeModal = document.querySelector(".close");

const colors = document.querySelector(".colors");
const firstColor = document.querySelector(".one");
const secondColor = document.querySelector(".two");
const thirdColor = document.querySelector(".three");
const root = document.documentElement;

let timesArr = [];

let minutes = 0;
let seconds = 0;

let counting;

/*Poniżej funkcja, która ma w sobie funkcję, która odmierza czas wraz z setInteval tej funkcji*/
const startCount = () => {
    clearInterval(counting); //Kiedy użytkownik kliknie kolejny raz start
     counting = setInterval(() => {
        if (seconds < 9) {
            seconds++;
            stopWatch.textContent = `${minutes}:0${seconds}`;
        } else if (seconds >= 9 && seconds < 59) {
            seconds ++;
            stopWatch.textContent = `${minutes}:${seconds}`;
        } else if (seconds >= 59) {
            seconds = 0;
            minutes ++;
            stopWatch.textContent = `${minutes}:0${seconds}`;
        };
     }, 1000);  
};

const pauseFn = () => { //pauzowanie czasu
    clearInterval(counting); //czyszczę interval z funkcji, więc funkcja się "zatrzymuje"
};

const stopNow = () => { //Fn stopuje stoper
    if (stopWatch.textContent !== `0:00`) {
        time.style.visibility = "visible";
        time.textContent = `Ostatni czas: ${stopWatch.textContent}`;
        timesArr.push(stopWatch.textContent);
    };
    
    clearAll();
};

const resetAll = () => { //Fn resetuje wszystko
    clearAll();
    time.style.visibility = "hidden";
    timesArr = [];
};

const clearAll = () => {
    clearInterval(counting);
    stopWatch.textContent = `0:00`;
    timeList.textContent = "";
    minutes = 0;
    seconds = 0;
};

const showTimes = () => {
    let counter = 1;
    timeList.textContent = "";
    timesArr.forEach(time => {
        const li = document.createElement("li");
        li.innerHTML = `Pomiar nr ${counter}: <span>${time}</span>`;
        timeList.append(li);
        counter++;
    });
};

const showModal = () => {
    modalShadow.classList.toggle("modal-animation");
    if (modalShadow.style.display !== "block") {
        modalShadow.style.display = "block";
    } else {
        modalShadow.style.display = "none";
    };
};

const showColors = () => { //Pokazuje paletę kolorów do wyboru
    colors.classList.toggle("show-colors");
};

const changeColor = (e)=> { //Zmieniam kolor w zależności od e.target
    const choice = e.target;

    if (choice.classList.contains("one")) {
        root.style.setProperty('--first-color', 'rgb(250, 20, 6)');
    } else if (choice.classList.contains("two")) {
        root.style.setProperty('--first-color', 'rgb(6, 173, 250)');
    } else if (choice.classList.contains("three")) {
        root.style.setProperty('--first-color', 'rgb(0, 255, 42)');
    };
};

start.addEventListener("click", startCount);
pause.addEventListener("click", pauseFn);
stop.addEventListener("click", stopNow);
reset.addEventListener("click", resetAll);
history.addEventListener("click", showTimes);

questionMark.addEventListener("click", showModal);
closeModal.addEventListener("click", showModal);
window.addEventListener("click", e => e.target.classList.contains("modal-shadow") ? showModal() : false);

brush.addEventListener("click", showColors);
colors.addEventListener("click", changeColor);