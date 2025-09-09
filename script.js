const timeEl = document.getElementById("time");
const quizContainer = document.querySelector('.quiz-container');
const scoreContainer = document.querySelector(".score-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const tryBtn = document.getElementById("tryBtn");
const message = document.getElementById("message");
const scoreEl = document.getElementById("score");

const questions = [
  {
    question : "What is 2 + 2 ?",
    options : ["3","4","5","6"],
    answer : 1
  },
  {
    question : "Capital of India ?",
    options : ["Delhi","Mumbai","Kolkata","Chennai"],
    answer : 0
  },
  {
    question : "Which language runs in browser ?",
    options : ["Java","C","Python","JavaScript"],
    answer : 3
  },
  {
    question : "5 * 5 = ?",
    options : ["10","15","20","25"],
    answer : 3
  },
  {
    question : "HTML stands for ?",
    options : ["Hyper Trainer Marking Language","Hyper Text Markup Language","Hyper Text Mark Language","Hyper Tool Multi Language"],
    answer : 1
  }
]

let currentQ = 0;
let score = 0;
let timer;
let timeLeft = 10;

function startTimer(){
  timeLeft = 10;
  timeEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if(timeLeft === 0){
      clearInterval(timer);
      disableOptions();
      message.textContent = `Time is over`;
      setTimeout(nextQuestion, 1000);
    }
  }, 1000);
}

function showQuestion(){
  message.innerText = '';
  clearInterval(timer)
  startTimer();
  const qus = questions[currentQ];
  const question = qus.question;
  questionEl.textContent = question;
  optionsEl.innerHTML = '';
  qus.options.forEach((op, idx) => {
    const btn = document.createElement('button');
    btn.textContent = op;
    btn.addEventListener('click', () => {
      selectOption(idx, btn);
    })
    optionsEl.appendChild(btn);

  })
  nextBtn.style.display = 'none';
}


function selectOption(idx, btn){
  clearInterval(timer);
  const correctIndex = questions[currentQ].answer;
  const buttons = document.querySelectorAll("#options button");

  buttons.forEach((b, i) => {
    if( i === correctIndex){
      b.classList.add('correct'); 
    }
    if( i === idx && idx !== correctIndex ){
      b.classList.add('wrong');
    }
    b.disabled = true;
  });

  if(idx === correctIndex) score++;
  nextBtn.style.display = 'inline-block';
}

function disableOptions(){
  const buttons = document.querySelectorAll("#options button");
  const correctIndex = questions[currentQ].answer;
  buttons.forEach((b, i) => {
    b.disabled = true;
    if(i === correctIndex){
      b.classList.add('correct');
    }
  });
  nextBtn.style.display = 'inline-block';
}

nextBtn.addEventListener('click', nextQuestion);

function nextQuestion(){
  currentQ++;
  message.textContent = "";
  if(currentQ < questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}

function showScore(){
  quizContainer.style.display = 'none';
  scoreContainer.style.display = 'block';
  scoreEl.textContent = score;
}

tryBtn.addEventListener('click', () => {
  currentQ = 0;
  score = 0;
  scoreContainer.style.display = 'none';
  quizContainer.style.display = 'block';
  showQuestion();
});

showQuestion();



