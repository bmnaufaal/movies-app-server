# Movies App API Documentation

## Endpoints :

List of available endpoints:

## Movies :

- `GET /movies`
- `POST /modes/add`
- `GET /movies/:id`
- `PUT /movies/:id`
- `PATCH /movies/:id`
- `DELETE /movies/:id`

## Genres :

- `GET /genres`
- `GET /genres/:id`
- `POST /genres/add`
- `PUT /genres/:id`
- `DELETE /genres/:id`

## Histories :

- `GET /histories`

## User :

- `POST /register`
- `POST /login`
- `POST /google-sign-in`

## Customer :

- `POST /customers/register`
- `POST /customers/login`
- `POST /customers/google-sign-in`
- `GET /customers/movies`
- `GET /customers/genres`
- `GET /customers/moviesMaxLength`
- `GET /customers/movies/:id`
- `GET /customers/bookmarks`
- `GET /customers/bookmarks/:id`
- `DELETE /customers/bookmarks/:id`
- `POST /customers/bookmarks/add`

## 1. GET /movies

Description:

- Get all movie from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "title": "The Last Of Us",
    "synopsis": "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
    "trailerUrl": "https://www.youtube.com/watch?v=uLtkt8BonwM&ab_channel=HBOMax",
    "imgUrl": "https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_FMjpg_UX1000_.jpg",
    "rating": 9,
    "genreId": 3,
    "authorId": 3,
    "status": "Active",
    "createdAt": "2023-02-23T12:16:35.420Z",
    "updatedAt": "2023-02-23T12:16:35.420Z",
    "Genre": {
      "id": 3,
      "name": "Thriller",
      "createdAt": "2023-02-23T12:16:35.418Z",
      "updatedAt": "2023-02-23T12:16:35.418Z"
    },
    "Author": {
      "id": 3,
      "username": "neildruckmann",
      "email": "neildruckmann@omniture.com",
      "role": "Admin"
    }
  },
  ...,
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 2. POST /movies/add

Description:

- Create movie

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "title": "string",
  "synopsis": "string",
  "trailerUrl": "string",
  "imgUrl": "string",
  "rating": "integer",
  "genreId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 10,
  "title": "Fight Club",
  "synopsis": "A depressed man (Edward Norton) suffering from insomnia meets a strange soap salesman named Tyler Durden (Brad Pitt) and soon finds himself living in his squalid house after his perfect apartment is destroyed. The two bored men form an underground club with strict rules and fight other men who are fed up with their mundane lives. Their perfect partnership frays when Marla (Helena Bonham Carter), a fellow support group crasher, attracts Tyler's attention.",
  "trailerUrl": "https://www.youtube.com/watch?v=qtRKdVHc-cE&ab_channel=RottenTomatoesClassicTrailers",
  "imgUrl": "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
  "rating": 10,
  "genreId": 1,
  "authorId": 3,
  "status": "Active",
  "updatedAt": "2023-02-25T11:30:26.075Z",
  "createdAt": "2023-02-25T11:30:26.075Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "Title should not be null",
    "Synopsis should not be null",
    "Minimum rating is 1"
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 3. GET /movies/:id

Description:

- Get movie by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "title": "The Last Of Us",
  "synopsis": "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
  "trailerUrl": "https://www.youtube.com/watch?v=uLtkt8BonwM&ab_channel=HBOMax",
  "imgUrl": "https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_FMjpg_UX1000_.jpg",
  "rating": 9,
  "genreId": 3,
  "authorId": 3,
  "status": "Active",
  "createdAt": "2023-02-23T12:16:35.420Z",
  "updatedAt": "2023-02-23T12:16:35.420Z",
  "Genre": {
    "id": 3,
    "name": "Thriller",
    "createdAt": "2023-02-23T12:16:35.418Z",
    "updatedAt": "2023-02-23T12:16:35.418Z"
  },
  "Author": {
    "id": 3,
    "username": "neildruckmann",
    "email": "neildruckmann@omniture.com",
    "role": "Admin"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 4. PUT /movies/:id

Description:

- Edit movie by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "title": "string",
  "synopsis": "string",
  "trailerUrl": "string",
  "imgUrl": "string",
  "rating": "integer",
  "genreId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Fight Club success to edit"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 5. PATCH /movies/:id

Description:

- Edit movie by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "status": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Fight Club success to edit status"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 6. DELETE /movies/:id

Description:

- Delete movie by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Fight Club success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 7. GET /genres

Description:

- Get all genres from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Comedy",
        "createdAt": "2023-02-14T09:03:11.083Z",
        "updatedAt": "2023-02-14T09:03:11.083Z"
    }
    ...,
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 8. GET /genres/:id

Description:

- Get genre by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Action",
  "createdAt": "2023-02-23T12:16:35.418Z",
  "updatedAt": "2023-02-23T12:16:35.418Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Genre not found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 9. POST /genres/add

Description:

- Create genre

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 6,
  "name": "Genre 1",
  "updatedAt": "2023-02-16T01:23:45.994Z",
  "createdAt": "2023-02-16T01:23:45.994Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": ["Genre name should not be null"]
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 10. PUT /genres/:id

Description:

- Edit genre by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Horror success to edit"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Genre not found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 11. DELETE /genres/:id

Description:

- Delete genres by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Genre 1 success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Genre not found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Not Authorized"
}
```

&nbsp;

## 12. POST /register

Description:

- Register account

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
  "phoneNumber": "string"
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": [
        "Username should not be empty",
        "Email should not be empty",
        "Email should be email format",
        "Password should not be empty"
    ]
}
OR
{
    "message": [
        "This email is already taken"
    ]
}
```

&nbsp;

## 13. POST /login

Description:

- Login account

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 14. POST /google-sign-in

Description:

- Sign in with google account

Request:

- headers:

```json
{
  "token_google": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

&nbsp;

## 15. POST /customers/register

Description:

- Register account for customers

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": [
        "Email should not be empty",
        "Email should be email format",
        "Password should not be empty"
    ]
}
OR
{
    "message": [
        "This email is already taken"
    ]
}
```

&nbsp;

## 16. POST /customers/login

Description:

- Login account for customers

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 17. POST /google-sign-in

Description:

- Sign in with google account for customers

Request:

- headers:

```json
{
  "token_google": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

&nbsp;

## 18. GET /customers/movies

Description:

- Get all movie for customers

Request:

- params:

```json
{
  "page": "integer (optional)",
  "size": "integer (optional)",
  "filter": "integer (optional)",
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "title": "The Last Of Us",
    "synopsis": "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
    "trailerUrl": "https://www.youtube.com/watch?v=uLtkt8BonwM&ab_channel=HBOMax",
    "imgUrl": "https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_FMjpg_UX1000_.jpg",
    "rating": 9,
    "genreId": 3,
    "authorId": 3,
    "status": "Active",
    "createdAt": "2023-02-23T12:16:35.420Z",
    "updatedAt": "2023-02-23T12:16:35.420Z",
    "Genre": {
      "id": 3,
      "name": "Thriller",
      "createdAt": "2023-02-23T12:16:35.418Z",
      "updatedAt": "2023-02-23T12:16:35.418Z"
    },
    "Author": {
      "id": 3,
      "username": "neildruckmann",
      "email": "neildruckmann@omniture.com",
      "role": "Admin"
    }
  },
  ...,
]
```

&nbsp;

## 19. GET /customers/genres

Description:

- Get all genres for customers

Request:

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Comedy",
        "createdAt": "2023-02-14T09:03:11.083Z",
        "updatedAt": "2023-02-14T09:03:11.083Z"
    }
    ...,
]
```

&nbsp;

## 20. GET /customers/moviesMaxLength

Description:

- Get all movies length for customers

Request:

_Response (200 - OK)_

```json
[
    "message": 10
]
```

&nbsp;

## 21. GET /customers/movies/:id

Description:

- Get movie by id for customers

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "title": "The Last Of Us",
  "synopsis": "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
  "trailerUrl": "https://www.youtube.com/watch?v=uLtkt8BonwM&ab_channel=HBOMax",
  "imgUrl": "https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_FMjpg_UX1000_.jpg",
  "rating": 9,
  "genreId": 3,
  "authorId": 3,
  "status": "Active",
  "createdAt": "2023-02-23T12:16:35.420Z",
  "updatedAt": "2023-02-23T12:16:35.420Z",
  "Genre": {
    "id": 3,
    "name": "Thriller",
    "createdAt": "2023-02-23T12:16:35.418Z",
    "updatedAt": "2023-02-23T12:16:35.418Z"
  },
  "Author": {
    "id": 3,
    "username": "neildruckmann",
    "email": "neildruckmann@omniture.com",
    "role": "Admin"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

&nbsp;

## 22. GET /customers/bookmarks

Description:

- Get all bookmarks for customers

Request:

_Response (200 - OK)_

```json
[
    {
        "id": 14,
        "CustomerId": 2,
        "MovieId": 6,
        "createdAt": "2023-03-02T12:25:50.409Z",
        "updatedAt": "2023-03-02T12:25:50.409Z",
        "Movie": {
            "id": 6,
            "title": "Castlevania",
            "synopsis": "A vampire hunter fights to save a besieged city from an army of otherworldly creatures controlled by Dracula.",
            "trailerUrl": "https://www.youtube.com/watch?v=L7iWXfZzEMc&ab_channel=Netflix",
            "imgUrl": "https://m.media-amazon.com/images/M/MV5BMjAzMjU2MjYzMl5BMl5BanBnXkFtZTgwNTQ4Nzk1NjM@._V1_FMjpg_UX1000_.jpg",
            "rating": 8,
            "genreId": 3,
            "authorId": 2,
            "status": "Active",
            "createdAt": "2023-03-02T12:25:50.047Z",
            "updatedAt": "2023-03-02T12:25:50.047Z",
            "Author": {
                "id": 2,
                "username": "jamescameron",
                "email": "jamescameron@wordpress.com",
                "role": "Staff"
            },
            "Genre": {
                "id": 3,
                "name": "Thriller"
            }
        }
    },
    ...,
]
```

&nbsp;

## 23. GET /customers/bookmarks/:id

Description:

- Get movie by id for customers

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "title": "The Last Of Us",
  "synopsis": "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
  "trailerUrl": "https://www.youtube.com/watch?v=uLtkt8BonwM&ab_channel=HBOMax",
  "imgUrl": "https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_FMjpg_UX1000_.jpg",
  "rating": 9,
  "genreId": 3,
  "authorId": 3,
  "status": "Active",
  "createdAt": "2023-02-23T12:16:35.420Z",
  "updatedAt": "2023-02-23T12:16:35.420Z",
  "Genre": {
    "id": 3,
    "name": "Thriller",
    "createdAt": "2023-02-23T12:16:35.418Z",
    "updatedAt": "2023-02-23T12:16:35.418Z"
  },
  "Author": {
    "id": 3,
    "username": "neildruckmann",
    "email": "neildruckmann@omniture.com",
    "role": "Admin"
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
OR
{
  "message": "Bookmark not found"
}
```

&nbsp;

## 24. DELETE /customers/bookmarks/:id

Description:

- Delete bookmarks by id for customers

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success delete bookmark"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Not authorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Bookmark not found"
}
```

&nbsp;

## 25. POST /customers/bookmarks/add

Description:

- Create bookmark for customers

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "MovieId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 41,
  "CustomerId": 2,
  "MovieId": 1,
  "updatedAt": "2023-03-05T15:26:59.480Z",
  "createdAt": "2023-03-05T15:26:59.480Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Already bookmarked"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
