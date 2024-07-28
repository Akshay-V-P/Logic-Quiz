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
        question : "Which property is used to change the background color of an element?",
        answers : [
            {txt : "color", correct : false},
            {txt : "background-color", correct : true},
            {txt : "background-image", correct : false},
            {txt : "background-style", correct : false}

        ]
    }
]

let quesperRatio = 50
let progressLength = 0 
const progress = document.getElementById("movingbar")
const percIndex = document.getElementById("complete-perc") 

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")


let currentQuestionIndex = 0
let score = 0

function startQuiz() {
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
    questionElement.innerHTML = score
    nextButton.style.display = "block"
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
