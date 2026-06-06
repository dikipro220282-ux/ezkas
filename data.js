// Минимальный рабочий набор вопросов в UTF-8
const questions_informatics = [
  {
    question: "Что делает тег <body> в HTML?",
    answers: ["Содержит видимую часть страницы", "Определяет заголовок", "Добавляет скрипты", "Описывает стили"],
    correct: 0
  },
  {
    question: "Какой тег используется для вставки изображения?",
    answers: ["<img>", "<image>", "<picture>", "<src>"],
    correct: 0
  },
  {
    question: "Как задать жирный текст в HTML?",
    answers: ["<b>", "<i>", "<u>", "<small>"],
    correct: 0
  }
];

const questions_programming = [
  {
    question: "Как в Python вывести текст на экран?",
    answers: ["echo()", "print()", "console.log()", "puts()"],
    correct: 1
  },
  {
    question: "Что делает оператор if в программировании?",
    answers: ["Создает цикл", "Условная ветвь", "Определяет функцию", "Останавливает программу"],
    correct: 1
  }
];

console.log('Data loaded: informatics:', questions_informatics.length, 'programming:', questions_programming.length);
