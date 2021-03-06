// DOM elements
const DOMStrings = {
  startButton: 'start',
  mainContainer: '.container',
  question: 'question',
  answer: '.answer-option',
  answerOption: '.answer-option',
  currentQuestionLabel: 'currentQuestion',
  totalQuestionsLabel: 'totalQuestions',
  resultPercentage: 'percent',
  resultLabel: 'result',
  tryAgain: 'tryAgain',
  checkAnswers: 'checkAnswers',
  answerList: 'answerList',
  answersTryAgainButton: 'answersTryAgain'
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
let displayCurrentQuestion = (questionObject, currentQuestionNumber, totalQuestions, currentQuestionLabel, totalQuestionsLabel) => {
  let question, answers, questionObj, answersObj;

  currentQuestionLabel = document.getElementById(DOMStrings.currentQuestionLabel);
  totalQuestionsLabel = document.getElementById(DOMStrings.totalQuestionsLabel);
  question = document.getElementById(DOMStrings.question);
  answers = document.querySelectorAll(DOMStrings.answer);
  answers = Array.from(answers);

  questionObj = questionObject.question;
  answersObj = questionObject.answers;

  // 1. update question
  question.textContent = questionObj;

  // 2. update answers
  answers.forEach((curr, index) => {

    //remove active class
    curr.classList.remove('active');
    
    // update answer
    curr.textContent = answersObj[index];
  });

  // 3. Update current question counter
  currentQuestionLabel.textContent = currentQuestionNumber;
  totalQuestionsLabel.textContent = totalQuestions;
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

// display result
let displayResult = (resultPercentage) => {
  let resultPercentageLabel, resultLabel, resultText, checkAnswersButton, tryAgainButton;

  resultPercentageLabel = document.getElementById(DOMStrings.resultPercentage);
  resultLabel = document.getElementById(DOMStrings.resultLabel);
  checkAnswersButton = document.getElementById(DOMStrings.checkAnswers);
  tryAgainButton = document.getElementById(DOMStrings.tryAgain);

  // display result percentage
  resultPercentageLabel.textContent = resultPercentage + '%';

  // get result text based on score
  switch (resultPercentage) {
    case 100:
      resultText = 'Perfect';
      break;
    case 80:
      resultText = 'Very good';
      break;
    case 70:
      resultText = 'Good';
      break;
    case 60:
      resultText = 'Not bad';
      break;
    default:
      resultText = 'You could do better';
  };

  // if score is 100, hide check answers button
  if (resultPercentage === 100) {
    checkAnswersButton.classList.add('hidden');
    tryAgainButton.classList.add('single');
  } else {
    checkAnswersButton.classList.remove('hidden');
    tryAgainButton.classList.remove('single');
  }
  
  // display result text
  resultLabel.textContent = resultText;
};

// display correct answers
let displayCorrectAnswers = (answerList) => {
  let container;

  container = document.getElementById(DOMStrings.answerList);

  container.innerHTML = '';

  answerList.forEach((curr) => {
    let template, correctIndex, incorrectIndex, question, correctAnswer, incorrectAnswer;

    correctIndex = curr[0].correct;
    incorrectIndex = curr[1];
    question = curr[0].question;
    correctAnswer = curr[0].answers[correctIndex - 1];
    incorrectAnswer = curr[0].answers[incorrectIndex - 1];
    
    template = `
    <li class="answers__item">
      <p class="answers__question">${question}</p>
      <div class="answers__wrapper">
        <p class="answers__answer correct">${correctAnswer}</p>
        <p class="answers__answer incorrect">${incorrectAnswer}</p>
      </div>
    </li>`;

    container.insertAdjacentHTML('beforeend', template);
  });
};

export {
  DOMStrings,
  changeState,
  displayCurrentQuestion,
  activateAnswer,
  checkAnswer,
  getAnswer,
  displayResult,
  displayCorrectAnswers
};
