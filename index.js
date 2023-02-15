$(document).ready(() => {
  let access_token = localStorage.getItem("access_token");
  if (access_token) {
    isLoggedIn();
    fetchMovies();
  }
  $("#login-form").submit(handleLogin);
  $("#nav-logout").click(handleLogout);
});

const baseUrl = "http://localhost:3000";

function isLoggedIn() {
  $("#login-section").hide();
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
      console.log("Berhasil login");
      localStorage.setItem("access_token", response.access_token);
    })
    .fail((error) => {
      console.log("Gagal login");
      console.log(error.responseJSON);
    });
}

function handleLogout() {
  localStorage.removeItem("access_token");
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
      console.log("Berhasil get movies data");
      console.log(moviesData);
      $("#total-product").text(moviesData.length);
      moviesData.forEach((movies) => {
        $("#table-product").append(`
        <tr>
            <td>${movies.id}</td>
            <td>${movies.title}</td>
            <td>${movies.synopsis}</td>
            <td>${movies.trailerUrl}</td>
            <td>
                <img
                src="${movies.imgUrl}"
                class="img-fluid"
                />
            </td>
            <td>${movies.rating}</td>
            <td>${movies.Genre.name}</td>
            <td>${movies.Author.username}</td>
        </tr>
        `);
      });
    })
    .fail((error) => {
      console.log("Gagal login");
      console.log(error.responseJSON);
    });
}
