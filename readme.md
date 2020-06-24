# Express with APIs - OMDB

We'll be creating an app that connects to [OMDB](http://www.omdbapi.com), a public movie API. You will need a key. Go to the site to register for a free one. Keep API keys out of public repos!

## Getting Started

* Fork and clone this repository, which has a starter app provided for you.
* Run `npm install` to install dependencies
* Read the API [documentation](http://www.omdbapi.com).

# Part 1: Search

## User Stories
1. As a user, I want to go to a home page to search a database full of movies.
2. As a user, I want to see movie results based on my search query.
3. As a user, I want to pick a movie result and see detailed information about the movie.

## Requirements
1. On your home page, create a form. The form will ask for the user to input a movie title.
  * This form should have a `GET` method, with an action of `/results`
  * Example result of submitting the form: sends browser to `/results?q=star+wars`
  * HINT: What should you name your input field based on the query string above?
2. Write your GET route for `/results`.
  * Use `req.query` to access query string parameters.
  * Use the `axios` module to make a request to the OMDB API with this data. YOU WILL NEED TO INSTALL AND REQUIRE IT.
  * Send the data back to the browser. Use `res.render` and use the provided `results.ejs` template.
3. In the results from the API, we notice that in every movie entry
there is a IMDBid. In the rendered HTML for `/results`, have each movie link
to a route like `/movies/tt234323` (where `tt234323` is the IMDBid for that movie).
  * Make a new route on your backend: `GET /movies/:movie_id`
  * Make an API call to retrieve movie details related to that `movie_id`
  * Render them on the provided `detail.ejs` page.

## Tips
* Remember the axios syntax for a GET request:
* ```js
  axios.get('some url goes here')
    .then(function (response) {
      console.log(response);
    })
  ```

* The movie api returns an array of movies inside the `Search` Key.

* [Example Search URL: http://www.omdbapi.com/?s=matrix](http://www.omdbapi.com/?s=matrix)
* [Example Movie Detail URL: http://www.omdbapi.com/?i=tt0133093](http://www.omdbapi.com/?i=tt0133093)

* You will need to modify the above URLs to include an entry in the query string for your API Key. The exact thing to add is `apikey=XXXXXXXXX` replacing the Xs with your key. How do we separate multiple key-values pairs in a query string?

* Keep your API key as an environment variable inside a .env file and make sure you DO NOT EVER check this file into git. How do we ensure it stays out?

* Make sure you call `res.render` inside the callback function of the API call.

## Bonuses (if you get done before break)

* Add stars images to reflect the imdb ratings
* Figure out what parameters are need to access the Rotten Tomato information, and display that information to the page

# Part 2: Saving Faves

## User Stories
1. As a user, I want to save movies from my search results to a list of my faves.
2. As a user, I want to perform this action from the movie detail page.

## Steps to Achieve
1. Install the new node modules needed for database access.
2. Initialize sequelize for this project.
3. Update the config file and create a database named `omdb`.
4. Create a `fave` model with two fields- `title:string` and `imdbid:string`
5. Run migrations.
6. Require your model into the location of your routes.
7. Modify your `detail.ejs` to include a form for adding this movie as a fave:
  * This form should have a `POST` method, with an action of `/faves`
  * It should contain two *hidden* fields containing the title and IMDB ID of this movie. These fields should be named the same as your model attribute names.
8. Write your POST route for `/faves`:
  * Use `req.body` to access body data from the form.
  * Use the fave model to save this data to your database. YOU WILL NEED TO REQUIRE THE MODEL TO USE IT.
  * In the callback of your `create`, use `res.redirect` to redirect to the GET route for your faves.
9. Write your GET route for `/faves`:
  * Use the fave model to get all faves from your database.
  * In the callback, use `res.render` to render all your faves to a page named `faves.ejs` (not provided).

---

## Licensing
1. All content is licensed under a CC-BY-NC-SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
