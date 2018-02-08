// DOM elements
const DOMStrings = {
  startButton: 'start',
  mainContainer: '.container',
  question: 'question',
  answer: '.answer-option',
  answerOption: '.answer-option',
  nextButton: 'next'
};

// change applications state
let changeState = (state) => {
  let container;

  // 1. get container element
  container = document.querySelector(DOMStrings.mainContainer);

  // 2. reset the className
  container.className = 'container';

  // 3. add class after timeout for animation purposes
  setTimeout(() => {
    if (state === 'index') {
      container.className = 'container index';
    } else if (state === 'playing') {
      container.className = 'container playing';
    } else if (state === 'finish') {
      container.className = 'container finish';
    } else if (state === 'answers') {
      container.className = 'container answers';
    }
  }, 300);
};

// display current question
let displayCurrentQuestion = (questionObject) => {
  let question, answers, questionObj, answersObj;

  question = document.getElementById(DOMStrings.question);
  answers = document.querySelectorAll(DOMStrings.answer);
  answers = Array.from(answers);

  questionObj = questionObject.question;
  answersObj = questionObject.answers;

  // 1. update question
  question.textContent = questionObj;
  // 2. update answers
  answers.forEach((curr, index) => curr.textContent = answersObj[index]);
};

// activate answer
let activateAnswer = (answer) => {
  let answerList;

  answerList = document.querySelectorAll(DOMStrings.answerOption);
  answerList = Array.from(answerList);

  answerList.forEach(curr => curr.classList.remove('active'));
  answer.classList.add('active');

};

// check any of the answers is active
let checkAnswer = () => {
  // returns the length of active answers
  return document.querySelectorAll(DOMStrings.answerOption + '.active').length;
};

// gets the active answer
let getAnswer = () => {
  return document.querySelectorAll(DOMStrings.answerOption + '.active');
};

export {
  DOMStrings,
  changeState,
  displayCurrentQuestion,
  activateAnswer,
  checkAnswer,
  getAnswer
};
