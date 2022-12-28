const nickname = document.getElementById("nickname");
const nombre = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("contrasenia");
const password2 = document.getElementById("confirm_contrasenia");
const warnings = document.getElementById("warnings");
// const eliminarUsuario = document.getElementById("eliminarUsuario");
const currentUser = JSON.parse(localStorage.getItem("user"));
console.log("currentUser");
console.log(currentUser);

const API = "https://proyectofinalm3backend-production.up.railway.app";
const endPoints = {
  users: {
    get: `${API}/api/users/${currentUser.id}`,
    update: `${API}/api/users/${currentUser.id}`,
    delete: `${API}/api/users/${currentUser.id}`,
  },
};

const getUsuario = async () => {
  fetch(endPoints.users.get, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      nickname.value = res.userName;
      nombre.value = res.name;
      email.value = res.email;
      password.value = res.email;
      confirm_contrasenia.value = res.email;
    })
    .catch((e) => {
      console.log(e);
    });
};

getUsuario();

const updateUsuario = async (body) => {
  fetch(endPoints.users.update, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.error) {
        warnings.innerText = res.error;
      } else {
        console.log(res);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: currentUser.id,
            email: body.email,
            name: body.name,
            userName: body.userName,
          })
        );
        setTimeout(() => {
          window.location.href = "profile.html";
        }, 1000);
      }
    })
    .catch((e) => {
      warnings.innerText = e;
    });
};

function activarCampos() {
  nickname.disabled = false;
  nombre.disabled = false;
  email.disabled = false;
  password.disabled = false;
  password2.disabled = false;
}

function validarCampos() {
  const listaErrores = [];
  let nom = nombre.value;
  let expRegNom = /^[a-zA-Z ]{2,30}$/;
  if (nom == "" || !expRegNom.test(nom)) {
    listaErrores.push("Nombre invalido");
  }

  let correo = email.value;
  let expRegCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;

  if (correo == "" || !expRegCorreo.test(correo)) {
    listaErrores.push("Correo invalido");
  }

  let usuario = nickname.value;
  let expRegUser = /^[a-zA-Z0-9_-]{4,16}$/;

  if (usuario == "" || !expRegUser.test(usuario)) {
    listaErrores.push("Usuario debe ser entre 4 y 16 caracteres");
  }

  let pass1 = password.value;
  let pass2 = password2.value;

  if (pass1 !== pass2) {
    listaErrores.push("Las contraseñas no coinciden");
  } else if (pass1 == currentUser.email) {
    pass1 = currentUser.email;
  } else {
    let expRegPass = /^.{6,20}$/;
    if (pass1 == "" || !expRegPass.test(pass1)) {
      listaErrores.push("Contraseña debe ser entre 6 y 20 caracteres");
    }
  }
  let body = {
    name: nom,
    email: correo,
    userName: usuario,
  };
  if (pass1 != currentUser.email) {
    body.password = pass1;
  }
  warnings.innerText = listaErrores.join(",");
  if (listaErrores.length == 0) {
    updateUsuario(body);
  }
}

const eliminarUsuario = document.getElementById("eliminarUsuario");

eliminarUsuario.addEventListener("click", () => {
  console.log("eliminando usuario");
  fetch(endPoints.users.delete, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("res");
      console.log(res);
      localStorage.removeItem("user");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    })
    .catch((e) => {
      console.log(e);
    });
});

function updateUser() {
  validarCampos();
let nombredeUsuario = document.getElementById("nickname")
let nombre_completo = document.getElementById("name")
let email_completo = document.getElementById("email")

let user_2 = JSON.parse(localStorage.getItem("user"));
console.log("user_2");
console.log(user_2);
let userName = user_2.userName
let nombre_usuario = user_2.name
let email_de_usuario = user_2.email
let id_del_usuario = user_2.id

nombredeUsuario.value = userName
nombre_completo.value = nombre_usuario
email_completo.value = email_de_usuario

function activarCampos(){
    document.getElementById('name').disabled = false;
    document.getElementById('contrasenia').disabled = false;
    document.getElementById('confirm_contrasenia').disabled = false;
    document.getElementById('email').disabled = false;
    
}
document.getElementById("borrarCuenta").addEventListener("click",borrarCuentas)

function borrarCuentas(e){
    var evento = window.event || e
    evento.preventDefault()
}

document.getElementById("btnEliminarCuentasi").addEventListener("click",()=>{
    alert("se borro ")
    //borra aqui fetch
    fetch(`https://proyectofinalm3backend-production.up.railway.app/api/users/${id_del_usuario}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((res) => {
    if (res.error) {
        //ERROR
    } else {
        console.log(res);
        localStorage.setItem('user', '');
        window.location.href = "./login.html";
    }
    })
})

let modal = document.getElementById("btnActualizarCuenta")
modal.addEventListener("click",()=>{
    let nombredeUsuario = document.getElementById("nickname")
    let nombre_completo = document.getElementById("name")
    let email_completo = document.getElementById("email")
    let contrasenia = document.getElementById("contrasenia")
    let confirm_contrasenia = document.getElementById("confirm_contrasenia")
    if(confirm_contrasenia.value != "" ){
        if(confirm_contrasenia.value == contrasenia.value){
            alert("se actualizo")
            let objeto ={
                name: nombre_completo.value,
                lastName: nombre_completo.value,
                email: email_completo.value,
                userName: nombredeUsuario.value,
                password: contrasenia.value
            }
            //actualiza aqui fetch
            fetch(`https://proyectofinalm3backend-production.up.railway.app/api/users/${id_del_usuario}`, {
                method: "PUT",
                body: JSON.stringify(objeto),
                headers: {
                "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((res) => {
            if (res.error) {
                //ERROR
            } else {
                console.log(res);
                window.location.href = "./pokemon_favoritos.html";
            }
            })
        }
    }
})

