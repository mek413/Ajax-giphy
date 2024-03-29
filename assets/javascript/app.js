$(document).ready(function(){
    var comicChar = ["superman","batman","the flash","joker","hulk","captain america","wonder woman","spider man","iron man","dr strange","silver surfer","doctor doom","lex luthor","magneto"];
    function generateButtons(){
        $(".buttons-div").empty();

        for(var i=0;i<comicChar.length;i++){
            var createButton = $("<button>");
            createButton.addClass("characters");
            createButton.attr("data-name", comicChar[i]);
            createButton.text(comicChar[i]);
            $(".buttons-div").append(createButton);
        }
    };
    function displayGifs(){
        $("#gifs-div").empty();
        $('button').css({backgroundColor: 'red'});
        $(this).css({backgroundColor: 'black'});
        var comicCharacter = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comicCharacter + "&apikey=cdCHK1Q5574PUjuAh3oJwy6x6FwAk2eU&rating=g&limit=9";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var results = response.data;
            for(j=0;j<results.length;j++){
                var charDiv = $("<div class='character'>");
                var p = $("<p>").text("Rating: " + results[j].rating);
                var charImage = $("<img class='gif' data-state='still'>");
                charImage.attr('data-still',results[j].images.fixed_height_still.url);
                charImage.attr('data-animate',results[j].images.fixed_height.url)
                charImage.attr("src", results[j].images.fixed_height_still.url);
                charDiv.append(p);
                charDiv.append(charImage);
                $("#gifs-div").append(charDiv);
                
            }
            $(".gif").on("click",function(){
                var state = $(this).attr("data-state");
        
                if(state === 'still'){
                    $(this).attr("src", $(this).attr('data-animate'));
                    $(this).attr("data-state", "animate");
                }
                else{
                    $(this).attr("src",$(this).attr('data-still'));
                    $(this).attr("data-state", "still")
                };
            });
        });
    };
    $("#add-character").on("click", function(event){
        event.preventDefault();
        var character = $("#character-input").val().trim().toLowerCase();
        comicChar.push(character);
        generateButtons();
    });
    $(document).on("click",".characters", displayGifs);
    generateButtons();
})