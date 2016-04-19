$('.add-favorite-btn').click(function(){
  var imdbId = $('#movieTitle').attr('dataImdbId');
  var titleFav = $("#movieTitle").text();
  var yearFav = $("#movieDate").text().slice(1,$("#movieDate").text().length-1);
  $.ajax({
    url: '/favorites/',
    method: 'POST',
    data: {
      imdbId: imdbId,
      titleFav: titleFav,
      yearFav: yearFav
    },
    done: function(xhr, status, data){
      if(status === 200){
      }
    }

  });

  // console.log(location);
  // var imdbID = location.pathname.slice(location.pathname.length - 9, location.pathname.length);
  // console.log(imdbID);

});




$('.delete-link').on('click', function(e){
    e.preventDefault();
    var myID = $(this).attr('id');
    $.ajax({
        method:'DELETE',
        url:'/favorites',
        data: {
          id:myID
        }
    }).done(function(){
       location.reload();
        //redirect or update view
    });
});