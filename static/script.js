$('.add_to_favorites').click(function(e) {
  var imbdID = $(this).closest('h3').text();
  $.ajax({
    url: '/favorites' + imbdID,
    method: 'POST',
    data: {
      imbdId: imbdId
    },
    done: function(xhr, status, data) {
      if(status === 200) {

          db.favorite.create({Title: movie.Title}).then(function(movie) {
            res.redirect('favorites');
            console.log(movie);
        });
      }
    }
  });
});