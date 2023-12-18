var gameTimer = document.querySelector("#gameTimer");
var questionContainerEl = document.querySelector("#question-container");
var startButton = document.querySelector("#start-btn");
var questionEl = document.querySelector("#question");
var ansButtonEl = document.querySelector("#answer-btn");
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
    startButton.classList.add("hide");
    questionContainerEl.classList.remove("hide");
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
            questionContainerEl.classList.add("hide");
            showScore();
            gameScore.classList.remove("hide");
        }
    }, 500);
}


function setNextQuestion() {
    resetState()
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        //this is supposed to swap out the button placeholders with buttons for new answers.
        const button = document.createElement("button");
        button.innerText = answer.text
        button.classList.add("btn")
        ansButtonEl.appendChild(button)
        button.addEventListener("click", selectAnswer)
        if (answer.correct) {
            button.dataset.correct = answer.correct
            // scoreCounter++
        // } else {
            // secondsLeft.value - 10
        }
        // setNextQuestion();
    })
}

function resetState() {
    while (ansButtonEl.firstChild) {
        ansButtonEl.removeChild(ansButtonEl.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(ansButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

}

function setStatusClass (element, correct) { //need to add correct and wrong elements to html?
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass (element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
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
            { text: "D: No", correct: false}
        ]
    }, 

    {
        question: "This is my 2nd question?",
        answers: [
            { text: "1: Yes", correct: true},
            { text: "2: No", correct: false},
            { text: "3: No", correct: false},
            { text: "4: No", correct: false}
        ]
    }, 
]