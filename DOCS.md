# Sales Management Platform APIs

This document provides information on how to run the Sales Management Platform APIs locally and lists the technologies used in the project.

## Technologies Used

The Sales Management Platform APIs are built using the following technologies:

-Node.js: A JavaScript runtime environment that allows executing JavaScript code on the server-side.
-Express: A popular web application framework for Node.js that simplifies the creation of APIs and web applications.
-Body-parser: A middleware module for parsing incoming request bodies in a middleware before the handlers.
-CORS: A middleware that enables Cross-Origin Resource Sharing for handling HTTP requests from different origins.
-swagger-ui-express: A middleware for rendering Swagger UI to visualize and interact with the API resources.
-YAML: A human-readable data serialization format used to define the API documentation.
-MySQL: A popular open-source relational database management system used for storing data.
-jsonwebtoken: A package used to create and verify JSON Web Tokens (JWTs) for authentication and authorization.
-Postman: A collaboration platform for API development and testing, used to check and interact with the APIs.
-Visual Studio Code: A widely used source code editor that provides a rich set of features for web development.

## Local Setup

To run the Sales Management Platform APIs locally, please follow the instructions below:

1. Ensure that you have Node.js installed on your machine. If not, you can download it from the official website: [Node.js Downloads](https://nodejs.org/en/download/).

2. Clone the project repository from the desired location:

   ```bash
   git clone <repository-url>


## Now then procced with following task


1. Navigate to the project directory:

cd <project-directory>
2. Install project dependencies by running the following command:
bash
npm install
3. Start the server by executing the following command:
npm start
The API server will now be running on http://localhost:9000.

## API Documentation
The Sales Management Platform APIs are documented using Swagger. To view and interact with the API documentation, follow these steps:
Make sure the API server is running locally by following the instructions mentioned in the "Local Setup" section.
Open a web browser and navigate to http://localhost:9000/api-docs.
The Swagger UI will be displayed, providing an overview of the available endpoints and their descriptions.
Explore the API documentation by expanding the different sections and interacting with the endpoints.

## Additional Information
The main server file is located at server.js.
The API routes for users are defined in routes/users.js.
The API documentation is defined in api.yaml.

If you encounter any issues or have any questions, please don't hesitate to reach out for assistance.



## API Token Authentication
To access protected API endpoints, you need to include a token in the following format:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikt1bWFyIiwiaWF0IjoxNjg4NTMwNDkxLCJleHAiOjE2ODg1MzEzOTF9.u-Fb4XdZ802vPpw9de5YO2aXET9vhRKO0vy2CEjW2uA

Make sure to include the word "Bearer" followed by a space before the token. The token should be placed in the Authorization header of your API request.

When making a request to an API endpoint that requires authentication, include the above Authorization header in your request. The server will validate the token's authenticity and permissions. If the token is valid and not expired, you will be granted access to the protected resources or operations.

Remember to replace the example token with the actual token provided to you for authentication.

For more information on how to use API token authentication and the specific endpoints that require authentication, please refer to the API documentation or contact the API provider.

Feel free to modify and format this information as needed to fit your README.md file.






