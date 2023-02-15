$(document).ready(() => {
  $("#login-form").submit(handleLogin);
});

const baseUrl = "http://localhost:3000";

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
    .done((data) => {
      console.log("Berhasil login");
      console.log(data);
    })
    .fail((error) => {
      console.log("Gagal login");
      console.log(error);
    });
}
