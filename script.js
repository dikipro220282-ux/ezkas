let allQuestions = [];
let questions = [];
let currentExamId = null;
let userName = '';
let current = 0;
let score = 0;
let maxStreak = 0;
let currentStreak = 0;
let answered = {};
let wrongAnswers = [];
let isReviewMode = false;

// Проверяем загрузку данных
console.log('Script loaded');
console.log('questions_informatics:', typeof questions_informatics !== 'undefined' ? 'OK' : 'MISSING');
console.log('questions_programming:', typeof questions_programming !== 'undefined' ? 'OK' : 'MISSING');

const exams = [
  {
    id: "informatics",
    questions: typeof questions_informatics !== 'undefined' ? questions_informatics : []
  },
  {
    id: "programming",
    questions: typeof questions_programming !== 'undefined' ? questions_programming : []
  }
];

window.loadExam = function(name) {
  const exam = exams.find(item => item.id === name);

  if(!exam || exam.questions.length === 0) {
    alert("Экзамен не найден или нет вопросов");
    return;
  }

  currentExamId = name;
  allQuestions = [...exam.questions];
  
  document.getElementById("menu").style.display = "none";
  document.getElementById("nameForm").style.display = "block";
};

window.startQuiz = function() {
  userName = document.getElementById("userName").value.trim();
  
  if(!userName) {
    alert("Пожалуйста, введи своё имя");
    return;
  }

  questions = [...allQuestions];
  questions.sort(() => Math.random() - 0.5);
  
  current = 0;
  score = 0;
  maxStreak = 0;
  currentStreak = 0;
  answered = {};
  wrongAnswers = [];
  isReviewMode = false;

  document.getElementById("nameForm").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("total").innerText = questions.length;

  showQuestion();
};

function showQuestion() {
  const q = questions[current];

  document.getElementById("question").innerText = q.question;
  document.getElementById("current").innerText = current + 1;
  document.getElementById("scoreShow").innerText = score;
  document.getElementById("streak").innerText = currentStreak;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.innerText = answer;

    if(answered[current] !== undefined) {
      btn.disabled = true;
      if(index === q.correct) {
        btn.classList.add("correct");
      }
      if(answered[current] === index && index !== q.correct) {
        btn.classList.add("wrong");
      }
    } else {
      btn.onclick = () => checkAnswer(btn, index);
    }

    answers.appendChild(btn);
  });

  document.getElementById("backBtn").disabled = current === 0;
}

function checkAnswer(btn, index) {
  const q = questions[current];
  const correct = q.correct;
  const buttons = document.querySelectorAll(".answer");

  buttons.forEach(b => b.disabled = true);
  answered[current] = index;

  if(index === correct) {
    btn.classList.add("correct");
    score++;
    currentStreak++;
    maxStreak = Math.max(maxStreak, currentStreak);
  } else {
    btn.classList.add("wrong");
    currentStreak = 0;
    wrongAnswers.push(current);
    
    if(buttons[correct]) {
      buttons[correct].classList.add("correct");
    }
  }

  document.getElementById("scoreShow").innerText = score;
  document.getElementById("streak").innerText = currentStreak;
}

window.previousQuestion = function() {
  if(current > 0) {
    current--;
    showQuestion();
  }
};

window.backToMenu = function() {
  document.getElementById("menu").style.display = "block";
  document.getElementById("nameForm").style.display = "none";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("results").style.display = "none";
};

window.retakeExam = function() {
  loadExam(currentExamId);
};

window.reviewWrong = function() {
  if(wrongAnswers.length === 0) {
    alert("Нет ошибок для повторения!");
    return;
  }

  questions = wrongAnswers.map(i => allQuestions[i]).filter(Boolean);
  
  current = 0;
  score = 0;
  maxStreak = 0;
  currentStreak = 0;
  answered = {};
  wrongAnswers = [];
  isReviewMode = true;

  document.getElementById("results").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("total").innerText = questions.length;

  showQuestion();
};

document.addEventListener('DOMContentLoaded', function() {
  const nextBtn = document.getElementById("nextBtn");
  if(nextBtn) {
    nextBtn.addEventListener("click", () => {
      current++;

      if(current >= questions.length) {
        document.getElementById("quiz").style.display = "none";
        document.getElementById("results").style.display = "block";

        const percent = Math.round((score / questions.length) * 100);
        document.getElementById("resultName").innerText = userName;
        document.getElementById("resultScore").innerText = score;
        document.getElementById("resultTotal").innerText = questions.length;
        document.getElementById("resultPercent").innerText = percent;
        document.getElementById("resultStreak").innerText = maxStreak;

        if(wrongAnswers.length > 0 && !isReviewMode) {
          document.getElementById("wrongAnswersSection").style.display = "block";
        }

        return;
      }

      showQuestion();
    });
  }
});
