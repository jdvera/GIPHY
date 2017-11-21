var animalArray = ["elephant", "hamster", "chicken", "cat", "dog", "ostrich", "cougar", "wolf", "polar bear", "tuna", "lobster", "alligator", "falcon"];


//---------------------------------- On Load
var onLoad = function() {
	for (var i = 0; i < animalArray.length; i++) {
		newButton(animalArray[i], "animal");
	}
}




// ----------------------- Populate GIFs
var populate = function() {
	$("#results").empty();
	var animalName = $(this).text();
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + animalName;

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response.data[0]);
		for (var i = 0; i < 10; i++) {
			var imageUrl = response.data[i].images.fixed_height.url;
			var stillUrl = response.data[i].images.fixed_height_still.url;
			var rating = response.data[i].rating;
			var itemDiv = $("<div>")
			itemDiv.addClass("item-div");
			itemDiv.html("<p>Rating: " + rating + "</p>");
			var animalImage = $("<img>");
			animalImage.attr("src", stillUrl);
			animalImage.attr("data-still", stillUrl);
			animalImage.attr("data-animate", imageUrl);
			animalImage.attr("data-state", "still");
			animalImage.addClass("gif");
			itemDiv.append(animalImage)
			$("#results").prepend(itemDiv);
		}
	});
}




//------------------------ Search function
var addAnimal = function() {
	event.preventDefault();
	var name = $("#name-input").val();
	animalArray.push(name);
	newButton(name, "animal");
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