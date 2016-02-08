#Adding Comments to OMDB

We're going to use one to many associations to allow people to comment on favorite movies.

* **Modify favorites page**
	* Add a "comments" button next to each item in the list
	* The comments button should link to a new page (comments page).
	  * Recommended route for the new page: /favorites/:id/comments
* **Comments page**
	* Lists all comments for a specific post
	* Should list comments based on a URL parameter (favorite item id)
	* Have a form to **add a comment** associated to that favorite item
* **Comments model**
	* attributes (columns):
		* comment text
		* comment author
		* foreign key to reference favorite item
	* associate to favorite items
		* favorite item HAS MANY comments
		* comment BELONGS TO one favorite item

##Deliverables

* A working OMDB app that allows users to:
  * view comments
  * add comments
