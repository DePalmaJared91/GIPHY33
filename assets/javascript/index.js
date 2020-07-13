  
$(document).ready(function() {

    // Set initial array for queries.
    let devs = ["HTML", "CSS", "JavaScript", "Firebase", "jQuery", "URL", "Handlebars", "SQL", "Sequelize", "MERN", "MongoDB", "Ajax", "XML", "Python", "Syntax", "React", "JSX", "Heroku", "GitBash", "VSCode","CLI", "GitHub", "API", "JSON","C", "C++", "Swift", "Boolean", "Algorithm", "Var", "Const", "Data", "Database", "Console", "Bootstrap"]
    
    // For loop to create buttons from array.
    for (var i = 0; i < devs.length; i++) {
        let button = $("<button>");
        button.addClass("gif-button");
        button.attr("data-band", devs[i]);
        button.text(devs[i]);
        $("#buttons-display").prepend(button);
    }
    
    $(document).on('click', ".gif-button", function(){
        $("#gifs-appear-here").empty();
        var devs = $(this).text();
        console.log(devs);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + devs +
        "&api_key=NGFDsivXOcENju5JyVStCveLIxqtSoSS&limit=15";
    
        $.ajax({
            url: queryURL,
            method: "GET"
          })
          .then(function(response) {
    
            var results = response.data;
    
            for (var i = 0;  i < results.length; i++) {
              
              let animated = results[i].images.fixed_height.url;
              let still = results[i].images.fixed_height_still.url;
    
              var gifDiv = $("<div>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var devImage = $("<img>");
              
              devImage.attr("src", animated);
    
              devImage.attr("state", "a");
              devImage.attr("still", still);
              devImage.attr("animated", animated);
              devImage.attr("src", animated);
              
              gifDiv.prepend(p);
              gifDiv.prepend(devImage);
              $("#gifs-appear-here").prepend(gifDiv);
            };
          })
        });
    
        $("#add-dev").on("click", function(event) {
          event.preventDefault();
          var dev = $("#dev-input").val().trim();
          console.log(dev);
          devs.push(dev);
          newButton(dev);
        });
    
        function newButton(dev) {
            var btn = $("<button>");
            btn.addClass("gif-button");
            btn.text(dev);
            $("#buttons-display").append(btn);
        }
    
       $(document).on("click", "img", function() {
         console.log("working");
    
         let state = $(this).attr("state");
         
         if (state === "a") {
          $(this).attr("state", "s");
          $(this).attr("src", $(this).attr("still"));
        } else if (state === "s") {
          $(this).attr("state", "a");
          $(this).attr("src", $(this).attr("animated"));
        }
       });
    
    });