function selectSport(id){
    $("#sportselection").val(id);
}

// search function to search sports
function searchSport() {
	// get the sport name
	var sport_name = document.getElementById('sport_name').value;
	window.location = '/sports/search' + encodeURI(sport_name);
}