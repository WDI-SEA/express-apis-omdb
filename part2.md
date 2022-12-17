# Part 2: Saving Faves

## User Stories
1. As a user, I want to save movies from my search results to a list of my faves.
2. As a user, I want to perform this action from the movie detail page.

## Steps to Achieve
1. Install the new node modules needed for database access.
2. Initialize sequelize for this project.
3. Update the config file and create a database named `omdb`.
4. Create a `fave` model with two fields- `title:string` and `imdbID:string`
5. Run migrations.
6. Require your model into the location of your routes.
7. Modify your `detail.ejs` to include a form for adding this movie as a fave:
  * This form should have a `POST` method, with an action of `/faves`
  * It should contain two *hidden* fields containing the title and IMDB ID of this movie. These fields should be named the same as your model attribute names.
  <input hidden name="imdbID" value="<%= film.imdbID %>" />
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
