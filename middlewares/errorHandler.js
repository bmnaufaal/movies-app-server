function errorHandler(error, req, res, next) {
  let status = "";
  let message = "";

  switch (error.name) {
    case "JsonWebTokenError":
    case "InvalidAccessToken":
      status = 401;
      message = "Invalid token";
      break;
    case "Unauthenticated":
      status = 401;
      message = "Unauthenticated";
      break;
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400;
      error = error.errors.map((element) => {
        return element.message;
      });
      message = error;
      break;
    case "InvalidEmail":
      status = 400;
      message = "Email is required";
      break;
    case "InvalidPassword":
      status = 400;
      message = "Password is required";
      break;
    case "Forbidden":
      status = 403;
      message = "Not authorized";
      break;
    case "InvalidCredentials":
      status = 401;
      message = "Invalid email/password";
      break;
    case "CustomerNotFound":
      status = 404;
      message = "Customer not found";
      break;
    case "MovieNotFound":
      status = 404;
      message = "Movie not found";
      break;
    case "GenreNotFound":
      status = 404;
      message = "Genre not found";
      break;
    default:
      status = 500;
      message = "Internal server error";
      break;
  }

  console.log(error);
  res.status(status).json({
    message: message,
  });
}

module.exports = errorHandler;
