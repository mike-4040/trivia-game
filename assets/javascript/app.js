const timeLimit = 5; // timeout in seconds
let trivia = [
  {
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

$(document).ready(function() {
  $('#start').on('click', runTrivia);
  $('#trivia').hide();
  $('#results').hide();
});

function runTrivia() {
  let timeLeft = timeLimit;
  let intervalId;

  $('#start').hide();
  $('#trivia').show();
  $('#results').hide();

  for (index in trivia) {
    $('form').append($('<h1>').text(trivia[index].question));
    trivia[index].answers.forEach((answer, jindex) =>
      $('form').append(
        `<input type="radio" name="answer${index}" value="${jindex}">${answer}<br>`
      )
    );
  }
  $('form').append($('<button id="ready">').text('Submit'));
  $('form').submit(ready);

  intervalId = setInterval(count, 1000);

  function count() {
    itimeLeft ? $('#timer').text(timeLeft--) : ready();
  }

  function ready() {
    let results = $('form').serializeArray();
    if (event) event.preventDefault();
    clearInterval(intervalId);
    console.log(results);
    $('#start').show();
    $('form').empty();
    // $('#trivia').hide();
    $('#results').show();
  }
}
