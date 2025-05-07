
# face-recognition App
A full-stack web application that enables users to register, sign in and submit images for face detection. It is built with a React frontend and a Node.Js/Express backend, with PostgreSql as the database (hosted on supabase). The app integrates the Clarifai API to detect faces in submitting image URLs and highlights them in the UI. We also designed and implemented RESTful API to access seeded application data programmatically with documented endpoints for user authentication, profile management and image analysis. Features include User Authentication, Face detection, RESTful API, seeded Data, Error Handling, Deployment ready and modern frontend
Tech Stack - 
Frontend: React(JavaScript, jSX), using axios for API requests.
Backend: Node.js, Express, ( with CORS enabled with custom error-handling middleware)
Database: PostgreSqL(managed via supabase)
Face detection API: Clarifai
Hosting: render (express API) and Netlify(React Frontend).

Getting Started
Pre-requisite: Ensure That Node.js and npm are installed on your system and that you have access to a postgreSQl database . Setup environment variable: create a .env file in the backend directory with the clarifai environment setup with your own keys

Install frontend and backend dependencies using npm
