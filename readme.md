#Express with APIs - OMDB

We'll be creating an app that connects to [OMDB](http://www.omdbapi.com), a public movie API.

##Getting Started

* Fork and clone this repository, which has a starter app provided for you.
* Run `npm install` to install dependencies
  * If installed, `nodemon` should start and refresh your app when changes are made
  * `npm run lint:js` - lint your JS
    * Note that from here on out, the JS linter will automatically fix most issues with spacing, quotations, and semicolons. [More information here](http://eslint.org/blog/2015/10/eslint-v1.6.0-released#autofixing-of-more-rules)
  * `npm run lint:css` - lint your CSS

## User Stories
1. As a user, I want to go to a home page to search a database full of movies.
2. As a user, I want to see movie results based on my search query.
3. As a user, I want to pick a movie result and see detailed information about the movie.

## Requirements
1. Create a form that sends a query and gets a list of results from the OMDB API. Read over the [documentation](http://www.omdbapi.com) to see the endpoints needed.
  * This form should have a `GET` method, with an action of `/results`
2. List the results on a separate page. You may want the route to accept a querystring so users can easily go back to this page.
  * Example: `/results?q=star+wars`
  * Use `req.query` to access querystring parameters.
3. From the search results page, we notice along with every movie entry
there is a IMDBid. Have each movie link to a route like `/movie/tt234323`.
Take the parameter from that url and make an additional API call to
retrieve movie details related to that `imdbID`
4. Create a new route that takes the paramaters of the`imdbID`in the url
on a `movies` controller. The route you will need to make will look
like `/movies/:imdbId`. Using the data from `req.params` make a
second api call to the api to get the movie details.


##Tips
* The `data` object we get back in a `request` callback, is a `string`
of the data. Use `JSON.parse(data)` to turn that data back into an object.
* The movie api returns an array of movies inside the `Search` Key.

* [Example Search URL](http://www.omdbapi.com/?s=matrix)
* [Example Movie Detail URL](http://www.omdbapi.com/?i=tt0133093)

* Make sure you call `res.render` inside the callback function of the request.


##Bonuses

* Add stars images to reflect the imdb ratings
* Figure out what parameters are need to access the Rotten Tomato information, and display that information to the page
* Add the ability for users to add movies to a favorites list, and save that list as a JSON file
