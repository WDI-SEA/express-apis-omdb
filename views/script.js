$('.fav_add').on('click', function(e){
    e.preventDefault();
	console.log("clicked");
	var i = $('#fav_url').val();
	console.log(i);

    var myUrl = "/favorites/" + i;
    console.log("myUrl: " + myUrl);

    $.ajax({
        method:'POST',
        url:myUrl
    }).done(function(){

        $('.fav_add').toggleClass('hidden');
        $('.fav_del').toggleClass('hidden');
    });
});

$('.fav_del').on('click', function(e){
	console.log("clicked");
	var i = $('#fav_url').val();
	console.log(i);
    e.preventDefault();

    var myUrl = "/favorites/" + i;
    console.log("myUrl: " + myUrl);

    $.ajax({
        method:'DELETE',
        url:myUrl,
    }).done(function(){
    	console.log("done case");
        $('.fav_add').toggleClass('hidden');
        $('.fav_del').toggleClass('hidden');
    })
});

$('.fav_del_list').on('click', function(e){
	e.preventDefault();
	console.log("clicked " + e.currentTarget.id);

	var i = e.currentTarget.id;

	var myUrl = "/favorites/" + i;
	console.log("myUrl: " + myUrl);

	$.ajax({
		method:'DELETE',
		url:myUrl,
	}).done(function(){
		console.log("done case list");
		$('.well_' + e.currentTarget.id).toggleClass('hidden');
	})
});