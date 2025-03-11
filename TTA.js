         
  function mostrarConfirmacion(vipNumber, saldoRequerido, tareasAgregadas) {
    const telefono = localStorage.getItem("telefono");
    const saldo = parseFloat(localStorage.getItem("saldo_" + telefono) || 0);
    const contadorTareas = parseInt(localStorage.getItem("contadorTareas_" + telefono) || "0");
    const vipActivo = localStorage.getItem("vipActivo_" + telefono);

    // Verificar si este VIP ya fue completado por esta cuenta
    const vipCompletado = localStorage.getItem("vipCompletado_" + telefono + "_" + vipNumber);
    if (vipCompletado) {
        const suscripcionCompletadaOverlay = document.getElementById("suscripcionCompletadaOverlay");
        suscripcionCompletadaOverlay.classList.remove("hidden");

        setTimeout(function() {
            suscripcionCompletadaOverlay.classList.add("hidden");
        }, 2000);
        return;
    }

    
    if (vipActivo) {
        const suscripcionActivaOverlay = document.getElementById("suscripcionActivaOverlay");
        suscripcionActivaOverlay.classList.remove("hidden");

        setTimeout(function() {
            suscripcionActivaOverlay.classList.add("hidden");
        }, 2000);
        return;
    }

  
    if (saldo < saldoRequerido) {
        const saldoInsuficienteOverlay = document.getElementById("saldoInsuficienteOverlay");
        saldoInsuficienteOverlay.classList.remove("hidden");

        setTimeout(function() {
            saldoInsuficienteOverlay.classList.add("hidden");
        }, 1000);
        return;
    }

    
    const overlay = document.getElementById("confirmacionOverlay");
    overlay.classList.remove("hidden");

    const aceptarBtn = document.getElementById("aceptarBtn");
    aceptarBtn.onclick = function() {
        if (saldo >= saldoRequerido) {
            let nuevoContadorTareas = contadorTareas + tareasAgregadas; 
            localStorage.setItem("contadorTareas_" + telefono, nuevoContadorTareas);
            localStorage.setItem("vipActivo_" + telefono, "VIP " + vipNumber);

           
            localStorage.setItem("vipCompletado_" + telefono + "_" + vipNumber, true);

            
            const ordenesOverlay = document.getElementById("ordenesEncontradasOverlay");
            ordenesOverlay.classList.remove("hidden");

            setTimeout(function() {
                ordenesOverlay.classList.add("hidden");
            }, 2000);
        }

        cerrarConfirmacion();
    };
}

function cerrarConfirmacion() {
    const overlay = document.getElementById("confirmacionOverlay");
    overlay.classList.add("hidden");
}
    
    
        document.addEventListener("DOMContentLoaded", function() {
    const telefono = localStorage.getItem("telefono");
    const saldo = parseFloat(localStorage.getItem("saldo_" + telefono) || 0);

    const saldoDisponibleElement = document.getElementById('saldoDisponible');
    saldoDisponibleElement.textContent = `Mex$${saldo.toFixed(2)}`;


    let gananciasHoy = parseFloat(localStorage.getItem("gananciasHoy_" + telefono) || 0);
    

    document.getElementById("gananciasHoy").innerText = `Mex$${gananciasHoy.toFixed(2)}`;

    const contadorTareas = parseInt(localStorage.getItem("contadorTareas_" + telefono) || "0");
    const vipActivo = localStorage.getItem("vipActivo_" + telefono);
    

    
    if (contadorTareas === 0 && vipActivo) {
        localStorage.removeItem("vipActivo_" + telefono);
    }


            if (contadorTareas === 0 && !vipActivo) {
                const suscripciones = [
                    { vip: 1, saldoRequerido: 96, tareasAgregadas: 12 },
                    { vip: 2, saldoRequerido: 380, tareasAgregadas: 22 },
                    { vip: 3, saldoRequerido: 899, tareasAgregadas: 32 },
                    { vip: 4, saldoRequerido: 1399, tareasAgregadas: 42 },
                    { vip: 5, saldoRequerido: 2000, tareasAgregadas: 52 },
                    { vip: 6, saldoRequerido: 2800, tareasAgregadas: 62 }
                ];
    
            }
        });
 
