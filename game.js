// Create array of colors, set level to 0 and create variable if game is started or not
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
started = false;

// When user presses any key call function
$(document).keypress(function() {
  // If game is not ongoing atm then switch h1 text and call nextSequence()
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Event listener for colored buttons clicks
$(".container .btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  // Playsound is not working on live page since some browsers block any sound (mostly bc of loud ads)
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  // Add to level
  level++;
  $("h1").text("Level " + level);

  // Since math.random returns only 0 or 1, I multiplyed it by 4 (4 colors) and of course floor it so they are rounded and not floats
  var randomNumber = Math.floor(Math.random() * 4);
  // Get random color from colors array and get the color from index of random number
  var randomChosenColor = buttonColors[randomNumber];
  // Append it to gamePattern array
  gamePattern.push(randomChosenColor);

  // Animate the choosen box that was randomly selected
  $("#" + randomChosenColor).fadeTo(100, 0.3, function() {
    $(this).fadeTo(500, 1.0);
    playSound(randomChosenColor);
  });
}

function checkAnswer(currentLevel) {
  // If game array colors are the same as array of colors that user clicked continue adding levels
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Since user didn't choose the right colors, restart game
    $("h1").text("Konec igre, pritisni gumb na tipkovnici za ponovitev");
    startOver();
  }
}

// Get audio file based on color name that is passed ("green.mp3")
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.volume = 0.1;
  audio.play();
}

// Add and remove class to button that is styled in CSS file
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Reset level and game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
