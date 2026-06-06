import exams from './data/exams.js';

let questions = [];
let current = 0;
let score = 0;

window.loadExam = function(name){

  const exam = exams.find(item => item.id === name);

  if(!exam){
    alert("Экзамен не найден");
    return;
  }

questions = [...exam.questions];
questions.sort(() => Math.random() - 0.5);

current = 0;
score = 0;

document.getElementById("menu").style.display = "none";
document.getElementById("quiz").style.display = "block";

showQuestion();
}

function showQuestion(){

const q = questions[current];

document.getElementById("question").innerText =
q.question;

document.getElementById("progress").innerText =
`${current + 1} / ${questions.length}`;

const answers = document.getElementById("answers");

answers.innerHTML = "";

q.answers.forEach((answer,index)=>{

const btn = document.createElement("button");

btn.className = "answer";

btn.innerText = answer;

btn.onclick = () => checkAnswer(btn,index);

answers.appendChild(btn);

});
}

function checkAnswer(btn,index){

const correct = questions[current].correct;

const buttons =
document.querySelectorAll(".answer");

buttons.forEach(b => b.disabled = true);

if(index === correct){

btn.classList.add("correct");
score++;

}else{

btn.classList.add("wrong");

if(buttons[correct]){
buttons[correct].classList.add("correct");
}

}
}

document.getElementById("nextBtn")
.addEventListener("click",()=>{

current++;

if(current >= questions.length){

document.getElementById("quiz").innerHTML = `
<h2>Экзамен завершён</h2>
<h3>${score} из ${questions.length}</h3>
<button onclick="location.reload()">
На главную
</button>
`;

return;
}

showQuestion();

});