
document.addEventListener("DOMContentLoaded", function() {
let telefono = localStorage.getItem("telefono");
if (!telefono) {
 alert("No se encontró un teléfono válido. Inicia sesión.");
 window.location.href = "Registro.html";
 return;
}

// Verificar si es necesario reiniciar las ganancias de hoy
reiniciarGananciaHoySiEsNecesario();

mostrarPedidosPendientes();
mostrarPedidosCompletados(); // Mostrar pedidos completados inicialmente

function obtenerSaldoDisponible() {
 return parseFloat(localStorage.getItem("saldo_" + telefono)) || 0;
}

function obtenerGananciaHoy() {
 return parseFloat(localStorage.getItem("gananciasHoy_" + telefono)) || 0;
}

function obtenerIngresosTotales() {
 return parseFloat(localStorage.getItem("ingresosTotales_" + telefono)) || 0;
}

// Mostrar los pedidos completados
function mostrarPedidosCompletados() {
 let pedidosCompletados = JSON.parse(localStorage.getItem("pedidosCompletados_" + telefono)) || [];
 let pedidosCompletadosDiv = document.getElementById("pedidosCompletados");

 pedidosCompletadosDiv.innerHTML = pedidosCompletados.length > 0 ? pedidosCompletados.map(pedido => `
     <div id="pedido-${pedido.id}" class="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
         <img src="${pedido.imagen}" alt="Imagen Pedido" class="w-20 h-20 object-cover mr-4">
         <div class="flex-1">
             <p class="font-bold">${pedido.nombre}</p>
             <p class="text-gray-700">Saldo Requerido: Mex$${pedido.saldoRequerido}</p>
             <p class="text-gray-700">Ganancia: Mex$${pedido.ganancias}</p>
         </div>
         <div class="text-center text-white bg-green-500 p-2 mt-2 rounded">
             Pedido Completado
         </div>
     </div>`).join("") : "<p>No hay pedidos completados.</p>";
}

// Función para reiniciar las ganancias de hoy cada 24 horas
function reiniciarGananciaHoySiEsNecesario() {
 let ultimoReinicio = parseInt(localStorage.getItem("ultimoReinicioGananciaHoy_" + telefono)) || 0;
 let ahora = Date.now();
 let tiempoTranscurrido = ahora - ultimoReinicio;

 // Si han pasado 24 horas (86400000 ms)
 if (tiempoTranscurrido >= 86400000) {
     // Reiniciar las ganancias de hoy
     localStorage.setItem("gananciasHoy_" + telefono, "0");
     localStorage.setItem("ultimoReinicioGananciaHoy_" + telefono, ahora.toString());
 }
}

function mostrarPedidosPendientes() {
 let pedidosPendientes = JSON.parse(localStorage.getItem("pedidosPendientes_" + telefono)) || [];
 let pedidosPendientesDiv = document.getElementById("pedidosPendientes");
 let saldoDisponible = obtenerSaldoDisponible();

 pedidosPendientesDiv.innerHTML = pedidosPendientes.length > 0 ? pedidosPendientes.map(pedido => `
     <div id="pedido-${pedido.id}" class="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
         <img src="${pedido.imagen}" alt="Imagen Pedido" class="w-20 h-20 object-cover mr-4">
         <div class="flex-1">
             <p class="font-bold">${pedido.nombre}</p>
             <p class="text-gray-700">Saldo Requerido: Mex$${pedido.saldoRequerido}</p>
             <p class="text-gray-700">Ganancia: Mex$${pedido.ganancias}</p>
             <p class="text-gray-700">Saldo Disponible: Mex$${saldoDisponible.toFixed(2)}</p>
         </div>
         <button class="bg-green-500 text-white px-4 py-2 rounded" onclick="confirmarPedido(${pedido.id}, ${pedido.saldoRequerido}, ${pedido.ganancias})">Confirmar</button>
     </div>`).join("") : "<p>No hay pedidos pendientes.</p>";
}

window.confirmarPedido = function(id, saldoRequerido, ganancias) {
 let saldoDisponible = obtenerSaldoDisponible();

 if (saldoDisponible < saldoRequerido) {
     let faltante = saldoRequerido - saldoDisponible;
     mostrarModal(`Te faltan <b>Mex$${faltante.toFixed(2)}</b> para confirmar este pedido.`);
     return;
 }

 let pedidosPendientes = JSON.parse(localStorage.getItem("pedidosPendientes_" + telefono)) || [];
 let pedidoIndex = pedidosPendientes.findIndex(p => p.id === id);
 if (pedidoIndex === -1) return;

 let pedido = pedidosPendientes.splice(pedidoIndex, 1)[0];

 saldoDisponible = saldoDisponible + ganancias;
 let gananciaHoy = obtenerGananciaHoy() + ganancias;
 let ingresosTotales = obtenerIngresosTotales() + ganancias;

 localStorage.setItem("saldo_" + telefono, saldoDisponible.toFixed(2));
 localStorage.setItem("gananciasHoy_" + telefono, gananciaHoy.toFixed(2));
 localStorage.setItem("ingresosTotales_" + telefono, ingresosTotales.toFixed(2));

 let pedidosCompletados = JSON.parse(localStorage.getItem("pedidosCompletados_" + telefono)) || [];
 pedidosCompletados.push(pedido);

 localStorage.setItem("pedidosPendientes_" + telefono, JSON.stringify(pedidosPendientes));
 localStorage.setItem("pedidosCompletados_" + telefono, JSON.stringify(pedidosCompletados));

 mostrarPedidosPendientes();
 mostrarPedidosCompletados(); // Mostrar los pedidos completados en la pestaña correspondiente
}

// Función para mostrar el mensaje del modal
function mostrarModal(mensaje) {
 let modal = document.getElementById("modalSaldoInsuficiente");
 let modalContenido = document.getElementById("modalContenido");

 document.getElementById("mensajeSaldoInsuficiente").innerHTML = mensaje;
 modal.classList.remove("hidden");
 setTimeout(() => {
     modal.classList.add("show");
     modalContenido.classList.add("show");
 }, 10);
 
 setTimeout(() => {
     cerrarModal();
 }, 3000);
}

window.cerrarModal = function() {
 let modal = document.getElementById("modalSaldoInsuficiente");
 let modalContenido = document.getElementById("modalContenido");

 modal.classList.remove("show");
 modalContenido.classList.remove("show");

 setTimeout(() => {
     modal.classList.add("hidden");
 }, 500);
}

// Lógica para alternar entre las pestañas de "Pedidos Pendientes" y "Pedidos Completados"
document.getElementById("btnPedidosPendientes").addEventListener("click", function() {
 document.getElementById("pedidosPendientes").classList.remove("hidden");
 document.getElementById("pedidosCompletados").classList.add("hidden");
});

document.getElementById("btnPedidosCompletados").addEventListener("click", function() {
 document.getElementById("pedidosCompletados").classList.remove("hidden");
 document.getElementById("pedidosPendientes").classList.add("hidden");
});
});
