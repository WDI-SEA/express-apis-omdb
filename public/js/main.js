$(document).ready(function(){
  console.log("DOM READY");

  $(".add-favorites").click(function(e) {
    e.preventDefault();
    var favoriteElement = $(this);
    var favoriteUrl = favoriteElement.attr('href');
    $.ajax({
      type: 'POST',
      url: favoriteUrl,
    }).done(function(data){
      console.log(data);
      // window.location = "/results";
      favoriteElement.text("Added to favorites!");
      favoriteElement.removeClass();
      favoriteElement.addClass("btn btn-success");
    });
  });


});
