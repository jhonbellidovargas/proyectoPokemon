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

