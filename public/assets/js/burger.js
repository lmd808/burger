// currently set up for the .updateOne function only
$(function() {
	// when they click on eat burger
	$('.eatburger').on('click', function(event) {
		// prevent default
		event.preventDefault();
		// set id to this data (what we're clicking on)
		var id = $(this).data('id');
		// create devoured state variable
		var devouredState = {
			// set the value of the devoured key to 1 because we're working with booleans and not mysql statments
			devoured: 1
		};

		// Send the PUT request.
		$.ajax('/api/burger/' + id, {
			type: 'PUT',
			data: devouredState
		}).then(function() {
			// reload page
			location.reload();
		});
	});
});
