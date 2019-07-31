                
                
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
                ]

                //Buttons for original city list

                for (let i = 0; i < cityList.length; i++) {
                    console.log(cityList[i])
                    var cityButton = $("<button>" + cityList[i] + "</button>");
                    cityButton.appendTo("#buttons");
                }



                //Get gifs on button click from api

                $("button").on("click", function () {

                    for (let i = 0; i < cityList.length; i++) {
                    var city = (cityList[i])
                    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city +
                        "&api_key=dOGBIKdSTDlKIjpGECqZggOdOEfD8WsT&limit=10";
                        console.log(city)
                    }

                    $.ajax({
                            url: queryURL,
                            method: "GET"
                        })
                        .then(function (response) {
                            var results = response.data;

                            for (var i = 0; i < results.length; i++) {
                                var cityDiv = $("<div>");

                                var rating = results[i].rating;

                                var p = $("<p>").text("Rating: " + rating);

                                var cityImage = $("<img>");
                                cityImage.attr("src", results[i].images.fixed_height.url);

                                cityDiv.prepend(cityImage);
                                cityDiv.prepend(p);

                                $("#gifs-appear-here").prepend(cityDiv);

                            }
                        })
                });