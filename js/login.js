const API = "https://proyectofinalm3backend-production.up.railway.app";
const btnLogin = document.getElementById("btnLogin");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMessage = document.getElementById("error__message");

const endPoints = {
  auth: {
    login: `${API}/api/login`,
  },
};

const login = async (body) => {
  fetch(endPoints.auth.login, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        errorMessage.innerHTML = res.error;
        errorMessage.style.display = "block";
      } else {
        console.log(res);
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Login exitoso";
        errorMessage.style.color = "green";
      }
    })
    .catch((err) => {
      errorMessage.innerHTML = "Usuario o contraseña incorrectos";
      errorMessage.style.display = "block";
    });
};

btnLogin.addEventListener("click", () => {
  login({
    userName: username.value,
    password: password.value,
  });
});
