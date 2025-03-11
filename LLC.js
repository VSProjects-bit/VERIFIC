
        document.addEventListener("DOMContentLoaded", function() {
            try {
                let telefono = localStorage.getItem("telefono");
                if (!telefono) {
                    alert("No se encontró un teléfono válido. Inicia sesión.");
                    window.location.href = "Registro.html";
                    return;
                }
                let saldoGuardado = localStorage.getItem("saldo_" + telefono);
                if (saldoGuardado === null || isNaN(parseFloat(saldoGuardado))) {
                    saldoGuardado = 28; 
                    localStorage.setItem("saldo_" + telefono, saldoGuardado); 
                } else {
                    saldoGuardado = parseFloat(saldoGuardado);
                }
                let gananciasHoy = parseFloat(localStorage.getItem("gananciasHoy_" + telefono)) || 0;
                let saldoCongelado = parseFloat(localStorage.getItem("saldoCongelado_" + telefono)) || 0;
                document.getElementById("saldo").innerText = `Mex$${saldoGuardado.toFixed(2)}`;
                document.getElementById("gananciasHoy").innerText = `Mex$${gananciasHoy.toFixed(2)}`;
                document.getElementById("saldoCongelado").innerText = `Mex$${saldoCongelado.toFixed(2)}`;
                function completarPedido(pedido) {
                    let saldoGuardado = parseFloat(localStorage.getItem("saldo_" + telefono) || "0");
                    let gananciasHoy = parseFloat(localStorage.getItem("gananciasHoy_" + telefono) || "0");
                    let ingresosTotales = parseFloat(localStorage.getItem("ingresosTotales_" + telefono) || "0");
                    let contadorTareas = localStorage.getItem("contadorTareas")
    ? parseInt(localStorage.getItem("contadorTareas"))
    : 0;
    let gananciaPedido = parseFloat(pedido.ganancias) || 0;

                    if (isNaN(gananciaPedido)) {
    console.error("Error: pedido.ganancias no es un número válido", pedido.ganancias);
    return;
}

                    saldoGuardado += gananciaPedido;
                    gananciasHoy += gananciaPedido;
                    ingresosTotales += gananciaPedido;
                    localStorage.setItem("saldo_" + telefono, saldoGuardado.toFixed(2));
localStorage.setItem("gananciasHoy_" + telefono, gananciasHoy.toFixed(2));
localStorage.setItem("ingresosTotales_" + telefono, ingresosTotales.toFixed(2));
document.getElementById("saldo").innerText = `Mex$${saldoGuardado.toFixed(2)}`;
document.getElementById("gananciasHoy").innerText = `Mex$${gananciasHoy.toFixed(2)}`;
document.getElementById("ingresosTotales").innerText = `Mex$${ingresosTotales.toFixed(2)}`;
                    localStorage.removeItem("pedidoPendiente");
                }
            } catch (error) {
                console.error("Error en el script:", error);
            }
        });
