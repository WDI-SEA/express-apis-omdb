// $('.add-favorite-btn').click(function(e){
//   var imdbId = $(this).attr('href');
//   debugger
//   $.ajax({
//     url: '/favorites/' + imdb_id,
//     method: 'POST',
//     data: {
//       imdb_id: imdb_id
//     },
//     done: function(xhr, status, data) {
//       if(status === 200) {
//        var data = JSON.parse(body);
//        var favorites = data.imdbId;
//        res.render('/favorites', {results: result});
//       }
//     }
//   });

// });

$('.add-favorite-btn').click(function(e){
  e.preventDefault();
  var imdbId = $(this).attr('href');
  var myUrl = '/favorites/' + imdbId;
  console.log(myUrl);
  $.ajax({
    method:'POST',
    url: myUrl,
    data: {imdbId: imdbId}, 
  })
});