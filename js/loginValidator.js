// Obtenemos la ruta actual
const currentPath = window.location.pathname;
console.log(currentPath);
// Leemos el local storage para ver si hay un usuario logueado
const user = JSON.parse(localStorage.getItem("user"));
console.log("user");
// si currentPath contiene el nombre del archivo html, entonces es la ruta actual
// Si no hay usuario logueado y la ruta actual no es el login o el registro, redirigimos al login
if (!user && !currentPath.includes("/login.html") && !currentPath.includes("/registro.html") && !currentPath.includes("/index.html") && currentPath !== "/") {
  window.location.href = "./login.html";
} else if (user && (currentPath.includes("/login.html") || currentPath.includes("/registro.html") || currentPath.includes("/index.html") )) {
  // Si hay usuario logueado y la ruta actual es el login, redirigimos al home
  window.location.href = "./pokemon_favoritos.html";
}

const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "./login.html";
};

const currentUserName = user ? user.userName : "";