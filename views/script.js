

$('.fav_add').on('click', function(e){
	console.log("clicked");
	var i = $('#fav_url').val();
	console.log(i);
    e.preventDefault();

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
    	console.log("finished destroy");
        $('.fav_add').toggleClass('hidden');
        $('.fav_del').toggleClass('hidden');
    });
});