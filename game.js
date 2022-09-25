buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
function nextSequence() {
    userPattern = [];
    level++;
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("h1").html("Level " + level);
    $(".btn." + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}



$('.btn').click(function () {
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    var lastAnswerIndex = userPattern.length - 1;
    checkAnswer(lastAnswerIndex);
    playSound(userChosenColour);
    animatePress(userChosenColour);
});


function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }


    }
    else {
        gameOver();
        startOver();
    }
}


function gameOver() {
    playSound("wrong");
    $(document.body).addClass('game-over');
    setTimeout(function () {
        $(document.body).removeClass('game-over');
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart");
}

function startOver() {
    started = false;
    gamePattern = [];
    level = 0;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");

    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass('pressed');
    setTimeout(function () {
        $("." + currentColour).removeClass('pressed');
    }, 100);

}