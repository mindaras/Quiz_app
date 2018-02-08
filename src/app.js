import './scss/m_style.scss';
import { generateRandomIndex, getCurrentQuestion, updateCounter, addAnswer } from './js/datamodule';
import { DOMStrings, changeState, displayCurrentQuestion, activateAnswer, checkAnswer, getAnswer  } from './js/uimodule';

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

};

// get the next question
let nextQuestion = () => {
  let currentQuestion;

  // 1. change application state
  changeState('playing');
  // 2. get current question
  currentQuestion = getCurrentQuestion();
  // 3. display the current question in the UI
  displayCurrentQuestion(currentQuestion);
};

// change question
let changeQuestion = () => {
  let isChecked, answer;

  // 1. check if answer checked
  isChecked = checkAnswer();

  if (isChecked) {
    // 2. get answer
    answer = getAnswer();

    // 3. update data
    addAnswer(answer);
    generateRandomIndex();

    // 4. next question
    nextQuestion();
  }

};

// application  initialization
let init = () => {
  generateRandomIndex();
  setupEventListeners();
};

// init app
init();
