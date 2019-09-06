const timeLimit = 5; // timeout in seconds
let running = false;

let trivia = [{
    question: 'Question 1',
    answers: ['answer 1', 'answer 2', 'answer 3'],
    correct: 2
  },
  {
    question: 'Question 2',
    answers: ['answer 21', 'answer 22', 'answer 23'],
    correct: 1
  }
];

$(document).ready(function () {
  $('#start').on('click', runTrivia);
});

function runTrivia() {
  let timeLeft = timeLimit;
  let intervalId;

  if (!running) {
    running = true;

    $('#start').hide();
    $('#trivia').append('<form>');
    for (index in trivia) {
      $('form').append($('<h1>').text(trivia[index].question));

      trivia[index].answers.forEach((answer, jindex) =>
        $('form').append(
          `<input type="radio" name="answer${index}" value="${jindex}">${answer}<br>`
        )
      );
    }
    $('form').append($('<button>').text('Submit'));

    intervalId = setInterval(count, 1000);
  }

  function count() {
    if (timeLeft) {
      $('#timer').text(timeLeft--);
    } else {
      clearInterval(intervalId);
      running = false;
    }
  }
}