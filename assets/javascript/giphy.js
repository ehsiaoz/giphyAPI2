$(document).ready();

//Variables=============================

var searchTermArray = ['Elephants', 'Monkeys', 'Lions', 'Tigers', 'Polar Bears'];


//Functions==================

function renderButtons(){ 

		// Deletes buttons prior to adding new buttons
		$('#buttons-view').empty();

		// Loops through the array of search terms
		for (var i = 0; i < searchTermArray.length; i++){

			// Then dynamicaly generates buttons for each search term in the array
		    var a = $('<button>') // create the beginning and end tag. (<button></button>)
		    a.addClass('searchTerm'); // Added a class for the search term buttons
		    a.attr('data-name', searchTermArray[i]); // Added a data-name attribute to the button
		    a.text(searchTermArray[i]); // Provided the initial button text
		    $('#buttons-view').append(a); // Added the button to the HTML
		}
	}

// Function for rendering the JSON content results from API for each button into the div
	function displayGif(){

		var searchTerm = $(this).attr('data-name'); 
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

		//Hit the queryURL, take the data and display it in the div with an id of gallery
		$('#gallery').empty();	
		
		$.ajax({
				url: queryURL, 
				method: 'GET'
			})
			.done(function(response) {
			var results = response.data;

			for (var i = 0; i < results.length; i++) {

				var gifDiv = $('<div class="item">')
				var rating = results[i].rating;
				var p = $('<p>').text("Rating: " + rating);
				var image = $('<img>');
				image.attr({
					src:results[i].images.fixed_height.url,
					class: "gif",
					'data-animate': results[i].images.fixed_height.url,
					'data-still': results[i].images.fixed_height_still.url,
					'data-state': "animate",
				});

				gifDiv.append(p);
				gifDiv.append(image);

				$('#gallery').prepend(gifDiv);
				$('#galleryTitle').html("Giffy Gallery - " + results.length + " Results");
			}
		});
	}

	function pauseGif() {
            var state = $(this).attr('data-state');
            
            if ( state == 'animate'){
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
            else{
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }           
    }

//Buttons/Images============================================

$(document).on('click', '.searchTerm', displayGif);

$(document).on('click', '.gif', pauseGif);


$('#submitTerm').on('click', function(){

		// This line of code will grab the input from the textbox
		var searchTerm = $('#search-term').val().trim();

		// clears the input field after clicking submit
		$('input[type="text"]').val('');

		// The search terms entered by the user from the textbox is added to the existing search Term array
		searchTermArray.push(searchTerm);
		
		// Runs function to render buttons based on the new results of the array
		renderButtons();

		// This line is so that users can hit "enter" instead of clicking on the submit button and it won't move to the next page
		return false;
	})


// ========================================================

	// This calls the renderButtons() function
	renderButtons();

