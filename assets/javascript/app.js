/*
-#inner2 starts with 'start' button
  -on click, randomly pick a question from array of question objects
    -each question object has a question and multiple answers

-questions will 'fade' into existence
-answers will swing left and right into #inner 2
-answers will be highlighted on hover
  -if wrong, #inner2 changes to red and shakes -- also plays incorrect sound
  -if correct, #inner2 changes to green and does some sort of confirmation animation -- also plays correct sound
  -if question objects all have 'answered' property set to true, end game screen is shown
  -reset button which reloads page

  -all of this was written before coding
*/

var questionOne = {
  question: "What company invented the floppy disk?",
  actualAnswer: "IBM",
  answers: ["Apple","Microsoft","IBM"],
  correct: 'incorrect'
};

var questionTwo = {
  question: "What is the first domain name ever registered?",
  actualAnswer: "Symblolic.com",
  answers: ["WorldWideWeb.com","Symblolic.com","Me.com"],
  correct: 'incorrect'
};

var questionThree = {
  question: "Which company is the largest producer of software for PC?",
  actualAnswer: "Microsoft",
  answers: ["Google","Microsoft","Dell"],
  correct: 'incorrect'
};

var questionFour = {
  question: "What is CPU?",
  actualAnswer: "Central Processing Unit",
  answers: ["Central Programming Unit","Central Processing Unit","Central Placement Unit"],
  correct: 'incorrect'
};

var questionFive = {
  question: "What is RAM?",
  actualAnswer: "Random Access Memory",
  answers: ["Random Access Memory","Random Automatic Memory","Random Automated Memory"],
  correct: 'incorrect'
};

var questionSix = {
  question: "Has modern cell phone computing power surpassed that of the Apollo 11 Lunar Lander?",
  actualAnswer: "True",
  answers: ["True","False"],
  correct: 'incorrect'
};

var questionSeven = {
  question: "The first computer mouse was constructed in 1964 with what material?",
  actualAnswer: "Wood",
  answers: ["Metal","Rubber","Wood"],
  correct: 'incorrect'
};

var questionEight = {
  question: "Approximately how many domain names are registered every month? (2014)",
  actualAnswer: "1,000,000",
  answers: ["200,000","600,000","1,000,000"],
  correct: 'incorrect'
};

var questionNine = {
  question: "Approximately how many web pages are on the internet today? (2014)",
  actualAnswer: "20,000,000,000",
  answers: ["5,000,000,000","10,000,000,000","20,000,000,000"],
  correct: 'incorrect'
};

var questionTen = {
  question: "What does 'PCMR' mean?",
  actualAnswer: "PC Master Race",
  answers: ["PC Master Race","PC Master Race","PC Master Race"],
  correct: 'incorrect'
};





var score = 0;
var questionHolder = [questionOne,questionTwo,questionThree,questionFour,questionFive,questionSix,questionSeven,questionEight,questionNine,questionTen];
var checker = [];
var randomQuestion;
var timer = 60;

function nextQuestion(){
  if(questionHolder.length != 0){
    randomQuestion = questionHolder[Math.floor((Math.random() * questionHolder.length) + 0)];
    var index = questionHolder.indexOf(randomQuestion);
    questionHolder.splice(index,1);

  }else{
    randomQuestion = undefined;
  }
}

function reset(){
  $('.container').css("background-color","#0060b8");
  $('#inner').empty();
  $('#inner2').empty();
}

function progress(){
  nextQuestion();
  if(randomQuestion != undefined){
    $('#inner').html("<p class='animated fadeInUp' style='font-family: Bungee;position: relative;top: 40px'>" + randomQuestion.question + "</p>");
    for(var i = 0; i < randomQuestion.answers.length; i++){
      $('#inner2').append("<div id='inner3' class='animated bounceInUp'>" + "<p id='inner3-sub'>" + randomQuestion.answers[i] + "</p>" + "</div>");
    }
  }else{
    end();
  }
}

function end(){
  reset();
  $('#inner').html("<p class='animated fadeInUp' style='font-family: Bungee;position: relative;top: 40px'>" + "Score: " + score + "</p>");
  for(var i = 0; i < checker.length; i++){
    $('#inner2').append("<p id='scores' class='animated zoomIn'>" + 'Question: ' + i + ' was ' + checker[i].correct + "</p>");
  }

  var done = setTimeout(function(){
    window.location.href = window.location.href;
  },5000);
}

function startTimer(){
  var control = setInterval(function(){
    timer--;
    console.log(timer);
    if(timer == 0){
      var clear = clearInterval(control);
      reset();
      end();
    }
  },1000)
}

$('#start').on("click",function(){
  startTimer();
  progress();
});

$(document).on('click','#inner3',function(event){
  document.getElementById('myAudio').play();
  if($(event.target).text().trim() === randomQuestion.actualAnswer){
    randomQuestion.correct = 'correct';
    var time = setTimeout(function(){
      $('.container').css("background-color","#0dd913");
      score += 100;
    }, 1800)
  }else{
    randomQuestion.correct = 'incorrect';
    var time2 = setTimeout(function(){
      $('.container').css("background-color","#e7170d");
    }, 1800);
  }

  checker.push(randomQuestion);

  var time3 = setTimeout(function(){
    reset();
    progress();
  },3000);
});
