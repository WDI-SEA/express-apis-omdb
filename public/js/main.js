console.log("Ello...I said ello");
$(document).ready(function(){
  $('.searchMovies').on('submit', function(e){
    e.preventDefault();
    var searchForm = $(this);
    var searchUrl = searchForm.attr('action');
    var searchData = searchForm.serialize();
    $.ajax({
      method: 'PUT',
      url: searchUrl,
      data: searchData
    }).done(function(data){
      console.log(data);
      searchForm.remove();
      window.location ='/movies';
    })
  });
});
