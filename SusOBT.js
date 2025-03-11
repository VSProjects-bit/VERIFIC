function obtenerSuscripcion() {
    return localStorage.getItem("nivelSuscripcion") || "1"; 
}
function actualizarSuscripcion() {
    let nivelSuscripcion = obtenerSuscripcion(); 
    let suscripcionDiv = document.getElementById("suscripcion");
    let tipoSuscripcion = document.getElementById("tipoSuscripcion");
    suscripcionDiv.classList.remove("estandar", "premium", "gold");
    if (nivelSuscripcion === "1") {
        suscripcionDiv.classList.add("estandar");
        tipoSuscripcion.textContent = "Estandar";
    } else if (nivelSuscripcion === "2") {
        suscripcionDiv.classList.add("premium");
        tipoSuscripcion.textContent = "Premium";
    } else if (nivelSuscripcion === "3") {
        suscripcionDiv.classList.add("gold");
        tipoSuscripcion.textContent = "Gold";
    }
}
document.addEventListener("DOMContentLoaded", function() {
    actualizarSuscripcion();
    console.log("Suscripción actualizada");
});
function activarSuscripcion(nivel) {
    localStorage.setItem("nivelSuscripcion", nivel);
    actualizarSuscripcion();
}
