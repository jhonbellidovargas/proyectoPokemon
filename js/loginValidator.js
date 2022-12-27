// Obtenemos la ruta actual
const currentPath = window.location.pathname;
console.log("currentPath");
// Leemos el local storage para ver si hay un usuario logueado
const user = JSON.parse(localStorage.getItem("user"));
console.log("user");
// Si no hay usuario logueado y la ruta actual no es el login, redirigimos al login
if (!user && currentPath !== "/login.html") {
  window.location.href = "./login.html";
} else if (user && currentPath === "/login.html") {
  // Si hay usuario logueado y la ruta actual es el login, redirigimos al home
  window.location.href = "./index.html";
}