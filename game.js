var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  gamePattern.forEach((color,i) => { setTimeout(function(){
    $("#" + color).fadeOut(200).fadeIn(200);
    playSound(color);},i*600);});
  level++;
  $("#level-title").text("level " + level);
}

$(document).on("click", function(event) {
  var userChosenColour = event.target.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function() {
  if (level === 0) {
    nextSequence();
  }
});

function playSound(colour) {
  var sound = new Audio("sounds/" + colour + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("#level-title").text("Game over");
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")},200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
function playGameSequence(x) {
  setTimeout(function(x) {
    console.log(gamePattern[x]);

  }, 500);

}
