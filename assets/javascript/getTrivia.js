async function getTrivia() {
  let trivia;
  let correct = {};
  let queryURL =
    'https://opentdb.com/api.php?amount=5&category=22&type=multiple';
  
  await $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(res => trivia = res.results);
  
  let { question, incorrect_answers: answers, correct_answer } = trivia[0];
  
  correct = Math.floor(Math.random() * (answers.length + 1));
  answers.splice(correct, 0, correct_answer);
  
  let sTrivia = [{ question, answers, correct }];
  
  return sTrivia;
}
