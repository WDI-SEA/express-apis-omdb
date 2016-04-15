$(document).ready(function() {
    $('.add-favorite').on('click', function(e){
        e.preventDefault();
        var imdbId = e.target.id;
        var myUrl = '/favorites/' + imdbId;
        console.log(myUrl);
        $.ajax({
            method:'POST',
            url: myUrl,
            data: {imdbId: imdbId},
        }).done(function(response){
            console.log('response');
        });
    });

    $('.remove-favorite').on('click', function(e){
        e.preventDefault();
        var imdbId = e.target.id;
        var myUrl = '/favorites/remove/' + imdbId;
        $.ajax({
            method:'POST',
            url: myUrl,
            data: {imdbId: imdbId},
        }).done(function(response){
            console.log('response');
        });
    });
});

