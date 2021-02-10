var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var clickPattern = [];
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
    console.log("gamepattern" +gamePattern);
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
    console.log(event.target.id);
    console.log("clickpattern"+clickPattern);
    var level;
    for(var i = 0; i<clickPattern.length; i++){
        if(clickPattern[i] != gamePattern[i]){
            var wrongSound = new Audio("wrong.mp3");
            wrongSound.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");}
            ,250);
            console.log("until then Loser");
            press();
            $("#level-title").html("Game Over, Press Any Key to Restart");
        }
        level = i+2;
        if(clickPattern.length == gamePattern.length){
        $("#level-title").html("Level "+level);
    }
    }
    if(gamePattern.length !=0 && clickPattern.length !=0 && gamePattern.length == clickPattern.length ){
        if(JSON.stringify(gamePattern) == JSON.stringify(clickPattern)){
                setTimeout(nextSequence,1000);
                console.log("ur winning");
        }
    }
});
window.onload = press();
