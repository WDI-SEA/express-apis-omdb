//use jQuery to activate button
$('#put-form').on('click', function(e){
	e.preventDefault();
	console.log("hello")
	//var imdbId = $(this).closest('h2').text();
	var myUrl = $(this).attr('action'); //+ $(this).closest('h2').text();;
	var myData = $(this).serialize();
	console.log(myUrl);
	console.log(myData);
	$.ajax({
		method:"PUT",
		url:myUrl,
		data:myData
	}).done(function(xhr, status, data) {
		if(status == 200) {

		}
	});
});