/////// estructura de los datos para que funcione
//// inicio_sesion es el usuario del que esta logeado
///// favoritos trae los usuario y y sus pokemones favoritos
let pokemonSeleccionado = 0
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
const user_2 = JSON.parse(localStorage.getItem("user"));

    inicio_sesion = user_2.userName || inicio_sesion
    let usuario_existe = false
    for(let index in favoritos){
        if(favoritos[index].usuario == inicio_sesion){
            usuario_existe = true
        }
        
    }

    fetch(`https://proyectofinalm3backend-production.up.railway.app/api/favorites/${user_2.id || user_2._id}`)
    .then(response => response.json())
    .then(data => {
    console.log("datos de pokemon")
    console.log(data[data.length - 1].pokemon.name)
    let pokemon_favorito = data[data.length - 1].pokemon.name
    if(usuario_existe == false){

    let objeto = {
        usuario: inicio_sesion,
        pokemenes_favoritos: [
        ]
    }
    for(let index in data){
        let nombrepokemon = data[index].pokemon.name || "nadaaqui"
        if(nombrepokemon == "nadaaqui"){

        }else{
        objeto.pokemenes_favoritos.push(nombrepokemon)
        }
    }
    favoritos.push(objeto)
    }
    let pokemones = [];
for (const index in favoritos) {
    if (inicio_sesion == favoritos[index].usuario) {
    pokemones = favoritos[index].pokemenes_favoritos;
    }
}
let root = document.getElementById("root");
for (let index in pokemones) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemones[index]}/`)
    .then((response) => response.json())
    .then((data) => {
        const url = data.sprites.front_default;
        const nombre = pokemones[index];

        let article = document.createElement("article");
        let imagen = document.createElement("img");
        let span = document.createElement("span");
        let button = document.createElement("button");

        imagen.setAttribute("id", "imagen");
        imagen.setAttribute("class", "imagen");
        imagen.setAttribute("src", url);
        imagen.setAttribute("alt", nombre);
        button.setAttribute("data-bs-toggle","modal")
        button.setAttribute("data-bs-target","#exampleModal")
        //data-bs-toggle="modal"
        //data-bs-target="#exampleModal"

        span.innerHTML = nombre;
        span.setAttribute("class","title2")
        button.setAttribute("class","btn-tertiary")

        button.setAttribute("id",nombre)
        button.innerHTML = `quitar a ${nombre} de favoritos`;

        let modal = document.getElementById("exampleModal")

        button.addEventListener("click",(e)=>{
        console.log(e.target.getAttribute("id"))
        fetch(`https://proyectofinalm3backend-production.up.railway.app/api/favorites/${user_2.id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let filtrado = data.filter((elemento)=>elemento.pokemon.name == e.target.getAttribute("id") )
            let id_a_eliminar = filtrado[0]._id
            pokemonSeleccionado = id_a_eliminar

            // fetch(`https://proyectofinalm3backend-production.up.railway.app/api/favorites/${id_a_eliminar}`, {
            //   method: "DELETE",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            // })
            //   .then((res) => res.json())
            //   .then((res) => {
            //     if (res.error) {
            //       //ERROR
            //     } else {
            //       console.log(res);
            //       location.reload()
            //     }
            //   })
        });
        })

        article.append(imagen);
        article.append(span);
        article.append(button);

        root.append(article);
    });
}
    });

let pokemones = [];
for (const index in favoritos) {
    if (inicio_sesion == favoritos[index].usuario) {
    pokemones = favoritos[index].pokemenes_favoritos;
    }
}
let root = document.getElementById("root");
for (let index in pokemones) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemones[index]}/`)
    .then((response) => response.json())
    .then((data) => {
        const url = data.sprites.front_default;
        const nombre = pokemones[index];

        let article = document.createElement("article");
        let imagen = document.createElement("img");
        let span = document.createElement("span");
        let button = document.createElement("button");

        imagen.setAttribute("id", "imagen");
        imagen.setAttribute("class", "imagen");
        imagen.setAttribute("src", url);
        imagen.setAttribute("alt", nombre);

        span.innerHTML = nombre;

        button.innerHTML = `quitar a ${nombre} de favoritos`;

        article.append(imagen);
        article.append(span);
        article.append(button);

        root.append(article);
    });
}
let btnBorrarPokemon = document.getElementById("btnBorrarPokemon")
btnBorrarPokemon.addEventListener("click",()=>{
    fetch(`https://proyectofinalm3backend-production.up.railway.app/api/favorites/${pokemonSeleccionado}`, {
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
                location.reload()
                }
            })
})