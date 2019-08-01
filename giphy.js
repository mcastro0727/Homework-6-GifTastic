//TODO
//Make new city buttons work to get gifs
//Figure out why clear form doesn't work
//Pause gifs



$(document).ready(function () {

    var cityList = [
        "Las Vegas",
        "New York",
        "London",
        "Paris",
        "Rome",
        "Dublin",
        "Beijing",
        "Dubai",
        "Manila"
    ];

    //Buttons for original city list
    function makeButtons() {
        $("#buttons").empty();
        for (let i = 0; i < cityList.length; i++) {
            console.log(cityList[i])
            $("#buttons").append("<button class='btn btn-info' data-city='" + cityList[i] + "'>" + cityList[i] + "</button>")
        }
    }

    makeButtons();


    // Add a button for city entered in form
    $("#add-city").on("click", function () {
        event.preventDefault();
        var newCity = $("#city-input").val().trim();
        cityList.push(newCity);
        makeButtons();
        clearForm();
        console.log(newCity)
    });

    //To clear form - NOT WORKING
    function clearForm() {
        $("#city-input").empty();
    }


    //Get gifs on button click from api
    $("button").on("click", function () {

        var city = $(this).attr("data-city");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city +
            "&api_key=dOGBIKdSTDlKIjpGECqZggOdOEfD8WsT&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                var results = response.data;

                $("#city-gifs").empty();


                for (var i = 0; i < results.length; i++) {
                    var cityDiv = $("<div>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var cityImage = $("<img>");

                    cityImage.attr("src", results[i].images.fixed_height.url);
                    cityImage.attr("data-still", results[i].images.fixed_height_still.url);
                    cityImage.attr("data-animate", results[i].images.fixed_height.url);
                    cityImage.attr("data-state", "still");
                    cityImage.attr("class", "gif");


                    cityDiv.prepend(cityImage);
                    cityDiv.prepend(p);

                    $("#city-gifs").append(cityDiv);

                }
            })

    })

    //To pause gifs - NOT WORKING
    $(".gif").on("click", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});