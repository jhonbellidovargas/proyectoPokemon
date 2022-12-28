let nombredeUsuario = document.getElementById("nickname")
let nombre_completo = document.getElementById("name")
let email_completo = document.getElementById("email")

let user_2 = JSON.parse(localStorage.getItem("user"));
console.log("user_2");
console.log(user_2);
let userName = user_2.userName
let nombre_usuario = user_2.name
let email_de_usuario = user_2.email

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
})

let modal = document.getElementById("btnActualizarCuenta")
modal.addEventListener("click",()=>{
    alert("se actualizo")
    //actualiza aqui fetch
})

