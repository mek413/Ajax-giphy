$(document).ready(function(){
    var comicChar = ["superman","batman","flash","joker"];
    function generateButtons(){
        $(".buttons-div").empty();

        for(var i=0;i<comicChar.length;i++){
            var createButton = $("<button>");
            createButton.addClass("character");
            createButton.attr("data-name", comicChar[i]);
            createButton.text(comicChar[i]);
            $(".buttons-div").append(createButton);
        }
    }
    $("#add-character").on("click", function(event){
        event.preventDefault();

        var character = $("#character-input").val().trim().toLowerCase();
        comicChar.push(character);
        generateButtons();
    })
    generateButtons();
})