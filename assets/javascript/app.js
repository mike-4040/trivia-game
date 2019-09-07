"use strict";
const timeLimit = 5; // timeout in seconds

// let trivia = getTrivia();

// let trivia = [
//     {
//       question: 'Question 1',
//       answers: ['answer 1', 'answer 2', 'answer 3'],
//       correct: 2
//     },
//     {
//       question: 'Question 2',
//       answers: ['answer 21', 'answer 22', 'answer 23'],
//       correct: 1
//     }
//   ];

$(document).ready(function() {
  $('#start').on('click', runTrivia);
  $('#trivia').hide();
  $('#results').hide();
});
