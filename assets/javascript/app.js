'use strict';
const timeLimit = 10; // timeout in seconds

$(document).ready(function () {
  $('#start').on('click', runTrivia);
  $('#trivia').hide();
  $('#results').hide();
  $('form').empty();
});

function runTrivia() {
  let queryURL =
    'https://opentdb.com/api.php?amount=3&category=22&type=multiple';
  let timeLeft = timeLimit;

  $('#start').hide();
  $('form').empty();
  $('#trivia').show();
  $('#results').empty();

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

    let cardGroup = $('<div>').addClass('card-group');

    for (let qIndex in trivia) {
      let card = $('<div>').addClass('card');
      card.append($('<div>').addClass('card-header').text(trivia[qIndex].question));

      let cardBody = $('<div>').addClass('card-body')

      trivia[qIndex].answers.forEach((answer, aIndex) =>
        cardBody.append(
          $('<div>').addClass('form-check').append(
            $('<input>').attr({
              type: 'radio',
              name: qIndex,
              value: aIndex,
              class: 'form-check-input',
              id: '' + qIndex + aIndex}),
            $('<label>').attr({
              class: 'form-check-label',
              for: '' + qIndex + aIndex})
              .text(answer)
          )
        )
      )
      card.append(cardBody);
      cardGroup.append(card);
    }
    $('form').append(cardGroup);
    
    $('form')
      .append($('<div>').attr({class: 'mx-auto', style: 'width: 200px;'})
      .append($('<button>').attr({ id: 'ready', type: 'button', class: 'btn btn-primary my-2', style: 'width: 200px;' }).text('Ready')));

    $('#ready').on('click', checkAnswers);

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


      $('#results').append(
        $('<h2>').addClass('text-center mt-5').text('All Done!'),
        $('<h3>').addClass('bg-success text-white mx-2').text(`Correct: ${correct}`),
        $('<h3>').addClass('bg-danger text-white mx-2').text(`Incorrect: ${incorrect}`),
        $('<h3>').addClass('bg-warning text-dark mx-2').text(`Unanswered: ${notAnswered}`));

      $('#start').show();
      $('#ready').hide();
      $('#results').show();
    }

    function count() {
      timeLeft ? $('#timer').text(timeLeft--) : checkAnswers();
    }
  });
}
