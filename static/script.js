$(document).ready(function() {

  $('#fav-button').click(function(e) {
    e.preventDefault();

    console.log("fav button clicked");
    // Okay I want to send a POST request to 
    // a page that will handle adding a movie
    // to the favs table in my database.
    // So here, I need to include 
    // 1. type of request (POST)
    // 2. the route for this (whatever I want,
    // and then I just need to handle that in my 
    // controller), and
    // 3. information that tells the controller
    // what movie to add to the favs table
    // That information could either be the
    // imdbID which can be grabbed from the url
    // or could I send actual data? 

    // YOU BETTER INCLUDE DATA, OR ELSE THIS WILL
    // FAIL WITH NO EXPLANATION.  SERIOUSLY.
    var url =  $(this).attr("imdbID");
    console.log("Going to", url);
    $.ajax({
      method: 'POST',
      url: '/movies/' + url,
      data: url
    }).done(function(response) {
      console.log("***** static/script.js:26 ******")
      console.log(window.location.href);
      window.location.href = '/';
    });
  });

});
