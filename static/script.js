$('.add-favorite-btn').click(function(){
  var imdbID = $('#movieTitle').attr('dataImdbId');
  var titleFav = $("#movieTitle").text();
  var yearFav = $("#movieDate").text().slice(1,$("#movieDate").text().length-1);
  $.ajax({
    url: '/favorites/',
    method: 'POST',
    data: {
      imdbID: imdbID,
      titleFav: titleFav,
      yearFav: yearFav
    },
    done: function(xhr, status, data){
      if(status === 200){
          // JQUERY REDIRECT HERE
      }
    }

  });

  // console.log(location);
  // var imdbID = location.pathname.slice(location.pathname.length - 9, location.pathname.length);
  // console.log(imdbID);

});