 const questions=[
    {
        question:"Which of the following is NOT a valid way to declare a variable in JavaScript?",
        answers:[
            
                {text:" var x = 10;",correct:false},
                {text:" let y = 20;",correct:false},
                {text:" const z = 30;",correct:false},
                {text:" const 123 = 40;",correct:true},

            
        ]

    },

    {
        question:"What does the typeof operator return for an array",
        answers:[
            {text:"array", correct:false},
            {text:"object", correct:true},
            {text:"Array", correct:false},
            {text:"undefined", correct:false},
        ]
    },

    {
        question:"What does the typeof operator return for an arrayWhich of the following methods can be used to remove the last element from an array in JavaScript?",
        answers:[
            {text:"array.pop();", correct:true},
            {text:" array.push();", correct:false},
            {text:"array.shift();", correct:false},
            {text:"array.splice();", correct:false},
        ]
    },

    {
        question:"What is the correct way to write a function in JavaScript?",
        answers:[
            {text:" function myFunction() ", correct:false},
            {text:" var myFunction = function() ", correct:false},
            {text:"const myFunction = () => ", correct:false},
            {text:" All of the above", correct:true},
        ]
    },

    {
        question:"What is the purpose of the querySelector method in JavaScript?",
        answers:[
            {text:"To select an element by its class name.", correct:false},
            {text:" To select an element by its id. ", correct:false},
            {text:"To select the first element that matches a CSS selector.", correct:true},
            {text:" To select the last element that matches a CSS selector.", correct:false},
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct=answer.correct;  // we are storing the value either true or false in button.dataset.correct
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
};


nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
};

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}





startQuiz();



