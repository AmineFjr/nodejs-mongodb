# PROJECT NODEJS & MONGODB

- `npm install `
- `npm start`

### Features : 
- Authentication : User can authenticate using a username and password. JWT is generated within.
- Registration : User can register using a username and password, email is needed as well.
- Logout : User can logout, JWT is destroyed.

- Create Posts : 
Users can create new posts which includes the post's content, an optional image, and automatically generated metadata such as the user ID, likes, dislikes, and arrays for the IDs of users who have liked or disliked the post.

- Read Posts : 
Users can view all posts or a specific post using the post's ID.

- Update Posts:
Users can update a specific post using the post's ID.

- Delete Posts :
Users can delete a specific post using the post's ID.

- Like/Dislike Posts : 
Users can like or dislike a post. They can also cancel their like or dislike.

###  API Endpoints : 
- POST    /api/register    Register a new user
- POST    /api/login    Login a user
- POST    /api/logout    Logout a user
- POST    /api/posts/    Create a new post
- GET    /api/posts/    Get all posts
- GET    /api/posts/:id    Get a specific post
- PUT    /api/posts/:id    Update a specific post
- DELETE    /api/posts/:id    Delete a specific post
- POST    /api/posts/:id/like    Like/Dislike a specific post
- Replace :id with the ID of the post. For liking/disliking a post, send a request body with a like property that is either 1 (for like), -1 (for dislike), or 0 (to cancel a like/dislike).

###  Built With :
- Node.js
- Express.js
- MongoDB
- Mongoose

### Members : AMINE FAJRY, NALVAC ATINHOUNON