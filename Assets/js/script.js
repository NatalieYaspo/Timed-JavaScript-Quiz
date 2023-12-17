var gameTimer = document.querySelector("#gameTimer");
var questionContainerEl = document.querySelector("#question-container");
var startButton = document.querySelector("#start-btn");
var questionEl = document.querySelector("#question");
var ansButtonEl = document.querySelector("btn");

//Question Variable:
var secondsLeft = 60;
let currentQuestionIndex

//ACTIVE Items:
startButton.addEventListener("click", startGame) //tested with Cosole.log


//functions to play the game
function startGame() {
    setTimer();
    startButton.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    setNextQuestion();
    

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

function logScore() {

}

function refreshScores() {

}

//list of questions:
const questions = [
    {
        question: "This is my first question?",
        answers: [
            { text: "Yes", correct: true},
            { text: "No", correct: false},
            { text: "No", correct: false},
            { text: "No", correct: false},
        ]
    }
]