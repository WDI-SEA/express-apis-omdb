
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
      if(status ===200){
      }
      
      window.location.href = 'http://localhost:3000/favorites';

    }
  })

});

$('.delete').on('click', function(e){
  e.preventDefault();
  // var imdbId = $('#movie').attr('data');
  var imdbId =$(this).attr('data');

  var title = $('#movieTitle').text();
  var title =$(this).attr('data');
  var year = $('#movieYear').text();

  $.ajax({
      url:'/favorites/',
      method: 'DELETE',
      data: {
        imdbId: imdbId,
        title: title,
        year: year
    },
  }).done(function(){
        //do stuff when the delete action is complete
        //redirect or update view
        console.log("deleted success")
      });
});
