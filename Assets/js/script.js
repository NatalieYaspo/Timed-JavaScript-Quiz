var gameTimer = document.querySelector("#gameTimer");
var questionContainerEl = document.querySelector("#question-container");
var startButton = document.querySelector("#start-btn");
var restartButton = document.querySelector("#restart-btn");
var questionEl = document.querySelector("#question");
var ansButtonEl = document.querySelector("#answer-btn");
var formEl = document.querySelector("#initials-frm");
var submitButton = document.querySelector("#submit-btn");
var gameScore = document.querySelector("#gameScore");
var newScore = document.querySelector("#newScore");
var correctAns = document.querySelector("#correct-answers");
var totalQs = document.querySelector("#total-questions");
var runningScores = document.querySelector("#score-tally");
var highScoreEl = document.querySelector("#highScores");
var initialsEl = document.querySelector("#initials");
var scoreResetEl = document.querySelector("#scoreReset-btn");
var renderScores = document.querySelector("#renderScores");

//Question Variable:
var secondsLeft = 60;
let currentQuestionIndex
var scoreCounter = 0;
var qsTotal = 0;

//ACTIVE Event Listeners:
startButton.addEventListener("click", startGame) //tested with Cosole.log

//Functions to play the game
function startGame() {
    setTimer();
    startButton.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    runningScores.classList.remove("hide");
    currentQuestionIndex = 0;
    setNextQuestion();
}

//Time Function for game.
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
            endGame();
        }
    }, 1000);
}

//This is to set the next question when the time is ready.
function setNextQuestion() {
    //This resets the state of the buttons for the next question
    resetState()
    showQuestion(questions[currentQuestionIndex]);
}

//Shows the questions based on the Questions Array at the bottom.
function showQuestion(question) {
    // console.log(question);
    questionEl.innerText = question.question
    question.options.forEach(options => {
        //This swaps out the button placeholders with buttons for new answers.
        const button = document.createElement("button");
        button.innerText = options
        button.classList.add("btn")
        ansButtonEl.appendChild(button)
        button.addEventListener("click", selectAnswer)
})
}

//Resets the state of the buttons for the next questions, answers.
function resetState() {
    while (ansButtonEl.firstChild) {
        ansButtonEl.removeChild(ansButtonEl.firstChild)
    }
}

//Everything that happens when an answer is selected.
function selectAnswer(e) {
    // console.log(e.target);
    const selectedButton = e.target
   // Increases total number of questions answered.
    qsTotal++
    const question = questions[currentQuestionIndex];
    // console.log(question);
    if (selectedButton.textContent == question.answer) {
        // console.log("correct!");
        //Score will increase by 1 if correct answer slected.
        scoreCounter++
        // console.log(scoreCounter);
        setCorrect();
    } else if (selectedButton.textContent != question.answer) { 
        // console.log("wrong!");
        secondsLeft.value - 10 //I NEED TO GET THIS TO DECREASE.
    }
    //Sets total questions answered, increases question index by 1 and runs setting new question.
    setTotal();
    currentQuestionIndex++
    //If no more questions, show final score & submit initials.
    if (currentQuestionIndex >= questions.length) {
        endGame();
    //Otherwise, it shows the next question.
    } else {
    setNextQuestion()
    }
}

function setCorrect() {
    correctAns.textContent = "Correct Answers: " + scoreCounter;
}

function setTotal() {
    totalQs.textContent = "Total Questions Answered: " + qsTotal;
}

function endGame() {
    gameScore.classList.remove("hide");
    runningScores.classList.add("hide");
    questionContainerEl.classList.add("hide");
    gameTimer.classList.add("hide");
    // return finalScore.value;
    var finalScore = [(scoreCounter / qsTotal)*100];
    newScore.textContent = "Your Score: " + finalScore + "%"; //CAN I LIMIT %??
}

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    var finalScore = [(scoreCounter / qsTotal)*100];
    localStorage.setItem("finalScore", finalScore);
    localStorage.setItem("initials", initialsEl.value);
    gameScore.classList.add("hide");
    //Once submitted, user taken to the High Score screen.
    getHighScores();
})
    
//Resets the screen to show the high score & initals.  Pulls it from local storage.
function getHighScores () {
    gameScore.classList.add("hide");
    highScoreEl.classList.remove("hide");
    var lastScores = localStorage.getItem("finalScore");
    var lastInitials = localStorage.getItem("initials");
    var storedScores = (lastInitials + " - " + lastScores) + "%";
    // console.log(storedScores);
    //Shows the last high score.
    if (storedScores === null) {
        renderScores.textContent = "No high scores."
    } else {
        renderScores.textContent = storedScores
    }
}

//Refreshes the page when clicked and resets high scores.
scoreResetEl.addEventListener('click', clearScores);

function clearScores() {
    location.reload(); 
}

//List of questions and answers.:
const questions = [
    {
        question: "Which coding language allows the user to interact with the website?",
        answer: "JavaScript",
        options: [
            "CSS",
            "HTML",
            "JavaScript",
            "Boolean"
        ]
    }, 

    {
        question: "Which variable type contains a sequense of text?",
        answer: "String",
        options: [
            "String",
            "Array",
            "Boolean",
            "Object"
        ]
    }, 

    {
        question: "Which operator signifies strict equality?",
        answer: "===",
        options: [
            "=",
            "!=",
            "+=",
            "==="
        ]
    }, 

    {
        question: "Which variable type allows you to store multiple values in a single reference?",
        answer: "Array",
        options: [
            "String",
            "Array",
            "Function",
            "Boolean"
        ]
    }, 

    {
        question: "Which HTML tag is used to attach your JavaScript?",
        answer: "<script>",
        options: [
            "<body>",
            "<src>",
            "<script>",
            "<meta>"
        ]
    }
]