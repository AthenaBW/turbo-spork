function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  
    this.getQuestionIndex = function() {
      return this.questions[this.questionIndex];
    }
  

    this.guess = function(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
          this.score++;
        }
        this.questionIndex++;
      }
    
      this.isEnded = function() {
        return this.questionIndex === this.questions.length;
      }
    }
    
    function Question(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
      
        this.isCorrectAnswer = function(choice) {
          return this.answer === choice;
        }
      }

//Displaying the Question 
function displayQuestion() {
    if (quiz.isEnded()) {
        showScore();
    } else {
        //question show
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

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        displayQuestion();
    }
}
function showLeft() {
    let currentQuestion = quiz.questionIndex + 1;
    let leftElement = document.getElementById("left");
    leftElement.innerHTML=
        `Question ${currentQuestion} of ${quiz.questions.length} `;
}

//SHOWING SCORE

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

//Timer 
const quizTimeInSeconds = 30;
let quizTimeRemaining = quizTimeInSeconds;

const counting = document.getElementById("countdown");

function startCountdown() {
  const quizTimer = setInterval(function() {
    if (quizTimeRemaining <= 0) {
      clearInterval(quizTimer);
      showScore();
    } else {
      quizTimeRemaining--;
      counting.innerHTML = `TIME: ${quizTimeRemaining} seconds`;
    }
  }, 1000)
}

startCountdown();

