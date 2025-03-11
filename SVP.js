 document.addEventListener("DOMContentLoaded", function () {
        const telefono = localStorage.getItem("telefono");
        if (!telefono) {
            console.log("No se ha definido un teléfono para el usuario.");
            return;
        }
    
        let contadorTareas = parseInt(localStorage.getItem("contadorTareas_" + telefono) || "0");
        let vipActivo = localStorage.getItem("vipActivo_" + telefono) || "No activa";
        const contadorTareasElement = document.getElementById("contadorTareas");
        const tipoSuscripcionElement = document.getElementById("tipoSuscripcion");
    
        function actualizarContadorTareas() {
            contadorTareas = parseInt(localStorage.getItem("contadorTareas_" + telefono) || "0");
            document.getElementById("contadorTareas").textContent = contadorTareas;
            localStorage.setItem("contadorTareas_" + telefono, contadorTareas);
    
            if (contadorTareas <= 0) {
                localStorage.setItem("vipActivo_" + telefono, "No activa");
                tipoSuscripcionElement.innerText = "No activa";
                asignarClaseAnimacion("No activa");
                document.getElementById("mensajeNoTareas").classList.add("mostrar");
            } else {
                document.getElementById("mensajeNoTareas").classList.remove("mostrar");
            }
        }
    
        function obtenerNombreSuscripcion(vip) {
            switch (vip) {
                case "VIP 1": return "Estandar";
                case "VIP 2": return "Premium";
                case "VIP 3": return "Gold";
                default: return "No activa";
            }
        }
    
        function asignarClaseAnimacion(vip) {
            const suscripcionContainer = document.getElementById("suscripcion");
            suscripcionContainer.classList.remove("estandar", "premium", "gold", "no-activa");
    
            if (vip === "VIP 1") {
                suscripcionContainer.classList.add("estandar");
            } else if (vip === "VIP 2") {
                suscripcionContainer.classList.add("premium");
            } else if (vip === "VIP 3") {
                suscripcionContainer.classList.add("gold");
            } else {
                suscripcionContainer.classList.add("no-activa");
            }
        }
    
        tipoSuscripcionElement.innerText = obtenerNombreSuscripcion(vipActivo);
        asignarClaseAnimacion(vipActivo);
    
        // ✅ ASIGNAR TAREAS SOLO SI EL CONTADOR ESTÁ VACÍO (no sobreescribir si ya hay tareas)
        if (vipActivo !== "No activa" && contadorTareas <= 0) {
            switch (vipActivo) {
                case "VIP 1":
                    contadorTareas = 12;
                    break;
                case "VIP 2":
                    contadorTareas = 22;
                    break;
                case "VIP 3":
                    contadorTareas = 32;
                    break;
            }
            localStorage.setItem("contadorTareas_" + telefono, contadorTareas);
        }
    
        actualizarContadorTareas();
    });
    
    // Botón de Confirmar Orden
    const btnOrden = document.getElementById("btnOrden");
    
    if (btnOrden) {
        btnOrden.addEventListener("click", function () {
            let telefono = localStorage.getItem("telefono");
            let contadorTareas = parseInt(localStorage.getItem("contadorTareas_" + telefono) || "0");
    
            if (contadorTareas > 0) {
                let pedidoPendiente = localStorage.getItem("pedidoPendiente");
    
                if (pedidoPendiente) {
                    document.getElementById("mensajePedidoPendiente").classList.add("mostrar");
                } else {
                    document.getElementById("overlay").style.display = "flex";
    
                    setTimeout(function () {
                        document.getElementById("overlay").style.display = "none";
                        contadorTareas--; // Disminuir el contador de tareas
                        localStorage.setItem("contadorTareas_" + telefono, contadorTareas);
                        document.getElementById("contadorTareas").textContent = contadorTareas;
    
                        if (contadorTareas <= 0) {
                            localStorage.setItem("vipActivo_" + telefono, "No activa");
                            tipoSuscripcionElement.innerText = "No activa";
                            asignarClaseAnimacion("No activa");
                            document.getElementById("mensajeNoTareas").classList.add("mostrar");
    
                            setTimeout(function() {
                                document.getElementById("mensajeNoTareas").classList.remove("mostrar");
                            }, 2000);
                        }
                    }, 2000);
                }
            } else {
                document.getElementById("mensajeNoTareas").classList.add("mostrar");
                setTimeout(function() {
                    document.getElementById("mensajeNoTareas").classList.remove("mostrar");
                }, 2000);
            }
        });
    }