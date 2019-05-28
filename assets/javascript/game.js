$(document).ready(function() {

var heroes = ["Goku", "Spider-Man", "Ironman", "One Punch Man"];

// function to display hero data
function renderButtons(){

    // 
    $("#button-view").empty();

    // looping through the array of topics
    for (i=0; i < heroes.length; i++) {
        
        // dynamic button generated
        var a = $("<button>");
        // adding a class
        a.addClass("hero");
        // adding data-attribute with value of heroes at index i
        a.attr("hero-name", heroes[i]);
        // adding text value to button
        a.text(heroes[i]);
        // adding button to the HTML
        $("#button-view").append(a);
    }
}

// Adding button for heroes 
$("#add-hero").on("click", function(event){

    event.preventDefault();

    var hero = $("#hero-input").val().trim();

    heroes.push(hero);

    $("hero-input").val("");

    renderButtons();

    console.log(heroes);
})

renderButtons();

// Pulling hero gifs from giphy api

$(document).on("click", ".hero", function(){

    var hero = $(this).attr("hero-name");
    console.log (this);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        hero + "&api_key=aV4XV0UMMkbHJCOI3nWb5fraoWtOZrqc&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
})

    .then(function(response){
        //console.log (queryURL);
        //console.log (response);

        var results = response.data;

        $("#heroes-view").empty();

        for (var i=0; i < results.length; i++) {

            var heroDiv = $("<div>");

            //var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + results[i].rating);

            var heroImage = $("<img>");

            heroImage.attr("src", results[i].images.fixed_height.url);

            heroDiv.append(p);
            heroDiv.append(heroImage);

            $("#heroes-view").append(heroDiv);
        }
    });
});


});


