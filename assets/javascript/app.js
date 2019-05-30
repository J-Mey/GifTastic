$(document).ready(function() {

var topics = ["Son Goku", "Spider-Man", "Ironman", "One Punch Man", "John Wick", "Batman", "Black Widow", "Thor", "Vegeta"];

// function to display hero data
function renderButtons(){

    // 
    $("#button-view").empty();

    // looping through the array of topics
    for (i=0; i < topics.length; i++) {
        
        // dynamic button generated
        var a = $("<button>");
        // adding a class
        a.addClass("hero");
        // adding data-attribute with value of topics at index i
        a.attr("hero-name", topics[i]);
        // adding text value to button
        a.text(topics[i]);
        // adding bootstrap button properties
        a.addClass("btn btn-primary");
        // adding button to the HTML
        $("#button-view").append(a);
    }
}

// Adding button for heroes 
$("#add-hero").on("click", function(event){

    event.preventDefault();

    var hero = $("#hero-input").val().trim();

    topics.push(hero);

    $("#hero-input").val("");

    renderButtons();

    console.log(topics);
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
        
        var results = response.data;

        $("#heroes-view").empty();

        for (var i=0; i < results.length; i++) {

            // creating tempory div to place rating and image in HTML
            var heroDiv = $("<div>");

            heroDiv.addClass("imageContainer");

            // creating tempory p for ratings
            var p = $("<p>").text("Rating: " + results[i].rating);

            // creating tempory img for gifs
            var heroImage = $("<img>");

            // adding attributes to the images pull from giphy
            heroImage.attr("src", results[i].images.fixed_height_still.url);
            heroImage.attr("data-animate", results[i].images.fixed_height.url);
            heroImage.attr("data-still", results[i].images.fixed_height_still.url);
            heroImage.attr("data-state", "still");
            heroImage.attr("data-state", "animate");

            // On click function to stop animation
            heroImage.on("click", startAnimation);

            // appending ratings and images to heroDiv
            heroDiv.append(p);
            heroDiv.append(heroImage);

            // appending heroDiv to the HTML
            $("#heroes-view").append(heroDiv);
        }
    });

    // function to stop animation 
    function startAnimation (){
        var state = $(this).attr("data-state");
        var animate = $(this).attr("data-animate");
        var still = $(this).attr("data-still");
        
       if (state === "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }else{
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        } 

    }


});


});


