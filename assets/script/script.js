$(document).ready(function(){

//starting variables array 
//create a function that takes the starting variables and creates buttons for them 
//create a dynamic input box with a listener for new entries
//create a click funtion to append the new entry into the buttons section up top
//create an api function that will pull information from giphy when a button is clicked 
//create a function that will apend pictures and info to the dom

	var InitialSearchTerms = ["cat", "dog", "bird"];
	var TermToAdd;
	var CurrentSearchTerms;
	var clickedGiphy;

	var CreateButtons = function(searchterm) {
		var NewButton = $('<button>');
			NewButton.attr('id','giphyButton');
			NewButton.attr('data-name',searchterm);
			NewButton.html(searchterm);
			$('#searchTerms').append(NewButton);

		} //end CreateButtons function

	function AddNewTerm () {
		var editedTerm = TermToAdd.trim()
		.replace(/\s/g,"+") //convert spaces to +
		.replace(/[^A-Za-z0-9+]/g,"") //remove punctuation, etc
		.toLowerCase();

		console.log(editedTerm);	
		

		if (CurrentSearchTerms.indexOf(editedTerm) > -1) {
			console.log("term exists");
		}
		else {
			CreateButtons(editedTerm);
			CurrentSearchTerms.push(editedTerm);
		}
	}; //end AddNewTermButton


	function APIFunction () {
		var APIDetail = {
			url: "https://api.giphy.com/v1/gifs/search?q=",
			key: "dc6zaTOxFJmzC",
			keyword: clickedGiphy,	
		}
		var APIurl = APIDetail.url+APIDetail.keyword+"&api_key="+APIDetail.key;
		console.log(APIurl);
		  $.ajax({
            url: APIDetail.url+APIDetail.keyword+"&api_key="+APIDetail.key,
            method: "GET"
        }).done(function(response) {
        	for (var i = 0; i < 10; i++) {
        		var newDiv = $('<img>')
        		.attr("src",response.data[i].images.original.url)
        		.prependTo('#resultsArea');

        	}

       		console.log(response.data[0].images.original.url);
        });

	}; //end API Function



	function StartApplication () {
		CurrentSearchTerms = InitialSearchTerms
		for (var i = 0; i < InitialSearchTerms.length; i++) {
			CreateButtons(InitialSearchTerms[i])

		};
		$('#inputBox').append($('<input type=text id=NewSearchTermBox>'));
		$('#inputBox').append($('<button id=NewSearchButton>Add Term </button>'));

		$(document).on('click','#NewSearchButton',function(){
			TermToAdd = $('#NewSearchTermBox').val().trim();
			console.log(TermToAdd);
			AddNewTerm();
		}); //end click function

		$(document).on('click','#giphyButton',function() {
			 clickedGiphy = $(this).attr("data-name");
			console.log(clickedGiphy);
			APIFunction();

		});// end click giphybutton

	}; //End StartApplication Function
StartApplication();


}); //end document.ready