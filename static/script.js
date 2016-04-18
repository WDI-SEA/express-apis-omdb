$('.add-favorite-btn').click(function(e){
  var imdbId = $(this).attr('href');
  debugger
  $.ajax({
    url: '/movies/favorites/' + imdbId,
    method: 'POST',
    data: {
      imdbId: imdbId
    },
    done: function(xhr, status, data) {
      if(status === 200) {
       var data = JSON.parse(body);
       var favorites = data.imdbId;
       res.render('/movies/favorites', {results: results});
      }
    }
  });

});
