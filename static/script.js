
$('.delete-btn').on('click', function(e) {
	e.preventDefault();
	var myUrl = $(this).attr('href')
	$.ajax({
		method: 'DELETE',
		url: myUrl
	}).done(function() {
		location.reload();
		console.log("it worked");
	}); 
});

// $('#go-back').on('click', function(e) {
// 	function goBack() {
// 	window.history.back();
// 	}
// })
