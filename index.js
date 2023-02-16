$(document).ready(() => {
  $("#login-form").submit(handleLogin);
  $("#register-form").submit(handleRegister);
  $("#product-form").submit(handleAddNewMovie);
  $("#nav-dashboard").click(showMoviesPage);
  $("#nav-movie").click(showMoviesPage);
  $("#nav-genre").click(showGenresPage);
  $("#new-product").click(showAddMoviePage);
  $("#new-category").click(showAddGenrePage);
  $("#nav-logout").click(handleLogout);

  let access_token = localStorage.getItem("access_token");
  if (access_token) {
    isLoggedIn();
  } else {
    isNotLoggedIn();
  }
});

const baseUrl = "http://localhost:3000";

function customToastify(message) {
  Toastify({
    text: message,
    duration: 3000,
    stopOnFocus: true,
    style: {
      background: "black",
    },
  }).showToast();
}

function isLoggedIn() {
  $("#login-section").hide();
  fetchMovies();
  fetchGenres();
  showMoviesPage();
}

function showMoviesPage(e) {
  fetchMovies();
  $("#home-section").show();
  $("#dashboard-section").show();
  $("#movie-card").show();
  $("#genre-card").hide();
  $("#product-section").show();
  $("#category-section").hide();
  $("#new-product-section").hide();
  $("#new-category-section").hide();
}

function showAddMoviePage() {
  $("#home-section").show();
  $("#dashboard-section").show();
  $("#movie-card").hide();
  $("#genre-card").hide();
  $("#product-section").hide();
  $("#category-section").hide();
  $("#new-product-section").show();
  $("#new-category-section").hide();
}

function showGenresPage() {
  fetchGenres();
  $("#home-section").show();
  $("#dashboard-section").show();
  $("#movie-card").hide();
  $("#genre-card").show();
  $("#product-section").hide();
  $("#category-section").show();
  $("#new-product-section").hide();
  $("#new-category-section").hide();
}

function showAddGenrePage() {
  $("#home-section").show();
  $("#dashboard-section").show();
  $("#movie-card").hide();
  $("#genre-card").hide();
  $("#product-section").hide();
  $("#category-section").hide();
  $("#new-product-section").hide();
  $("#new-category-section").show();
}

function isNotLoggedIn() {
  $("#home-section").hide();
  $("#dashboard-section").hide();
  $("#product-section").hide();
  $("#new-product-section").hide();
  $("#category-section").hide();
  $("#new-category-section").hide();
}

function handleLogin(e) {
  e.preventDefault();
  let email = $("#login-email").val();
  let password = $("#login-password").val();
  $.ajax({
    url: baseUrl + "/login",
    method: "POST",
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      customToastify("Success Login");
      localStorage.setItem("access_token", response.access_token);
      isLoggedIn();
    })
    .fail((error) => {
      customToastify(error.responseJSON.message);
      console.log(error.responseJSON);
    });
}

function handleLogout() {
  customToastify("Logout Success");
  localStorage.removeItem("access_token");
}

function handleRegister(e) {
  e.preventDefault();
  let username = $("#register-username").val();
  let email = $("#register-email").val();
  let password = $("#register-password").val();
  let phoneNumber = $("#register-phone").val();
  let address = $("#register-address").val();
  $.ajax({
    url: baseUrl + "/register",
    method: "POST",
    data: {
      username,
      email,
      password,
      phoneNumber,
      address,
    },
  })
    .done((response) => {
      customToastify("Register Success");
    })
    .fail((error) => {
      customToastify("Register Success");
      console.log(error.responseJSON);
    });
}

function fetchMovies() {
  $.ajax({
    url: baseUrl + "/movies",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((moviesData) => {
      customToastify("Get Movies Data Success");
      console.log(moviesData);
      $("#total-product").text(moviesData.length);
      $("#table-product").empty();
      moviesData.forEach((movies) => {
        $("#table-product").append(`
        <tr>
            <td>${movies.id}</td>
            <td>${movies.title}</td>
            <td>${movies.synopsis}</td>
            <td><a href="${movies.trailerUrl}">${movies.trailerUrl}</a></td>
            <td>
                <img
                src="${movies.imgUrl}"
                class="img-fluid"
                />
            </td>
            <td>${movies.rating}</td>
            <td>${movies.Genre.name}</td>
            <td>${movies.Author.username}</td>
            <td>
              <a href="/" class="ms-3"><span class="icon material-symbols-outlined text-danger">delete</span></a>
            </td>
        </tr>
        `);
      });
    })
    .fail((error) => {
      customToastify("Get Movies Data Failed");
      console.log(error.responseJSON);
    });
}

function fetchGenres() {
  $.ajax({
    url: baseUrl + "/genres",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((genresData) => {
      customToastify("Get Genre Data Success");
      console.log(genresData);
      $("#total-category").text(genresData.length);
      $("#table-category").empty();
      genresData.forEach((genres) => {
        $("#movie-genreId").append(`
          <option value="${genres.id}">${genres.name}</option>
        `);
        $("#table-category").append(`
          <tr>
              <td>${genres.id}</td>
              <td>${genres.name}</td>
              <td>
                <a href="" class="ms-3"><span class="icon material-symbols-outlined text-danger">delete</span></a>
              </td>
          </tr>
        `);
      });
    })
    .fail((error) => {
      customToastify("Get Genre Data Failed");
      console.log(error.responseJSON);
    });
}

function handleAddNewMovie(e) {
  e.preventDefault();
  let title = $("#movie-title").val();
  let synopsis = $("#movie-synopsis").val();
  let trailerUrl = $("#movie-trailerUrl").val();
  let imgUrl = $("#movie-imgUrl").val();
  let rating = $("#movie-rating").val();
  let genreId = $("#movie-genreId").val();
  $.ajax({
    url: baseUrl + "/movies/add",
    method: "POST",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
    data: {
      title,
      synopsis,
      trailerUrl,
      imgUrl,
      rating,
      genreId,
    },
  })
    .done((response) => {
      customToastify("Add Movies Data Success");
      showMoviesPage();
    })
    .fail((error) => {
      customToastify("Add Movies Data Failed");
      console.log(error.responseJSON);
    });
}
