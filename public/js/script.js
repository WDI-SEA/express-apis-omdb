$(document).ready(){
  console.log('locked/loaded');

  $('.addFav').click(function(e){
    e.preventDefault;
    var favorite = $(this).closest('p').text();
      $.ajax({
        url: '/favorites/' + favorite;
        method: 'POST',
        //anything in data here ends up req.body
        data: {
          favorite: favorite
    },
    done: function(xhr, status, data){
      if(status === 200) {

        }
      }
    });
  });



});