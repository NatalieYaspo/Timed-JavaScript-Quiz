var gameTimer = document.querySelector("#gameTimer");
var activeQuestion = document.querySelector("#question");
var startButton = document.querySelector("#start-btn");


//Question Variable:
var ansCorrect = true;
var ansWrong = false;
var secondsLeft = 60;

//ACTIVE Items:
startButton.addEventListener("click", startGame) //tested with Cosole.log


//functions to play the game
function startGame() {
    setTimer();
    console.log("test");
}

function setTimer() {
//I need to add an ability for this to decrease when an incorrect answer is selected.
    var timeInterval = setInterval(function() {
        secondsLeft--;
        if (secondsLeft >= 0) {
            gameTimer.textContent = secondsLeft + " second(s) remaining";
            //keeps going through questions
        }
        if (secondsLeft === 0) {
            gameTimer.textContent = "";
            clearInterval(timeInterval);
            //moves to score screen
        }
    }, 1000);
}

function nextQuestion() {

}

function selectAnswer() {

}

function logScore() {

}

function refreshScores() {

}