#OMDB - Part 2

##Expand on the movie search project

Finish up your movie project (from earlier this week) and add these features.

* **Modify the Show Movie page** (`GET /movies/:imdbId`)
  * add "Add to Favorites" button
    * Should add the IMDB code, title, and year to a database
    * Should submit data to `POST /favorites`
* **Favorites Page** (`GET /favorites`)
  * show a list of movies that have been favorited
  * each item should...
    * Display title and year
    * Link to "show movie" page
    
    
**BONUS**

* Add delete and edit buttons to favorites list (see the lecture on AJAX with Express)

##Add new dependencies

Don't forget you need sequelize, pg, and pg-hstore to add database support
```
npm install sequelize pg pg-hstore --save
```

##Routes

| verb | url | view | description |
|---|---|---|---|
| GET | /favorites | favorites/index.ejs | List all favorites in the favorites model. (READ) |
| POST | /favorites/:imdbid | none. redirects to /movies/:imdbid | Adds a movie to the database (CREATE a favorite) |

Both of the above routes should be created in a `controllers/favorites.js` to keep things orgainzed.

Additionally, it may be beneficial to have each **Add to Favorites** button submit a form with hidden inputs, in order to submit the imdbID, title, and year.

##Recommended Model


**Model name:** favorite

**Attributes:** imdbId, title, year
