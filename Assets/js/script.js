var gameTimer = document.querySelector("#gameTimer");
var questionContainerEl = document.querySelector("#question-container");
var startButton = document.querySelector("#start-btn");
var questionEl = document.querySelector("#question");
var ansButtonEl = document.querySelector("btn");
var formEl = document.querySelector("#initials-frm");
var submitButton = document.querySelector("#submit-btn");
var gameScore = document.querySelector("#gameScore");
var newScore = document.querySelector("#newScore");

//Question Variable:
var secondsLeft = 60;
let currentQuestionIndex
var scoreCounter = 0;

//ACTIVE Items:
startButton.addEventListener("click", startGame) //tested with Cosole.log
submitButton.addEventListener("click", logInitialsScore)//NOT TESTED

//functions to play the game
function startGame() {
    setTimer();
    startButton.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    // shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    setNextQuestion();
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
            questionContainerEl.classList.add('hide');
            showScore();
            gameScore.classList.remove('hide');
        }
    }, 500);
}


function setNextQuestion() {
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button');
    })
}

function selectAnswer() {

}

function showScore() {

}

function getHighScores () { //I have no idea if this will work.  I may need to rework.
    var storedScores = localStorage.getItem("newScore");
    if (storedScores === null) {
        highScores = showScore.value
    } else {
        highScores = storedScores;
    }
}

function logInitialsScore() {
    scoreCounter.textContent = scoreCounter;
    localStorage.setItem("newScore", scoreCounter);
}

function refreshScores() {

}

//list of questions:
const questions = [
    {
        question: "This is my first question?",
        answers: [
            { text: "A: Yes", correct: true},
            { text: "B: No", correct: false},
            { text: "C: No", correct: false},
            { text: "D: No", correct: false},
        ]
    }
]