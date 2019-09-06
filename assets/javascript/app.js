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
    $('#results').hide();
  
    for (index in trivia) {
      $('#trivia').append($("<h1>").text(trivia[index].question));

      trivia[index].answers.forEach((answer, jindex) =>
        $('#trivia').append(
          `<input type="radio" name="answer${index}" value="${jindex}">${answer}<br>`
        )
      );
    }
    $('#trivia').append($('<button id="ready">').text('Submit'));

    intervalId = setInterval(count, 1000);
    $('#ready').on('click', ready);

  }

  function count() {
    if (timeLeft) {
      $('#timer').text(timeLeft--);
    } else {
      stopCount();
    }
  }

  function ready() {
    stopCount();
    alert('Ready');
  }

  function stopCount() {
    clearInterval(intervalId);
    running = false;
  }
}