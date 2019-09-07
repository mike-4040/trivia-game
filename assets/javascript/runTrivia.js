function runTrivia() {
  const timeLimit = 10;

  let correct = {};
  let queryURL =
    'https://opentdb.com/api.php?amount=3&category=22&type=multiple';
  let timeLeft = timeLimit;

  $('#start').hide();
  $('#trivia').show();
  $('#results').hide();

  let intervalId = setInterval(count, 1000);

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (res) {
    let trivia = [];
    rawTrivia = res.results;
    for (i in rawTrivia) {
      let { question, incorrect_answers: answers, correct_answer } = rawTrivia[
        i
      ];
      correct = Math.floor(Math.random() * (answers.length + 1));
      answers.splice(correct, 0, correct_answer);
      trivia.push({ question, answers, correct });
    }

    for (let index in trivia) {
      $('form').append($('<h1>').text(trivia[index].question));
      trivia[index].answers.forEach((answer, jindex) =>
        $('form').append(
          `<input type="radio" name="${index}" value="${jindex}">${answer}<br>`
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
      console.log(results);
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
  });

  function count() {
    console.log(timeLeft);
    timeLeft ? $('#timer').text(timeLeft--) : checkAnswers();
  }
}
