/*val registro*/
const nombre = document.getElementById("txtNombre");
const valnombre = document.getElementById("valNombre"); 

const usuario =document.getElementById("txtUsuario");
const valusuario = document.getElementById("valUsuario");

const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const valpass = document.getElementById("valPass");
const valpass2 = document.getElementById("valPass2");



function Validar(){
    let user = usuario.value;
    let expRegUser = new RegExp(/^[a-zA-Z0-9\_\-]{4,16}$/);
    valusuario.innerText ="uuu";

    let nom = nombre.value;
    let expRegNom = new RegExp("^[A-Za-z]*$");
    valnombre.innerText = "nnn";

    let pass = password.value;
    let expRegPass = new RegExp("^.{4,12}$");
    valpass.innerText = "p1p1"
    let pass2 = password2.value;
    let expRegPass2 = new RegExp("^.{4,12}$");
    valpass2.innerText = "p2p2"

    

    if(user == "" || !expRegUser.test(user)){
        valusuario.innerText = "El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guione bajo";
        
    } if(nom == "" || !expRegNom.test(nom)){
        valnombre.innerText = "Error; Nombre invalido";

    }if(correo == "" || !expRegCorreo.test(correo)){
        warnings.innerText ="Correo Incorrecto";
    }else{
        warnings.innerText ="Correcto";
        
    }if(pass == "" || !expRegPass.test(pass)){
        valpass.innerText = "Error; Contraseña invalido";
    } if(pass2 == "" || !expRegPass2.test(pass2)){
        valpass2.innerText = "Error Contraseña2 invalida";

    } if(pass == pass2){
        
    }else{
        valpass2.innerText = "Ambas Contraseñas deben ser iguales";
    
    }
}



btnConfirmar.onclick = () => Validar();