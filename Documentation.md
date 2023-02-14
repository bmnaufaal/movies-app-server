# Movie API Documentation

## Endpoints :

List of available endpoints:

- `GET /movies`
- `GET /moviesDetail`
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
        "id": 1,
        "title": "Deliver Us From Evil",
        "synopsis": "Crime|Drama",
        "trailerUrl": "http://dummyimage.com/178x100.png/dddddd/000000",
        "imgUrl": "http://dummyimage.com/103x100.png/5fa2dd/ffffff",
        "rating": 4,
        "genreId": 3,
        "authorId": 4,
        "createdAt": "2023-02-13T12:57:43.267Z",
        "updatedAt": "2023-02-13T12:57:43.267Z"
    },
    {
        "id": 2,
        "title": "Attila",
        "synopsis": "Action|Horror|Thriller",
        "trailerUrl": "http://dummyimage.com/234x100.png/ff4444/ffffff",
        "imgUrl": "http://dummyimage.com/207x100.png/5fa2dd/ffffff",
        "rating": 3,
        "genreId": 2,
        "authorId": 2,
        "createdAt": "2023-02-13T12:57:43.267Z",
        "updatedAt": "2023-02-13T12:57:43.267Z"
    }
    ...,
]
```

&nbsp;

## 2. GET /moviesDetail

Description:
- Get all movie detail from database

Request:

_Response (200 - OK)_

```json
[
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
        "updatedAt": "2023-02-14T00:44:34.686Z",
        "Genre": {
            "id": 1,
            "name": "Comedy",
            "createdAt": "2023-02-13T12:57:43.261Z",
            "updatedAt": "2023-02-13T12:57:43.261Z"
        },
        "Author": {
            "id": 1,
            "name": "Sammy Harriman",
            "dateOfBirth": "2013-06-25T00:00:00.000Z",
            "email": "sharriman0@economist.com",
            "createdAt": "2023-02-13T12:57:43.265Z",
            "updatedAt": "2023-02-13T12:57:43.265Z"
        }
    },
    {
        "id": 3,
        "title": "Quo Vadis, Baby?",
        "synopsis": "Drama|Thriller",
        "trailerUrl": "http://dummyimage.com/170x100.png/5fa2dd/ffffff",
        "imgUrl": "http://dummyimage.com/205x100.png/cc0000/ffffff",
        "rating": 1,
        "genreId": 2,
        "authorId": 5,
        "createdAt": "2023-02-13T12:57:43.267Z",
        "updatedAt": "2023-02-13T12:57:43.267Z",
        "Genre": {
            "id": 2,
            "name": "Drama",
            "createdAt": "2023-02-13T12:57:43.261Z",
            "updatedAt": "2023-02-13T12:57:43.261Z"
        },
        "Author": {
            "id": 5,
            "name": "Farah Mayhow",
            "dateOfBirth": "2022-02-13T00:00:00.000Z",
            "email": "fmayhow4@w3.org",
            "createdAt": "2023-02-13T12:57:43.265Z",
            "updatedAt": "2023-02-13T12:57:43.265Z"
        }
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
