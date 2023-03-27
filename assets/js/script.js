//Displays welcome for user to press okay before quiz begins, welcome message hidden after user confrims

const welcomeMessage = document.getElementById('welcomeMessage');
        const startBtn = document.getElementById('startBtn');
        const gameWrapper = document.getElementById('gameWrapper');

        startBtn.addEventListener('click', () => {
            welcomeMessage.style.display = 'none'; // hide welcome message
            gameWrapper.style.display = 'block'; // show game
            startCountdown();
            displayQuestion();
        })

//Constructor function for the beginning structure of "Quiz" 

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;

  this.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
  }

// Deducts 3 second from timer every wrong choice (function for correct or wrong guess)
  this.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
    } else {
      quizTimeRemaining -= 3; 
    }
    this.questionIndex++;
  }

  this.isEnded = function () {
    return this.questionIndex === this.questions.length;
  }
}

//Constructor function that creates strcture for each question in game and checks for correct answer

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;

  this.isCorrectAnswer = function (choice) {
    return this.answer === choice;
  }
}

//Displays current Question , Displays final score if quiz has ended 

function displayQuestion() {
  if (quiz.isEnded()) {
    showScore();
  } else {

    let questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz.getQuestionIndex().text;

    //showing the options 

    let choices = quiz.getQuestionIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      let choiceElement = document.getElementById("choice" + i);
      choiceElement.innerHTML = choices[i];
      guess("btn" + i, choices[i]);

    }

    showLeft();
  }
};

//Event listener for button clicks, choice recorded and then next question displayed

function guess(id, guess) {
  let button = document.getElementById(id);
  button.onclick = function () {
    if (quiz.getQuestionIndex().isCorrectAnswer(guess)) {
      let messageElement = document.getElementById("message");
      messageElement.innerHTML = "Correct!";
    } else {
      let messageElement = document.getElementById("message");
      messageElement.innerHTML = "Incorrect!";
      quizTimeRemaining -= 3; // Deduct 3 second from timer
    }
    quiz.guess(guess);
    displayQuestion();
  }
}

//Function to display to how many questions user has left 

function showLeft() {
  let currentQuestion = quiz.questionIndex + 1;
  let leftElement = document.getElementById("left");
  leftElement.innerHTML =
    `Question ${currentQuestion} of ${quiz.questions.length} `;
}

//Showing score and play again option

function showScore() {
  var quizEndHTML =
    "<h1>Quiz Finished!</h1>" +
    "<h2 id='score'>Your Final Score: " +
    quiz.score +
    " of " +
    quiz.questions.length +
    "</h2>" +
    "<div class='play-again'>" +
    "<a href='index.html'>Replay</a>" +
    "</div>";
  var quizElement = document.getElementById("quiz");
  quizElement.innerHTML = quizEndHTML;
}

//Questions for the user

let questions = [
  new Question(
    "CSS Stands for ?",
    ["Javascript", "Coding Something Silly", "Cascading Style Sheet", "Hyper Text Markup Language"],
    "Cascading Style Sheet"
  ),
  new Question(
    "HTML stands for ?",
    ["Hyper Text Markup Language", "JavaScript", "Cascading Style Sheet", "Heavy Trains Moving Lightly"],
    "Hyper Text Markup Language"
  ),
  new Question(
    "What is a .js file?",
    ["Jquery", "Javascript", "Java Sprints", "the name of any file made"],
    "Javascript"
  ),
  new Question(
    "What is the correct HTML tag <> for inserting a line break?",
    ["br", "lb", "break", "ln"],
    "br"
  ),
  new Question(
    "Which of the following tags <> is used to define a hyperlink?",
    ["Link", "href", "a", "src"],
    "a"
  )
];

let quiz = new Quiz(questions);

//Function for Question to display is called

displayQuestion();

//Timer for 30 seconds

const quizTimeInSeconds = 30;
let quizTimeRemaining = quizTimeInSeconds;

const counting = document.getElementById("countdown");

function startCountdown() {
  const quizTimer = setInterval(function () {
    if (quizTimeRemaining <= 0) {
      clearInterval(quizTimer);
      showScore();
    } else {
      quizTimeRemaining--;
      counting.innerHTML = `TIME: ${quizTimeRemaining} seconds`;
    }
  }, 1000)
}

//countdown function called for timer to begin on page load

startCountdown();

