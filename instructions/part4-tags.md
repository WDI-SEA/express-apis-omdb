#Adding Tags to Movies

Your goal is to add tag functionality to the movie app. Users should be able to add tags to their favorite movies, and be able to see a page with all the tags users have added.

* **Create Tags table**
	* attributes (columns):
		* tag
	* associate to favorite items (many to many)
		* tag BELONGS TO MANY favorite items
		* favorite item BELONGS TO MANY tags
* **Create join table**
	* attributes (columns):
		* tagId
		* favoriteId
* **Modify favorites page**
	* Add an "add tag button" to each entry on the favorites page
		* links a form where the user can type a tag
		* findOrCreate the tag and then associate it to the approporiate favorite item
* **Create Tag page**
	* Lists all tags in the tags table
	* Tags should be clickable and link to the favorites page, but filter the list by movies that have been tagged with that tag.

##Bonuses

* sort the tag list by popularity
* create a tag cloud where the tags font is larger depending on how popular it is
