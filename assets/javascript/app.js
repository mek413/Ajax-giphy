$(document).ready(function(){
    var comicChar = ["superman","batman","the flash","joker"];
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
        var comicCharacter = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comicCharacter + "&apikey=cdCHK1Q5574PUjuAh3oJwy6x6FwAk2eU&rating=g&limit=10";
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