$('.add-favorite-btn'.click(function() {
	var imdbId = $(this).closest('h3').text();

	$.ajax({
		url: '/favorites/' + imdbId,
		method: 'POST',
		data: {
			imdbId, imdbId
		},
		done: function(xhr, status, data) {
			if(status == 200) {
				
			}
		}
	});
});