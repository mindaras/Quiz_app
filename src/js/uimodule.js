// DOM elements
const DOMStrings = {
  startButton: 'start',
  mainContainer: '.container',
  question: 'question',
  answer: '.answer-option',
  answerOption: '.answer-option',
  nextButton: 'next',
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
    checkAnswersButton.style.display = 'none';
    tryAgainButton.style.marginLeft = 0;
  } else {
    checkAnswersButton.style.display = 'block';
    window.innerWidth > 767 ? tryAgainButton.style.marginLeft = 150 + 'px' : tryAgainButton.style.marginLeft = 0;
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
    let template, correctIndex, correctAnswer;

    correctIndex = curr.correct;
    correctAnswer = curr.answers[correctIndex - 1];
    
    template = `
    <li class="answers__item">
      <p class="answers__question">${curr.question}</p>
      <p class="answers__correct-answer">${correctAnswer}</p>
    </li>`;

    container.insertAdjacentHTML('beforeend', template);
  });
};

let checkTryAgainMargin = () => {
  let tryAgainButton, score;

  tryAgainButton = document.getElementById(DOMStrings.tryAgain);
  score = document.getElementById(DOMStrings.resultPercentage).textContent;

  // check window width
  if (window.innerWidth <= 767) {
    
    tryAgainButton.style.marginLeft = 0;

  } else {
    // check score
    if (score !== '100%') {
      tryAgainButton.style.marginLeft = 150 + 'px';
    }

  };

};

export {
  DOMStrings,
  changeState,
  displayCurrentQuestion,
  activateAnswer,
  checkAnswer,
  getAnswer,
  displayResult,
  displayCorrectAnswers,
  checkTryAgainMargin
};
