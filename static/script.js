
$('.add-to-favs-btn').click(function(e){
  var imdbId = $('#movie').attr('data');
  console.log(imdbId);
  var title = $('#movieTitle').text();
  console.log(title);
  var year = $('#movieYear').text();
  console.log(year);
  $.ajax({
    url: '/favorites/',
    method: 'POST',
    data: {
      imdbId: imdbId,
      title: title,
      year: year
    },
    success: function(xhr, status, data){
      window.location = '/favorites/';
    }
  })

});

$('.delete').on('click', function(e){
  e.preventDefault();
  // $(this).closest('h2').attr('data');
  // var imdbId = $('#movie.id').attr('data');
  var favId =$(this).attr('id');

//ajax sends request
  $.ajax({
      url:'/favorites/',
      method: 'DELETE',
      data: {
        favId: favId,
      },
      success: function(text, status, data) {
        $('#'+favId).parent().remove();
      }
  });
});
