const boton = document.getElementById("btnAgregar");
var alertModal = new bootstrap.Modal(document.getElementById('alertModal'), {
keyboard: false
})

let selectedOption;
/////// estructura de los datos para que funcione
//// inicio_sesion es el usuario del que esta logeado
///// favoritos trae los usuario y y sus pokemones favoritos
inicio_sesion = "javier";
let favoritos = [
{
    usuario: "javier",
    pokemenes_favoritos: ["squirtle", "venonat", "shellder", "dragonite"],
},
{
    usuario: "enrique",
    pokemenes_favoritos: ["tauros", "ditto", "bulbasaur", "pikachu"],
},
{
    usuario: "carlos",
    pokemenes_favoritos: [],
},
];
///////////////////////
let user_2 = JSON.parse(localStorage.getItem("user"));
console.log("user_2");
console.log(user_2);

inicio_sesion = user_2.userName || inicio_sesion;
let usuario_existe = false;
for (let index in favoritos) {
if (favoritos[index].usuario == inicio_sesion) {
    usuario_existe = true;
}
}
if (usuario_existe == false) {
let objeto = {
    usuario: inicio_sesion,
    pokemenes_favoritos: ["asd"],
};
favoritos.push(objeto);
}

let pokemones_favoritos = [];
for (const index in favoritos) {
if (inicio_sesion == favoritos[index].usuario) {
    pokemones_favoritos = favoritos[index].pokemenes_favoritos;
}
}

fetch(`https://proyectofinalm3backend-production.up.railway.app/api/favorites/${user_2.id}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        if(data.length == 0){
            
        }else{
            data.map(function(elemento){
               console.log(elemento.pokemon.name) 
               pokemones_favoritos.push(elemento.pokemon.name)
            })
        }
});
let imagen = document.getElementById("imagen");

let select = document.getElementById("select_lista_pokemones");
fetch("https://pokeapi.co/api/v2/generation/1/")
.then((response) => response.json())
.then((data) => {
    let pokemons = data.pokemon_species;
    pokemons = pokemons.sort(function (a,b){
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }
    // a must be equal to b
    return 0;
    })
    for (const index in pokemons) {
    let option = document.createElement("option");
    option.setAttribute("value", pokemons[index].name);
    option.setAttribute("class","title2 text-start text-light")
    option.innerHTML = pokemons[index].name;
    select.append(option);
    }
});
const agregarPokemones = async (body) => {
fetch(
    "https://proyectofinalm3backend-production.up.railway.app/api/favorites",
    {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
        "Content-Type": "application/json",
    },
    }
)
    .then((res) => res.json())
    .then((res) => {
    if (res.error) {
    } else {
        // console.log(res.message);
        if (res.message) {
        alertModal.show();
        } else {
        let mensaje_favorito_2 = document.getElementById("favoritos");
        let boton2_2 = document.getElementById("esconder");
        let imagen_2 = document.getElementById("imagen");

        imagen_2.classList.add("favorito");

        boton2_2.style.display = "none";
        mensaje_favorito_2.style.display = "block";
        }
    }
    })
    .catch((e) => {
    console.log("estas agregando mas");
    });
};

boton.addEventListener("click", () => {
let objeto = {
    userId: user_2._id || user_2.id,
    pokemon: {
    id: 2,
    name: selectedOption.value,
    url: `https://pokeapi.co/api/v2/pokemon/${selectedOption.value}/`,
    },
};
agregarPokemones(objeto);
// ocltar el modal de bootstrap
});
select.addEventListener("change", function () {
selectedOption = this.options[select.selectedIndex];

fetch(`https://pokeapi.co/api/v2/pokemon/${selectedOption.value}/`)
    .then((response) => response.json())
    .then((data) => {
    // const url = data.sprites.front_default;
    const url = data.sprites.other.home.front_default
    console.log(data.sprites.other.home.front_default)
    for (let index in pokemones_favoritos) {
        let boton2 = document.getElementById("esconder");
        let mensaje_favorito = document.getElementById("favoritos");
        if (pokemones_favoritos[index] == selectedOption.value) {
        imagen.classList.add("favorito");

        boton2.style.display = "none";
        mensaje_favorito.style.display = "block";
        break;
        } else {
        imagen.classList.remove("favorito");
        boton2.style.display = "block";
        mensaje_favorito.style.display = "none";
        }
    }
    imagen.setAttribute("src", url);
    imagen.setAttribute("alt", selectedOption.value);
    let span = document.getElementById("span");
    span.innerText = selectedOption.value;
    });
});