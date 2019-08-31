
// ************************************** House Keeping (3 steps) **************************************

// 1/3. initialize an array of objects of questions, multiple choices, and the correct answer
const STORE = 
    [
      { question: 'Which one of these places is NOT a Chinese restaurant?',
        answers: ['Dragon Wok', 'Wang\'s Auto Repair', 'Luck Li\'s Bistro',    'Jade Garden'],
        correctAnswer: 'Wang\'s Auto Repair'},
      { question: 'Which one is NOT a Chinese soup?',
        answers: [' Hot & Sour', 'Egg Drop','Wonton','Miso'],
        correctAnswer: 'Miso'}, 
      { question: 'Which one is NOT a Chinese Appetizer??',
        answers: ['Buffalo Wings','Cheese Wonton', 'Egg Roll','Pork Dumpling'],
        correctAnswer: 'Buffalo Wings'}, 
      { question: 'Which sauce is NOT served in Chinese restaurants',
        answers: ['Sweet & Sour Sauce', 'Yello Mustard', 'Ranch', 'Soy Sauce'],
        correctAnswer: 'Ranch'}, 
      { question: 'Spot the inappropriate utensil on the table?',
        answers: ['Chopsticks','Tongs','Fork','Spoon'],
        correctAnswer: 'Tongs'}, 
      { question: 'Which ingredient is NOT in a Kung Pao Chicken dish?',
        answers: ['Peanut','Bell pepper','Diced chicken','Poached egg'],
        correctAnswer: 'Poached egg'}, 
      { question: 'Which ingredient is NOT in a Orange Chicken dish?',
        answers: ['Dried Chilli', 'Oyster', 'Orange peel', 'Fry Batter'],
        correctAnswer: 'Oyster'},
      { question: 'Which one of these messages is unluck to put in a fortune cookie?',
       answers: ['You will relax on a beach in Australia very soon.',
       'A delightful suprise is going to brighten your day!',
       'There is a huge pot of gold coming your way.',
       'Work, repeat, and die.'],
       correctAnswer: 'Work, repeat, and die.'}
];
// 2/3. declare global variables
let userScore,questionNum;
// 3/3. initialize global variables and get welcome screens ready
inItApp();

//**************************************************** Reusable screen control functions *******************************************
// 1/5. initialize question number and user score to 0 when starting quiz
function inItApp() {
  questionNum = 0;
  userScore = 0;
  //hide all screens exept welcome screen
  $('#js-screen-quiz').hide();
  $('#js-screen-result').hide();
  $('#js-screen-final').hide();
  $('#js-footer-score').hide();
};

// 2/5. loads quiz screen according to current question index
function loadQuiz(){
  $('#js-footer-score').show();
  document.querySelector('#js-screen-quiz').innerHTML= getQuizHtml();
}

// 3/5. checking user's answer and display accordingly with positive and negative feedbacks
function go2ResultScreen(){
  let selectedAnswer = $('input:checked').val();
  let correctAnswer = `${STORE[questionNum].correctAnswer}`;
  if (selectedAnswer === correctAnswer) {
    userScore++;
    $('#js-screen-result').html(getRightHtml());
  } 
  else {
    $('#js-screen-result').html(getWrongHtml());
  }
  // setting up onClick for Continue button
  $('#js-btn-continue').on('click', event => {
    next();
  });
}

// 4/5. loading next question if there is any. if not show final score to user
function next() {
  questionNum++;
  $('#js-span-score').text(userScore);
  if (questionNum < STORE.length) {
    $('#js-span-gameProgress').text(questionNum+1);
    $('#js-screen-result').hide();
    $('#js-screen-quiz').show();
    loadQuiz();
  }else{
    go2FinalScreen();
  }
}

// 5/5. displaying final score to user
function go2FinalScreen(){
  $('#js-screen-result').hide();
  $('#js-footer-score').hide();
  $('#js-screen-final').show();
  $('#js-screen-final').html(getFinalHtml());
  // setting up onclick listener for restart button
  $('#js-btn-restart').on('click', event => {
    $('#js-screen-final').hide();
    $('#js-screen-welcome').show();
    inItApp();
});
}

// **************************************************** Reusable HTML writing functions ****************************************************
// 1/4. HTML for redering quiz screen which plugs question and mutiple choices from STORE, the array of Object
function getQuizHtml(){
  let str= `
  <div class="container" id="screen-question">
    <h2>${STORE[questionNum].question}</h2>
    <form id='js-form-choice'>
      <fieldset>
        <label><input type="radio" value="${STORE[questionNum].answers[0]}" name="answer" required><span>${STORE[questionNum].answers[0]}</span></label>
        <label><input type="radio" value="${STORE[questionNum].answers[1]}" name="answer" required><span>${STORE[questionNum].answers[1]}</span></label>
        <label><input type="radio" value="${STORE[questionNum].answers[2]}" name="answer" required><span>${STORE[questionNum].answers[2]}</span></label>
        <label><input type="radio" value="${STORE[questionNum].answers[3]}" name="answer" required><span>${STORE[questionNum].answers[3]}</span></label>
        <button type="submit" class='js-btn-submit'>Submit</button>
      </fieldset>
    </form>
  </div>`
  return str;
}

// 2/4. shows user positive feedback
function getRightHtml(){
  let str = `
  <div class="feedback"><h3><img class="Icon" src="https://i.pinimg.com/originals/10/2a/ab/102aabb9895a05cd5c3f2fae3b5d439d.jpg">
    Absolutely amazing!</h3>
    <button type="button" id="js-btn-continue">Next</button>
  </div>`
  return str;
}

// 3/4 shows user negative feedback
function getWrongHtml(){
  let str = `
    <div class="feedback">
      <h3><img class="Icon" src="https://i.ytimg.com/vi/AVMtt2o2KiI/hqdefault.jpg" alt="stitch crying">
        Oh my God, you donut...<br><span class="answerFeedback">The right answer is ${STORE[questionNum].correctAnswer}!!!</span></h3>
      <button type="button" id="js-btn-continue">Next</button>
    </div>`
  return str;
}

// 4/4. shows user final score and offer a restart button 
function getFinalHtml(){
  let str = `
  <div class="container" id="screen-final">
    <h2 class="cs-no-margin">Quiz Completed</h2>
    <img class="Icon" src="https://static.tvgcdn.net/mediabin/galleries/shows/m_r/mas_mh/masterchef/season2/masterchef-66.jpg" alt="Gordon and his associates giving you the final verdict.">
    <h1>Final score:  ${userScore} Points / 8 Points</h1>
    <button type="button" class="start-button" id="js-btn-restart">Restart</button>
  </div>`
  return str;
}

//************************************** more onClick listeners **************************************
// 1/2. start button in welcome screen
$('#js-btn-start').on('click', event => {
  $('#js-screen-welcome').hide();
  $('#js-screen-quiz').show();
  $('#js-span-gameProgress').text(questionNum+1);
  $('#js-span-score').text(userScore);
  $('#js-footer-score').show();
  loadQuiz();
});

// 2/2. submit button in quiz screen
$(document).on('submit', function(event) {
  // Screen switch
  $('#js-screen-quiz').hide();
  $('#js-screen-result').show();
  $('#js-footer-score').hide();
  // prevent page from being reset
  event.preventDefault();
  // display feedback to user
  go2ResultScreen();
});


