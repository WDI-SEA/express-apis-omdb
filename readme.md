# Express with APIs - OMDB

We'll be creating an app that connects to [OMDB](http://www.omdbapi.com), a public movie API.

## Getting Started

* Fork and clone this repository, which has a starter app provided for you.
* Run `npm install` to install dependencies
  * If installed, `nodemon` should start and refresh your app when changes are made
  * Use [eslint](http://eslint.org/docs/user-guide/getting-started) if you'd like to lint your JS
    * `npm run lint:js` - lint your JS
    * Note that from here on out, the JS linter will automatically fix most issues with spacing, quotations, and semicolons. [More information here](http://eslint.org/blog/2015/10/eslint-v1.6.0-released#autofixing-of-more-rules)
  * Use [csslint](https://www.npmjs.com/package/css-lint) if you'd like to lint your CSS
    * `npm run lint:css` - lint your CSS
* Read the API [documentation](http://www.omdbapi.com).

## User Stories
1. As a user, I want to go to a home page to search a database full of movies.
2. As a user, I want to see movie results based on my search query.
3. As a user, I want to pick a movie result and see detailed information about the movie.

## Requirements
1. On your home page, create a form. The form will ask for the user to input a movie title.
  * This form should have a `GET` method, with an action of `/results`
  * Example result of submitting the form: sends browser to `/results?q=star+wars`
2. Write your GET route for `/results`.
  * Use `req.query` to access querystring parameters.
  * Use the `request` module to make a request to the OMDB API with this data
  * Send the data back to the browser. Use `res.render` and use an ejs template
3. From the search results page, we notice along with every movie entry
there is a IMDBid. In the rendered HTML for `/results`, have each movie link
to a route like `/movies/tt234323` (where `tt234323` is the IMDBid).
  * Make a new route `/movies/:movie_id`
  * Make an API call to retrieve movie details related to that `movie_id`

## Tips
* The `data` object we get back in a `request` callback, is a `string`
of the data. Use `JSON.parse(data)` to turn that data back into an object.
* The movie api returns an array of movies inside the `Search` Key.

* [Example Search URL](http://www.omdbapi.com/?s=matrix)
* [Example Movie Detail URL](http://www.omdbapi.com/?i=tt0133093)

* Make sure you call `res.render` inside the callback function of the request.


## Bonuses

* Add stars images to reflect the imdb ratings
* Figure out what parameters are need to access the Rotten Tomato information, and display that information to the page
* Add the ability for users to add movies to a favorites list, and save that list as a JSON file

---

## Licensing
1. All content is licensed under a CC-BY-NC-SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
