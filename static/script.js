$('.add-favorite-btn').click(function(e){
  var imdbId = $(this).attr.('.imdbId');
  debugger
  $.ajax({
    url: '/favorites/' + imdbId,
    method: 'POST',
    data: {
      imdbId: imdbId
    },
    done: function(xhr, status, data) {
      if(status === 200) {
       var data = JSON.parse(body);
       var favorites = data.imdbId;
       res.render('favorites', {results: results});
      }
    }
  });

});



// $('.delete-button').click(function(e){
//   var id = $(this).attr('.id');
//   debugger

//   $.ajax({
//     url: '/favorites'
//     method: 'DELETE',
//     data: {
//       id: id
//     },