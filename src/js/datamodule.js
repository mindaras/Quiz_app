// global data
let data = {
  questionList: [],
  questionCopyList: [],
  answeredQuestions: [],
  currentQuestion: 0,
  counter: 0,
};

// question constructor
function Question(question, answers, correct) {
  this.question = question;
  this.answers = answers;
  this.correct = correct;
};

// add question
data.questionList.push(new Question('What is the meaning of \'dog\'?', ['Katė', 'Šuo', 'Dramblys', 'Lokys'], 2));
data.questionList.push(new Question('What is the meaning of \'table\'?', ['Stalas', 'Rusys', 'Kėdė', 'Siena'], 1));
data.questionList.push(new Question('What is the meaning of \'chair\'?', ['Pelė', 'Kėdė', 'Nosis', 'Akis'], 2));
data.questionList.push(new Question('What is the meaning of \'glass\'?', ['Stiklas', 'Žiedas', 'Stalas', 'Vanduo'], 1));
data.questionList.push(new Question('What is the meaning of \'cup\'?', ['Taurė', 'Puodelis', 'Usbonas', 'Bokalas'], 2));
data.questionList.push(new Question('What is the meaning of \'cat\'?', ['Pelė', 'Šuo', 'Katė', 'Voverė'], 3));
data.questionList.push(new Question('What is the meaning of \'squirrel\'?', ['Voverė', 'Graužikas', 'Žinduolis', 'Plėšrūnas'], 1));
data.questionList.push(new Question('What is the meaning of \'goat\'?', ['Tigras', 'Liūtas', 'Puma', 'Ožka'], 4));
data.questionList.push(new Question('What is the meaning of \'mouse\'?', ['Varlė', 'Žuvis', 'Pelė', 'Voverė'], 3));
data.questionList.push(new Question('What is the meaning of \'lion\'?', ['Liūtas', 'Raganosis', 'Begemotas', 'Gazelė'], 1));

// duplicate questionList
data.questionCopyList = Array.from(data.questionList);

// add random index from questionCopyList to currentQuestion
let generateRandomIndex = () => {
  data.currentQuestion = Math.floor(Math.random() * data.questionCopyList.length);
};

// get current question
let getCurrentQuestion = () => {
  return data.questionCopyList[data.currentQuestion];
};


let updateCounter = () => {
  data.counter++;
};

// add an answer to the answeredQuestions
let addAnswer = (answer) => {
  let answerID, answerValue;

  // 1. Get answer id
  answerID = parseInt(answer[0].getAttribute('data-answer-id'));

  // 2. Check if answer is correct
  answerValue = checkAnswer(answerID);
  
  // 3. Add answer to the answeredQuestions array
  data.answeredQuestions.push(answerValue);

  // 4. Remove question from the questionCopyList
  data.questionCopyList.splice(data.currentQuestion, 1);
};

let checkAnswer = (answerID) => {
  let correctAnswer;
 
  // 1. Get correct answer
  correctAnswer = data.questionCopyList[data.currentQuestion].correct;

  // 2. Return value
  return answerID === correctAnswer;
};

// remove the answered question from the questionCopyList
let removeQuestion = () => {

};


export {
  generateRandomIndex,
  getCurrentQuestion,
  addAnswer,
  updateCounter
};