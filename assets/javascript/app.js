'use strict';
const timeLimit = 10; // timeout in seconds

$(document).ready(function () {
  $('#start').on('click', runTrivia);
  $('#trivia').hide();
  $('#results').hide();
});

function runTrivia() {
  let queryURL =
    'https://opentdb.com/api.php?amount=3&category=22&type=multiple';
  let timeLeft = timeLimit;

  $('#start').hide();
  $('#trivia').show();
  $('#results').hide();

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (res) {
    let intervalId = setInterval(count, 1000);
    let trivia = [];
    let rawTrivia = res.results;
    for (let i in rawTrivia) {
      let { question, incorrect_answers: answers, correct_answer } = rawTrivia[
        i
      ];
      let correct = Math.floor(Math.random() * (answers.length + 1));
      answers.splice(correct, 0, correct_answer);
      trivia.push({
        question,
        answers,
        correct
      });
    }

    for (let qIndex in trivia) {
      $('form').append($('<h1>').text(trivia[qIndex].question));
      trivia[qIndex].answers.forEach((answer, aIndex) =>
        $('form').append(
          `<input type="radio" name="${qIndex}" value="${aIndex}">${answer}<br>`
        )
      );
    }
    $('form').append($('<button id="ready">').text('Submit'));
    $('form').submit(checkAnswers);

    function checkAnswers() {
      if (event) event.preventDefault();
      let results = $('form').serializeArray();
      let correct = 0;
      let incorrect = 0;
      let notAnswered = 0;
      clearInterval(intervalId);
      for (let i = 0; i < trivia.length; i++) {
        let ans = results.find(answer => answer.name == i);
        ans
          ? trivia[i].correct == ans.value
            ? correct++
            : incorrect++
          : notAnswered++;
      }

      $('#results').append($('<h1>').text('All Done!'));
      $('#results').append($('<h2>').text(`Correct Answers: ${correct}`));
      $('#results').append($('<h2>').text(`Incorrect Answers: ${incorrect}`));
      $('#results').append($('<h2>').text(`Ananswerd: ${notAnswered}`));

      $('#start').show();
      // $('form').empty();
      // $('#trivia').hide();
      $('#results').show();
    }

    function count() {
      timeLeft ? $('#timer').text(timeLeft--) : checkAnswers();
    }
  });
}
