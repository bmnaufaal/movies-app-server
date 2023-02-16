# Movie API Documentation

## Endpoints :

List of available endpoints:

- `GET /movies`
- `POST /modes/add`
- `GET /movies/:id`
- `DELETE /movies/:id`
- `GET /genres`
- `POST /genres/add`
- `POST /register`
- `POST /login`

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
            "name": "Drama"
        },
        "Author": {
            "id": 5,
            "username": "mslavin4",
            "email": "bscading4@omniture.com",
            "role": "admin"
        }
    },
    ...,
]
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
  "genreId": "integer",
  "authorId": "integer"
}
```

_Response (201 - Created)_

```json
{
    "id": 8,
    "title": "Fight Club",
    "synopsis": "A depressed man (Edward Norton) suffering from insomnia meets a strange soap salesman named Tyler Durden (Brad Pitt) and soon finds himself living in his squalid house after his perfect apartment is destroyed. The two bored men form an underground club with strict rules and fight other men who are fed up with their mundane lives. Their perfect partnership frays when Marla (Helena Bonham Carter), a fellow support group crasher, attracts Tyler's attention.",
    "trailerUrl": "https://www.youtube.com/watch?v=qtRKdVHc-cE&ab_channel=RottenTomatoesClassicTrailers",
    "imgUrl": "https://resizing.flixster.com/0kbkzWG-fGf5yEZSmLw4VB_SpnQ=/206x305/v2/https://flxt.tmsimg.com/assets/p23069_p_v8_aa.jpg",
    "rating": 10,
    "genreId": 1,
    "authorId": 7,
    "updatedAt": "2023-02-15T04:33:59.370Z",
    "createdAt": "2023-02-15T04:33:59.370Z"
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

## 4. DELETE /movies/:id

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

&nbsp;

## 5. GET /genres

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

&nbsp;

## 6. POST /genres/add

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
    "message": [
        "Genre name should not be null"
    ]
}
```

&nbsp;

## 7. POST /register

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

## 8. POST /login

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


## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```