var gameTimer = document.querySelector("#gameTimer");
var questionContainerEl = document.querySelector("#question-container");
var startButton = document.querySelector("#start-btn");
var questionEl = document.querySelector("#question");
var ansButtonEl = document.querySelector("#answer-btn");
var formEl = document.querySelector("#initials-frm");
var submitButton = document.querySelector("#submit-btn");
var gameScore = document.querySelector("#gameScore");
var correctAns = document.querySelector("#correct-answers");
var totalQs = document.querySelector("#total-questions");

//need to add correct and wrong

//Question Variable:
var secondsLeft = 60;
let currentQuestionIndex
var scoreCounter = 0;
var qsTotal = 0;

//ACTIVE Items:
startButton.addEventListener("click", startGame) //tested with Cosole.log
submitButton.addEventListener("click", logInitialsScore)//NOT TESTED

//functions to play the game
function startGame() {
    setTimer();
    startButton.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    correctAns.classList.remove("hide");
    totalQs.classList.remove("hide");
    // shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    setNextQuestion();
    showScore();
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

//This is to set the next question when the time is ready.
function setNextQuestion() {
    //This resets the state of the buttons for the next question
    resetState()
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    console.log(question);
    questionEl.innerText = question.question
    question.options.forEach(options => {
        //This swaps out the button placeholders with buttons for new answers.
        const button = document.createElement("button");
        button.innerText = options
        button.classList.add("btn")
        ansButtonEl.appendChild(button)
        button.addEventListener("click", selectAnswer)
    //     if (options = answer) { ///may need to remove this.. moved it to 91.
    //         console.log("correct!");
    //         // scoreCounter++
    //     // } else {
    //         // secondsLeft.value - 10
    //     } 
    // })
    //currentQuestionIndex++;
    //setNextQuestion(); //giving me an error that max call size exceeded
})
}

function resetState() {
    while (ansButtonEl.firstChild) {
        ansButtonEl.removeChild(ansButtonEl.firstChild)
    }
}

function selectAnswer(e) {
    console.log(e.target);
    const selectedButton = e.target
    qsTotal++
    // const correct = selectedButton.dataset.correct //may not need this?
    const question = questions[currentQuestionIndex];
    console.log(question);
    if (selectedButton.textContent == question.answer) {
        // console.log("correct!");
        //score will increase by 1
        scoreCounter++
        // console.log(scoreCounter);
        setCorrect();
    // } else {
        // secondsLeft.value - 10
    } else if (selectedButton.textContent != question.answer) { 
        // console.log("wrong!");
        secondsLeft.value - 10 //I NEED TO GET THIS TO DECREASE.
    }
    //setStatusClass(document.body, correct)
    // Array.from(ansButtonEl.children).forEach(button => {
    //     setStatusClass(button, button.dataset.correct)// I don't know that i need this.
    setTotal();
    setNextQuestion()
}

function setCorrect() {
    correctAns.textContent = "Correct Answers: " + scoreCounter;
    localStorage.setItem("correctAns", scoreCounter);
}

function setTotal() {
    totalQs.textContent = "Total Questions Answered: " + qsTotal;
    localStorage.setItem("qsTotal", qsTotal);
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
    // for 
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
        answer: "Blue",
        options: [
            "Blue",
            "Purple",
            "Orange",
            "yellow"
        ]
    }, 

    {
        question: "This is my 2nd question?",
        answer: "Natalie",
        options: [
            "Natalie",
            "Westley",
            "Wyatt",
            "Solenn"
        ]
    }, 
]