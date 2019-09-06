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
        `<input type="radio" name="${index}" value="${jindex}">${answer}<br>`
      )
    );
  }
  $('form').append($('<button id="ready">').text('Submit'));
  $('form').submit(checkAnswers);

  intervalId = setInterval(count, 1000);

  function count() {
    timeLeft ? $('#timer').text(timeLeft--) : checkAnswers();
  }

  function checkAnswers() {
    if (event) event.preventDefault();
    let results = $('form').serializeArray();
    let correct = 0;
    let incorrect = 0;
    let notAnswered = 0;
    clearInterval(intervalId);
    console.log(results);
    
    for (let i = 0; i < 2; i++) {
      let ans = results.find(answer => answer.name == i);
      ans ? (trivia[i].correct == ans.value ? correct++ : incorrect++) : notAnswered++;
      console.log(`Correct: ${correct}, Incorrect: ${incorrect}, Not Answerd: ${notAnswered}.`);
    }
    
    $('#start').show();
    // $('form').empty();
    // $('#trivia').hide();
    $('#results').show();
  }
}
