const questions = [
    {
        question: "Hewan terbesar di dunia ?",
        answers : [
            { text: "Siamang", correct: false },
            { text: "Komodo", correct: false },
            { text: "Paus biru", correct: true },
            { text: "Kelinci", correct: false },
        ]
    },
    {
        question: "Burung terbesar di dunia?",
        answers: [
            { text: "Elang", correct: false },
            { text: "Burung unta", correct: true },
            { text: "Merpati", correct: false },
            { text: "Kakatua", correct: false },
        ]
    },
    {
        question: "Ikan terbesar di dunia?",
        answers: [
            { text: "Hiu paus", correct: true },
            { text: "Ikan koi", correct: false },
            { text: "Ikan lele", correct: false },
            { text: "Ikan guppy", correct: false },
        ]
    },
    {
        question: "Mamalia terbesar di dunia?",
        answers: [
            { text: "Paus biru", correct: true },
            { text: "Gajah", correct: false },
            { text: "Badak", correct: false },
            { text: "Beruang kutub", correct: false },
        ]
    },
    {
        question: "Reptil terbesar di dunia?",
        answers: [
            { text: "Buaya", correct: true },
            { text: "Ular sanca", correct: false },
            { text: "Kadal monitor", correct: false },
            { text: "Komodo", correct: false },
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;      

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect =  selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect" );
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    nextButton.style.display = 'block';

}

function showScore(){
    resetState();
    questionElement.innerHTML = `Skor kamu ${score} dari ${questions.length} !`;
    nextButton.innerHTML = "Kerjakan Kembali";
    nextButton.style.display = 'block';
}

function hendleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        hendleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();

