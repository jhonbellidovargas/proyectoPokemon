// Obtenemos la ruta actual
const currentPath = window.location.pathname;
console.log(currentPath);
// Leemos el local storage para ver si hay un usuario logueado
const user = JSON.parse(localStorage.getItem("user"));
console.log("user");
// Si no hay usuario logueado y la ruta actual no es el login o el registro, redirigimos al login
if (!user && currentPath !== "/login.html" && currentPath !== "/registro.html" && currentPath !== "/index.html" && currentPath !== "/") {
  window.location.href = "./login.html";
} else if (user && (currentPath === "/login.html" || currentPath === "/registro.html" || currentPath === "/index.html")) {
  // Si hay usuario logueado y la ruta actual es el login, redirigimos al home
  window.location.href = "./pokemon_favoritos.html";
}

const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "./login.html";
};

const currentUserName = user ? user.userName : "";