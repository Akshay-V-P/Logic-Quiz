const questions = [
    {
        question : "What does the CSS property 'transform: rotate(45deg);' do to an element?",
        answers : [
            {txt : "It rotates the element by 45 degrees", correct : true},
            {txt : "It scales the element by 45 degrees", correct : false},
            {txt : "It skews the element by 45 degrees", correct : false},
            {txt : "It translates the element by 45 degrees", correct : false}

        ]
    },
    {
        question : "What does CSS stand for?",
        answers : [
            {txt : "Cascading Style Sheets", correct : true},
            {txt : "Creative Style System", correct : false},
            {txt : "Computer Style Sheets", correct : false},
            {txt : "Colorful Style Sheets", correct : false}

        ]
    },
    {
        question : "How do you apply a CSS rule to an HTML element with the id header?",
        answers : [
            {txt : "#header { ... }", correct : true},
            {txt : ".header { ... }", correct : false},
            {txt : "header { ... }", correct : false},
            {txt : "*header { ... }", correct : false}

        ]
    },
    {
        question : " What does the 'margin' property do in CSS?",
        answers : [
            {txt : "Adds space inside the element's border", correct : false},
            {txt : "Adds space outside the element's border", correct : true},
            {txt : "Changes the font size of the element", correct : false},
            {txt : "Sets the background color of the element", correct : false}

        ]
    },
    {
        question : "How do you select all '&lt;p&gt;' elements within a '&lt;div&gt;' in CSS?",
        answers : [
            {txt : "div &gt; p { ... }", correct : false},
            {txt : "p div { ... }", correct : false},
            {txt : "div+p { ... }", correct : false},
            {txt : "div p { ... }", correct : true}

        ]
    },
    {
        question : "What is the default value of the 'display' property in CSS for a &lt;div&gt; element?",
        answers : [
            {txt : "inline", correct : false},
            {txt : "inline-block", correct : false},
            {txt : "block", correct : true},
            {txt : "none", correct : false}

        ]
    },
    {
        question : "How can you make text bold in CSS?",
        answers : [
            {txt : "text-style: bold;", correct : false},
            {txt : "font-style: bold;", correct : false},
            {txt : "text-weight: bold;", correct : false},
            {txt : "font-weight: bold;", correct : true}

        ]
    },
    {
        question : "What is the purpose of the 'z-index' property in CSS?",
        answers : [
            {txt : "To change the font size", correct : false},
            {txt : "To control the stacking order of positioned elements", correct : true},
            {txt : "To set the background color", correct : false},
            {txt : "To add padding inside an element", correct : false}

        ]
    },
    {
        question : "How do you add a comment in a CSS file?",
        answers : [
            {txt : "<-- This is a comment -->", correct : false},
            {txt : "// This is a comment", correct : false},
            {txt : "# This is a comment", correct : false},
            {txt : "/* This is a comment */", correct : true}

        ]
    },
    {
        question : "Which property is used to change the font size in CSS?",
        answers : [
            {txt : "font-size", correct : true},
            {txt : "text-size", correct : false},
            {txt : "font-style", correct : false},
            {txt : "text-font", correct : false}

        ]
    }
]

let quesperRatio = 10
let progressLength = 0 
const progress = document.getElementById("movingbar")
const percIndex = document.getElementById("complete-perc")
const scoreDisplay = document.getElementById("score") 

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")


let currentQuestionIndex = 0
let score = 0

function startQuiz() {
    scoreDisplay.style.display = "block"
    nextButton.style.bottom = "0%"
    questionElement.style.position = "unset"
    progressLength = 0
    progress.style.display = "none"
    percIndex.innerHTML = "0%"
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    scoreDisplay.innerHTML = "Score " + score +"/"+questions.length
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.txt
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    progress.style.display = "block"
    progressLength += quesperRatio
    progress.style.width = progressLength + "%"
    percIndex.innerHTML = progressLength + "%"
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if (isCorrect){
        selectedBtn.classList.add("correct")
        score++
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true 
    })
    nextButton.style.display = "block"

}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}

function showScore(){
    resetState()
    scoreDisplay.style.display = "none"
    questionElement.innerHTML = "Your score is "+ score+" out of "+ questions.length
    questionElement.style.position = "relative"
    questionElement.style.left = "25%"
    questionElement.style.top = "25%"
    nextButton.style.display = "block"
    nextButton.style.bottom = "10%"
    nextButton.innerHTML = "Play Again"

}


nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})
startQuiz()
