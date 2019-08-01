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

    //Buttons for city list
    function makeButtons() {
        $("#buttons").empty();
        for (let i = 0; i < cityList.length; i++) {
            console.log(cityList[i])
            $("#buttons").append("<button class='btn btn-success' data-city='" + cityList[i] + "'>" + cityList[i] + "</button>")
        }
    }

    makeButtons();

    //Get gifs on button click from api
    $("button").on("click", function () {

            var city = $(this).attr("data-city");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city +
                "&api_key=dOGBIKdSTDlKIjpGECqZggOdOEfD8WsT&limit=10";
            console.log(city);

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

                    cityDiv.prepend(cityImage);
                    cityDiv.prepend(p);

                    $("#city-gifs").append(cityDiv);


                }
            })
        })

	// Add a button for city entered in form
	$("#add-city").on("click", function () {
		event.preventDefault();
		var city = $("#city-input").val().trim();
		cityList.push(city);
        makeButtons();
        clearForm();
    });
    
    function clearForm() {
    $("#city-input").empty();
    }



    })
