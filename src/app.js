import './scss/m_style.scss';
import { generateRandomIndex, getCurrentQuestion, updateCounter, addAnswer, getCounterData, getResult, resetCounter, getCorrectAnswers } from './js/datamodule';
import { DOMStrings, changeState, displayCurrentQuestion, activateAnswer, checkAnswer, getAnswer, displayResult, displayCorrectAnswers, checkTryAgainMargin  } from './js/uimodule';

// event listeners
let setupEventListeners = () => {
  let answerOptionList;

  // start game
  document.getElementById(DOMStrings.startButton).addEventListener('click', nextQuestion);

  // activate answer
  answerOptionList =  document.querySelectorAll(DOMStrings.answerOption);
  answerOptionList = Array.from(answerOptionList);

  answerOptionList.forEach(curr => {
    curr.addEventListener('click', function() {
      activateAnswer(this);
    });
  });

  // change question
  document.getElementById(DOMStrings.nextButton).addEventListener('click', changeQuestion);

  // check answers
  document.getElementById(DOMStrings.checkAnswers).addEventListener('click', checkCorrectAnswers);

  // try again
  document.getElementById(DOMStrings.tryAgain).addEventListener('click', restartGame);
  document.getElementById(DOMStrings.answersTryAgainButton).addEventListener('click', backToStart);

  // check try again button margin in result stage based on the score
  window.addEventListener('resize', function() {
    let container;

    container = document.querySelector(DOMStrings.mainContainer);

    if (container.classList.contains('finish')) {
      checkTryAgainMargin();
    };
    
  });
};

// get the next question
let nextQuestion = () => {
  let currentQuestion, currentQuestionNumber, totalQuestions;

  // 1. change application state
  changeState('playing');
  // 2. get current question
  currentQuestion = getCurrentQuestion();

  // 3. update counter data
  updateCounter();

  // 4. get counter data
  [currentQuestionNumber, totalQuestions] = getCounterData();

  // 5. display the current question in the UI
  displayCurrentQuestion(currentQuestion, currentQuestionNumber, totalQuestions);
};

// change question
let changeQuestion = () => {
  let isChecked, answer, currentQuestionNumber, totalQuestions;

  currentQuestionNumber = parseInt(document.getElementById('currentQuestion').textContent);
  totalQuestions = parseInt(document.getElementById('totalQuestions').textContent);

  // 1. check if answer checked
  isChecked = checkAnswer();

  if (isChecked) {
    // 2. get answer
    answer = getAnswer();

    // 3. update data
    addAnswer(answer);
    generateRandomIndex();

    // check if current question is less than total
    if (currentQuestionNumber < totalQuestions) {
      // next question
      nextQuestion();
    } else {
      // finish game
      finishGame();
    };
    
  };

};

// finish game
let finishGame = () => {
  let result;

  // 1. Change application state
  changeState('finish');

  // 2. Get Result
  result = getResult();

  // 3. Display Result
  displayResult(result);
};

let restartGame = () => {

  // 1. Reset counter and result
  resetCounter();

  // 3. Generate random index
  generateRandomIndex();

  // 4. Change application state
  changeState('playing');

  // 5. Display question
  nextQuestion();
};

// check correct answers
let checkCorrectAnswers = () => {
  let answerList;

  // 1. Change application state
  changeState('answers');

  // 2. Get correct answers
  answerList = getCorrectAnswers();

  // 3. Display correct answers
  displayCorrectAnswers(answerList);
};

// back to start
let backToStart = () => {

  // 1. Reset counter and result
  resetCounter();

  // 3. Generate random index
  generateRandomIndex();

  // 4. Change application state
  changeState('index');
};

// application  initialization
let init = () => {
  generateRandomIndex();
  setupEventListeners();
};

// init app
init();
