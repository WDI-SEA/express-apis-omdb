
$('.delete-btn').on('click', function(e) {
	e.preventDefault();
	var myUrl = $(this).attr('href');
	$.ajax({
		method: 'DELETE',
		url: myUrl
	}).done(function(){
		console.log("it worked");
	}); 
});