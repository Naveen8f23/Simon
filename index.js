var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var clickPattern = [];
 var currentLevel;
function press(){
            $(document).on("keydown",function(){
                gamePattern.splice(0,gamePattern.length);
                nextSequence();
                $("#level-title").html("Level 1");
                $(document).off("keydown");

            });
}
function theAnimation(name){
    $("#"+name).fadeOut(100).fadeIn(100);

    var audio = new Audio(name+".mp3");
    audio.play();
}
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    theAnimation(randomChosenColour);
    clickPattern.splice(0,clickPattern.length);

}
$(".btn").on("click",function(event){
    $("#"+event.target.id).addClass("pressed");
    setTimeout(function(){
        $("#"+event.target.id).removeClass("pressed");}
    ,100);
    theAnimation(event.target.id);
    clickPattern.push(event.target.id);
    for(var i = 0; i<clickPattern.length; i++){
        if(clickPattern[i] != gamePattern[i]){
            var wrongSound = new Audio("wrong.mp3");
            wrongSound.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");}
            ,250);
            press();
        }
        currentLevel = i+2;
        if(clickPattern[i] != gamePattern[i]){
               $("#level-title").html("Game Over,Your highest level is "+(gamePattern.length-1)+" Press Any Key to Restart");
            }
    }
        if(JSON.stringify(gamePattern) == JSON.stringify(clickPattern)){
                $("#level-title").html("Level "+currentLevel);
                setTimeout(nextSequence,1000);
        }
    
});
window.onload = press();
