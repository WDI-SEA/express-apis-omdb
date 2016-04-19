$('.add_to_favorites').click(function(e) {
  var imdbID = $(this).attr('imdbID');
  $.ajax({
    url: '/favorites/' + imdbID,
    method: 'POST',
    data: {
      imdbID: imdbID
    },
    success: function(message, status, obj) {
      window.location = '/favorites';
    }
  });
});

// $('.comments_page').click(function(e) {
//   window.location = '/comments';
//   console.log("clicked")
// })