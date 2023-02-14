# Movie API Documentation

## Endpoints :

List of available endpoints:

- `GET /movies`
- `GET /genres`
- `POST /modes/add`
- `GET /movies/:id`
- `DELETE /movies/:id`

## 1. GET /movies

Description:

- Get all movie from database

Request:

_Response (200 - OK)_

```json
[
    {
        "id": 3,
        "title": "Quo Vadis, Baby?",
        "synopsis": "Drama|Thriller",
        "trailerUrl": "http://dummyimage.com/170x100.png/5fa2dd/ffffff",
        "imgUrl": "http://dummyimage.com/205x100.png/cc0000/ffffff",
        "rating": 1,
        "genreId": 2,
        "authorId": 5,
        "createdAt": "2023-02-14T09:03:11.085Z",
        "updatedAt": "2023-02-14T09:03:11.085Z",
        "Genre": {
            "id": 2,
            "name": "Drama",
            "createdAt": "2023-02-14T09:03:11.083Z",
            "updatedAt": "2023-02-14T09:03:11.083Z"
        },
        "Author": {
            "id": 5,
            "username": "mslavin4",
            "email": "bscading4@omniture.com",
            "password": "$2a$08$VH2EANsC8kVYvIYberUFV.6t9Mpz5pv.dXYPbV9W5dGoj1iTU/beC",
            "role": "admin",
            "phoneNumber": "644-767-4991",
            "address": "Room 1201",
            "createdAt": "2023-02-14T09:03:11.077Z",
            "updatedAt": "2023-02-14T09:03:11.077Z"
        }
    }
    ...,
]
```

&nbsp;

## 2. GET /genres

Description:

- Get all genres from database

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

## 3. POST /movies/add

Description:

- Create movie

Request:

- body:

```json
{
  "title": "string",
  "synopsis": "string",
  "trailerUrl": "string",
  "imgUrl": "string",
  "rating": "integer",
  "genreId": "integer",
  "authorId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 12,
  "title": "Fight Club",
  "synopsis": "lorem ipsum",
  "trailerUrl": "https://www.google.com",
  "imgUrl": "https://www.google.com",
  "rating": 10,
  "genreId": 1,
  "authorId": 1,
  "updatedAt": "2023-02-14T01:07:23.232Z",
  "createdAt": "2023-02-14T01:07:23.232Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "Title should not be null",
    "Synopsis should not be null",
    "Movie.rating cannot be null"
  ]
}
```

&nbsp;

## 4. GET /movies/:id

Description:

- Get movie by id

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
  "id": 11,
  "title": "Fight Club",
  "synopsis": "lorem ipsum",
  "trailerUrl": "https://www.google.com",
  "imgUrl": "https://www.google.com",
  "rating": 10,
  "genreId": 1,
  "authorId": 1,
  "createdAt": "2023-02-14T00:44:34.686Z",
  "updatedAt": "2023-02-14T00:44:34.686Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

&nbsp;

## 5. DELETE /movies/:id

Description:

- Delete movie by id

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
  "message": "Fight Club success to delete"
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
