
$('#favorite-btn').click(function(e) {

  var newFavorite = {
    title: $('h3').text(),
    year: $('h4').text(),
    imdbId: $(this).attr('data-imdbId')
  }

  $.ajax({
    url: '/favorites',
    method: 'POST',
    data: newFavorite,
    success: function() {
      window.location = '/favorites';
    }
  })
});

// $('#cmt-submit').click(function(e) {

//   var newComment = {
//     author: $('').text()
//   }
// })