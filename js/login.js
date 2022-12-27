const API = "https://proyectofinalm3backend-production.up.railway.app";
const btnLogin = document.getElementById("btnLogin");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMessage = document.getElementById("error__message");

const regexUser = /^[a-zA-Z0-9]+$/;

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
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Login exitoso";
        errorMessage.style.color = "green";
        localStorage.setItem("user", JSON.stringify(res));
        setTimeout(() => {
          window.location.href = "../pokemon_list.html";
        }, 1000);
      }
    })
    .catch(() => {
      errorMessage.innerHTML = "Usuario o contraseña incorrectos";
      errorMessage.style.display = "block";
    });
};

btnLogin.addEventListener("click", () => {
  if (!regexUser.test(username.value)) {
    errorMessage.innerHTML = "El usuario no puede contener caracteres especiales o ser vacío";
    errorMessage.style.display = "block";
    return;
  }
  if (password.value.length < 6) {
    errorMessage.innerHTML = "La contraseña debe tener al menos 6 caracteres";
    errorMessage.style.display = "block";
    return;
  }
  login({
    userName: username.value,
    password: password.value,
  });
});
