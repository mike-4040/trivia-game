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
});

function runTrivia() {
  $('#start').hide();
  $('#trivia').append('<form>');
  for (index in trivia) {
    $('form').append($('<h1>').text(trivia[index].question));
    
    trivia[index].answers.forEach( answer => $('form').append(`<input type="radio" name="answer" value="${answer}">${answer}`));
  }
  $('form').append($('<button>').text('Submit'));


}