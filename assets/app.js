var animalArray = ["elephant", "hamster", "chicken", "cat", "dog", "ostrich", "cougar", "wolf", "polar bear", "tuna", "lobster", "alligator", "falcon"];




//---------------- On Load, make a button for each animal in the array
var onLoad = function() {
	for (var i = 0; i < animalArray.length; i++) {
		newButton(animalArray[i], "animal");
	}
}




// ----------------------------------------- Populate GIFs
var populate = function() {

	// Clear any gifs already displaying on the screen
	$("#results").empty();

	// Get the name of the animal and add it to the queryUrl
	var animalName = $(this).text();
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + animalName;

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		for (var i = 0; i < 10; i++) {

			// Get the URLs and Rating fron the returned JSON data
			var imageUrl = response.data[i].images.fixed_height.url;
			var stillUrl = response.data[i].images.fixed_height_still.url;
			var rating = response.data[i].rating;

			// Create a parent div to put the rating and gif inside
			var itemDiv = $("<div>")
			itemDiv.addClass("item-div");

			// Add the rating to the parent div
			itemDiv.html("<p>Rating: " + rating + "</p>");

			// Create an img element with the gif info, and add to parent div
			var animalImage = $("<img>");
			animalImage.attr("src", stillUrl);
			animalImage.attr("data-still", stillUrl);
			animalImage.attr("data-animate", imageUrl);
			animalImage.attr("data-state", "still");
			animalImage.addClass("gif");
			itemDiv.append(animalImage)

			// Add the parent div to the html
			$("#results").prepend(itemDiv);
		}
	});
}




//----------------------------------------- Add New Animals
var addAnimal = function() {
	event.preventDefault();
	var name = $("#name-input").val().trim().toLowerCase();

	// Check to make sure the submitted name is not already in the list
	if (animalArray.indexOf(name) == -1) {

		// If not, get the submitted name, make a button, and add it to the array
		newButton(name, "animal");
		animalArray.push(name);
	}
	else {
		// Otherwise, tell the user the animal is in the list
		alert("That animal is already in the list.");
	}
}




//------------------------ Make Buttons
var newButton = function (buttonText, desiredClass) {
	var btn = $("<button>");
	btn.addClass(desiredClass);
	btn.text(buttonText);
	$("#button-list").append(btn);
};




// --------------------------------- Animate GIF
var animateGIF = function() {
	var state = $(this).attr("data-state");
	if (state === "still") {
	$(this).attr("src", $(this).attr("data-animate"));
	$(this).attr("data-state", "animate");
	}
	else {
	$(this).attr("src", $(this).attr("data-still"));
	$(this).attr("data-state", "still");
	}
}


onLoad();
$("#page-wrapper").on("click", "#add", addAnimal);
$("#page-wrapper").on("click", ".animal", populate);
$("#page-wrapper").on("click", ".gif", animateGIF);