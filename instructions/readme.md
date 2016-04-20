https://wdi_sea.gitbooks.io/notes/content/05-express/express-apis/03apis.html
^^^ look at this

#Express with APIs - OMDB

We'll be creating an app that connects to [OMDB](http://www.omdbapi.com), a public movie API.

##Note

Fork and clone this repository and setup a basic Express app. Make sure to finish the main requirements for this project, because we'll be adding to the assignment over the next week.

##Requirements
1. User goes to home page that has a search form field for a movie.
2. The search form will take the user to a search results page of movie listings on the route.
3. Each movie link should click into a view with detailed information about the movie.


##How to get Started
1. Create a form that sends a query and gets results from the OMDB API. Read over
the documentation to see the endpoints needed.

The next step is to turn the movie results into links that will go to a new
route, and make an additional API requests for additional movie details.

2. From the search results page, we notice along with every movie entry
there is a IMDBid. Have each movie link to a route like `/movie/tt234323`.
Take the parameter from that url and make an additional API call to
retrieve movie details related to that `imdbID`

3. Create a new route that takes the paramaters of the`imdbID`in the url
on a `movies` controller. The route you will need to make will look
like `/movies/:imdbId`. Using the data from `req.params` make a
second api call to the api to get the movie details.


##Tips
* The `data` object we get back in a `request` callback, is a `string`
of the data. Use `JSON.parse(data)` to turn that data back into an object.
* The movie api returns an array of movies inside the `Search` Key.

* [Example Search URL](http://www.omdbapi.com/?s=matrix)
* [Example Movie Detail URL](http://www.omdbapi.com/?i=tt0133093)

* Make sure you do the `res.render` inside the callback function of the request.


##Bonus

* Add stars images to reflect the imdb ratings
* Figure out what parameters are need to access the rotten tomato listings.
