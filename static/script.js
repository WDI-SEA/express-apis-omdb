$(document).ready(function() {
    $('.glyphicon-star-empty').on('click', function(e){
        e.preventDefault();
        var imdbId = e.target.id;
        var myUrl = '/favorites/' + imdbId;
        console.log(myUrl  +  "******");
        $.ajax({
            method:'POST',
            url: myUrl,
            data: {imdbId: imdbId}, 
        }).done(function(response) {
            console.log(response);
            if (response === 'created') {
                $(e.target).toggleClass('glyphicon-star glyphicon-star-empty');
            }
            // $(e.target).toggleClass('glyphicon-star glyphicon-star-emp   ty');
        })
    });

    $('.add-favorite').on('click', function(e){
        e.preventDefault();
        var imdbId = e.target.id;
        var myUrl = '/favorites/' + imdbId;
        console.log(myUrl);
        $.ajax({
            method:'POST',
            url: myUrl,
            data: {imdbId: imdbId}, 
        }).done(function(response) {
            $(e.target).children('span').toggleClass('glyphicon-star glyphicon-star-empty');
        })
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
            window.location.reload(true);
        });
    });
});

