function mostrarRetiros() {
    let telefono = localStorage.getItem("telefono");
    if (!telefono) {
        alert("No se encontró un teléfono válido. Inicia sesión.");
        window.location.href = "index.html";
        return;
    }

    let retirosRealizados = JSON.parse(localStorage.getItem("retirosRealizados_" + telefono)) || [];

    // Filtrar y eliminar retiros sin número de seguimiento
    let retirosValidos = retirosRealizados.filter(retiro => retiro.numeroSeguimiento);
    if (retirosValidos.length !== retirosRealizados.length) {
        localStorage.setItem("retirosRealizados_" + telefono, JSON.stringify(retirosValidos));
    }

    let listaRetiros = document.getElementById("retirosList");
    listaRetiros.innerHTML = ''; 

    if (retirosValidos.length === 0) {
        listaRetiros.innerHTML = "<p>No tienes retiros con número de seguimiento.</p>";
    } else {
        retirosValidos.forEach(function(retiro, index) {
            let item = document.createElement("div");
            item.classList.add("retiro-item");

            let info = document.createElement("div");
            info.classList.add("info");
            info.innerHTML = `Monto: Mex$${retiro.monto.toFixed(2)}<br>Fecha: ${retiro.fecha}<br><strong>Número de seguimiento:</strong> ${retiro.numeroSeguimiento}`;

            let estado = document.createElement("div");
            estado.classList.add("estado");

            function actualizarEstadoVisual() {
                switch (retiro.estado) {
                    case "Confirmado":
                        estado.style.backgroundColor = "#28a745"; 
                        estado.innerText = "✔ Confirmado";
                        break;
                    case "En proceso":
                        estado.style.backgroundColor = "#6c757d"; 
                        estado.innerText = "⏳ En proceso";
                        break;
                    case "Rechazado":
                        estado.style.backgroundColor = "#dc3545"; 
                        estado.innerText = "✖ Rechazado";
                        break;
                }
            }

            actualizarEstadoVisual();

            estado.onclick = function() {
                if (retiro.estado === "En proceso") {
                    retiro.estado = "Confirmado"; 
                } else if (retiro.estado === "Confirmado") {
                    retiro.estado = "Rechazado"; 
                } else if (retiro.estado === "Rechazado") {
                    retiro.estado = "Confirmado"; 
                }

                actualizarEstadoVisual();

                // Guardar cambios en localStorage
                let updatedRetiros = JSON.parse(localStorage.getItem("retirosRealizados_" + telefono)) || [];
                updatedRetiros.forEach(function(existingRetiro, i) {
                    if (existingRetiro.numeroSeguimiento === retiro.numeroSeguimiento) {
                        updatedRetiros[i] = retiro;
                    }
                });
                localStorage.setItem("retirosRealizados_" + telefono, JSON.stringify(updatedRetiros));
            };

            // Botón para eliminar retiro
            let btnEliminar = document.createElement("button");
            btnEliminar.innerText = "Eliminar";
            btnEliminar.style.backgroundColor = "#ff4d4d";
            btnEliminar.style.color = "white";
            btnEliminar.style.border = "none";
            btnEliminar.style.padding = "5px 10px";
            btnEliminar.style.marginLeft = "10px";
            btnEliminar.style.cursor = "pointer";
            btnEliminar.onclick = function() {
                if (confirm("¿Seguro que deseas eliminar este retiro? Esta acción no se puede deshacer.")) {
                    let updatedRetiros = retirosValidos.filter(r => r.numeroSeguimiento !== retiro.numeroSeguimiento);
                    localStorage.setItem("retirosRealizados_" + telefono, JSON.stringify(updatedRetiros));
                    mostrarRetiros(); // Volver a cargar la lista sin el retiro eliminado
                }
            };

            item.appendChild(info);
            item.appendChild(estado);
            item.appendChild(btnEliminar);

            listaRetiros.appendChild(item);
        });
    }

    listaRetiros.classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", mostrarRetiros);
