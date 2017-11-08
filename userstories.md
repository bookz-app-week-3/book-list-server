Day 1 User Stories & Feature Tasks

Overview

Implement a basic full stack application scaffold for a book list, which will render books from a PostgreSQL database.

As a developer, I want to separate the Client UI from the backend API so that my project is thoughtfully organized.

Create a new GitHub organization to hold your frontend and backend repositories.
Create two new repositories for your week 3 project, boook-list-client and book-list-server. You will be building your application this week as two separate components: an API (backend) and a Client (frontend).
As a user, I want to host my app on a reliable, scalable application hosting service so that I can access my mobile app when I'm on the go and share it with others.

Create a basic Hello World HTML scaffold based on the above Client/ directory structure.
Merge your scaffold to a gh-pages branch on GitHub. This should provide you with a basic scaffold deployment for your client application that you will build upon throughout the rest of the week.
As a developer, I want to deploy the backend API to a hosting service so that other developers may build their own frontend interfaces for this application.

See the adjacent deployment document for specific instructions
Create a basic server scaffold based on the above Server/ directory structure.
For testing purposes, you can include a temporary route such as app.get('/test', (req, res) => res.send('hello world')) to validate that your API has been successfully deployed.
Include any basic NPM requirements and ensure that they are documented as Dependencies in your package.json.
Create a new Application instance on Heroku from the Command Line using the naming convention of <your initials>-booklist. Your Heroku Application URL should look like https://initials-booklist.herokuapp.com.
Push your scaffold application to Heroku from the Command Line.
Validate that your API has been successfully deployed by navigating your browser to your /test endpoint.
As a developer, I want to seed my local development database with books so I have data to test my development application with.

Your server should connect to a specific database such as postgres://localhost:5432/book_list, cached in a DATABASE_URL environment variable.
Create a new table in your database called books.
Your books table should include a book_id as the primary key plus the following properties: author, title, isbn, image_url, and description
Using the provided JSON data for books in data/, manually enter each record into your PostgreSQL books table from the PostgreSQL Shell on your machine.
As a developer, I want my backend API to utilize a PostgreSQL Database for managing the persistence layer of my application.

Set up your basic Express server scaffold, cors middleware, and start a UNIX-socket for connections on a PORT.
Add the ability to connect to a PostgreSQL database via the pg (Node PostgreSQL) NPM package.
Connect your client to the DB using the defined DATABSE_URL environment variable and ensure that you have an event listener set up to handle any error events on the client instance.
As a developer, I want the client to have the ability to request all resources from the database through a RESTful endpoint.

Create a new endpoint at GET /api/v1/books which will retrieve an array of book objects from the database, limited to only the book_id, title, author, and image_url.
Redeploy your application.
As a developer, I want the client application to have access to a deployed PostgreSQL database so the user data persists across application sessions.

Add the PostgreSQL add-on to your Application on Heroku.
Verify that your DATABASE_URL environment variable is correctly set in the application and that you've referenced this as a primary value in your server.js file
Redeploy your application
As a user, I want to display all of my books at once so that I can see everything in a single view.

Create a View container for the following content:
List of all available books, by author and title. Include on the page the count of books that are in the DB.
About View for displaying content about you and your application.
Redeploy your application
As a user, I want a view which displays any error messages that occur during the usage of my book list application.

Set up a new global variable which will hold a reference to your API; this can point to localhost:3000 for now
Define a function called errorCallback which takes an error object as an argument when invoked.
Log the error, and pass the error to the errorView.initErrorPage view method.
Create an Error View:
Define a global variable called error-view and assign an empty object literal as it's value.
Define a method on errorView called initErrorPage which takes an argument of err and does the following:
Hides any element with a class of container.
Shows any element with a class of error-view.
Empties any content within the element with an id of error-message.
Compiles the Handlebars template with an id of error-template.
Renders the err argument into the template, and appends it to an element with an id of error-message.
As a user, I want my books to be rendered dynamically so that I can view all of the books in my list.

Define a constructor function called Book which takes an object literal as an argument.
Iterate over the argument's object keys to assign key/value pairs for creating a Book instance.
Define a Book instance method called toHtml which, when invoked, compiles the Handlebars template with an id of book-list-template, and return the template with that instance's content.
Define a static property on Book called all, and assign an empty array as it's value.
Define a static method on Book called loadAll which takes rows as an argument, and sorts rows by title, maps over rows to create an array of Book instances, and then assigns the new array of Books to Book.all.
Define a static method on Book called fetchAll which takes callback as an argument, and makes a request to the API at GET: /api/v1/books.
On success, pass the results to Book.loadAll, and then invoke the callback.
On failure, invoke the errorCallback.
Create a Book View:
Define a global variable called bookView and assign an empty object literal as its value.
Define a method on bookView called initIndexPage which hides any element with a class of container, shows any element with a class of book-view, and maps over the Book instances stored in Book.all to render each and append them to an element with the id of book-list.
Using jQuery's Document.ready functionality, invoke Book.fetchAll when the DOM has loaded, and pass bookView.initIndexPage as it's argument.
As a user, I want a simple, clean looking UI so that my application is easy to navigate.

Style your site using a mobile-only approach. Use the provided wireframes as a general guideline for the minimum styling requirements, while adding your own personal taste and color palette.
Ensure the proper use of SMACCS principles.
You will need to include icon fonts from a source such as Icomoon or FontAwesome for the social media icons you choose to include in the application.
Stretch Goals

As a developer, I want to automatically populate the database so my application is functioning efficiently.

Implement a NodeJS script that will read the books.json file and populate your postgres database with that content.
You will need to utilize the fs (file system) module from Node, as well as the pg module for setting up a database connection.

Day 2 User Stories


User Stories & Feature Tasks

Overview

Add functionality to the book list application for viewing a single book's details and adding a new book the to database. This includes client-side routing using PageJS.

As a user, I want to request information about a single book so that I can view additional details.

Add an endpoint for a GET request to /api/v1/books/:id.
This should allow the client to make a request for a singular book, which returns the details of that record from the DB.
Create a new static method to interact with your Book model, such as fetchOne.
As a user, I want the ability to add new books to my app so that my collection continues to grow.

Add an endpoint for a POST request to /api/v1/books.
This should allow the client to send a new book record to the backend and persist that record in the DB.
Create a new static method to interact with your Book model, such as create.
As a user, I want my app to redirect me to the home page on any other endpoint.

Add an endpoint that will catch any other requests to your API and return the user to your client-side home route.
As a user, I want my booklist to be a mobile-friendly single-page application so that I can view it on my mobile device.

Create a Controller file called routes.js and add the following endpoints:
/ - List View: Books by title and author with the image_url displaying a rendered image of the book
/books/:book_id - Detail View of one complete book record
/books/new - Form View that will allow the user to enter a new record into the DB
Your form should take the following inputs: title, author, isbn, image_url, and description
On Submit: this form should POST a new record to the /api/v1/books route on the backend
Redeploy your application.
As a user, I want my application to be clean and free of visual distractions so that I can view my books without other content cluttering the viewport.

Include a hamburger menu that will allow the ability to navigate between the / and /new views
NOTE: Users should be able to navigate to a /books/:book_id detail view by selecting that record from the main View.
Redeploy your application.
As a user, I want a simple, clean looking UI so that my application is easy to navigate.

Style your site using a mobile-only approach. Use the provided wireframes as a general guideline for the minimum styling requirements, while adding your own personal taste and color palette.
Ensure the proper use of SMACCS principles.
Your modules.css will probably become larger today, which means that you should exercise SMACSS further by modularizing that stylesheet into a modules/ dir with a file for each component of your site.
Continue to iterate on your styles. For example, begin to include standardized styles such as a color palette and defined font families.
Stretch Goals

As a developer, I want to explore further functionality so that I can continue to improve the user's experience.

Implement the ability for your hamburger menu to operate without the use of JavaScript. You will need to research how to enable a 'pop-up/out' style menu with vanilla HTML and CSS.
Consider any further UI/UX features which will allow a more friendly interface for your users.
