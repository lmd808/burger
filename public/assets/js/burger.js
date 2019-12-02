$(function() {
	$('.eatburger').on('click', function(event) {
		event.preventDefault();

		var id = $(this).data('id');
		var devouredState = {
			devoured: 1
		};

		// Send the PUT request.
		$.ajax('/api/burger/' + id, {
			type: 'PUT',
			data: devouredState
		}).then(function() {
			console.log('Burger devoured');
			location.reload();
		});
	});
});
