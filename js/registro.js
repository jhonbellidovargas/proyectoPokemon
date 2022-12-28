const nombre = document.getElementById("name");
const email = document.getElementById("email");
const userName = document.getElementById("user");
const contrasenia = document.getElementById("contrasenia");
const confirm_contrasenia = document.getElementById("confirm_contrasenia");
const warnings = document.getElementById("warnings");
const btnRegistrar = document.getElementById("btnRegistrar");

const API = "https://proyectofinalm3backend-production.up.railway.app";
const btnLogin = document.getElementById("btnLogin");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMessage = document.getElementById("error__message");

const regexUser = /^[a-zA-Z0-9]+$/;

const endPoints = {
  users: {
    create: `${API}/api/users`,
  },
};

function validarRegistro() {
  warnings.innerText = "";
  let nom = nombre.value;
  //Expresion regular para no sea vacio y solo letras
  let expRegName = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°\s]{1,40}$/;

  listaErrores = [];
  if (nom == "" || !expRegName.test(nom)) {
    listaErrores.push("Nombre debe ser solo letras");
  }

  let correo = email.value;
  let expRegCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;

  if (correo == "" || !expRegCorreo.test(correo)) {
    listaErrores.push("Correo invalido");
  }

  let usuario = userName.value;
  let expRegUser = /^[a-zA-Z0-9_-]{4,16}$/;

  if (usuario == "" || !expRegUser.test(usuario)) {
    listaErrores.push("Usuario debe ser entre 4 y 16 caracteres");
  }

  let pass1 = contrasenia.value;
  let pass2 = confirm_contrasenia.value;

  if (pass1 !== pass2) {
    listaErrores.push("Las contraseñas no coinciden");
  } else {
    let expRegPass = /^.{6,20}$/;
    if (pass1 == "" || !expRegPass.test(pass1)) {
      listaErrores.push("Contraseña debe ser entre 6 y 20 caracteres");
    }
  }
  //warnings.innerText = listaErrores.join(",");
  errorMessage.innerText = listaErrores.join(",");
  errorMessage.style.display = "block";
  if (listaErrores.length == 0) {
    registrarUsuario({
        name: nom,
        email: correo,
        userName: usuario,
        password: pass1,
    })
  }
}

const registrarUsuario = async (body) => {
  fetch(endPoints.users.create, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        //warnings.innerText = res.error;
        errorMessage.innerText = res.error;
        errorMessage.style.display = "block";
      } else {
        errorMessage.innerText = "Usuario registrado con exito";
        errorMessage.style.display = "block";
        errorMessage.style.color = "green";
        localStorage.setItem("user", JSON.stringify(res));
        setTimeout(() => {
          window.location.href = "../pokemon_list.html";
        }, 1000);
      }
    })
    .catch((e) => {
        //warnings.innerText = e;
        errorMessage.innerText = e;
        errorMessage.style.display = "block";
    });
};

btnRegistrar.onclick = () => validarRegistro();
