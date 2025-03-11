
function mostrarVentana() {
    let ventana = document.getElementById("ventanaEmergente");
    let fondo = document.getElementById("fondoOscuro");

    ventana.style.display = "block";
    fondo.style.display = "block";

    setTimeout(() => {
        ventana.style.opacity = "1";
        ventana.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);
}

function cerrarVentana() {
    let ventana = document.getElementById("ventanaEmergente");
    let fondo = document.getElementById("fondoOscuro");

    ventana.style.opacity = "0";
    ventana.style.transform = "translate(-50%, -50%) scale(0.8)";

    setTimeout(() => {
        ventana.style.display = "none";
        fondo.style.display = "none";
    }, 300);
}
