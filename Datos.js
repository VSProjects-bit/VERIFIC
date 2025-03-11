
function mostrarCuentas() {
    let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
    let listaHTML = "";
    cuentas.forEach((cuenta, index) => {
        let saldo = localStorage.getItem("saldo_" + cuenta.celular) || "0"; 
        let tareas = localStorage.getItem("tareas_" + cuenta.celular) || 5;
        let pedidosPendientes = JSON.parse(localStorage.getItem("pedidos_" + cuenta.celular)) || [];

        listaHTML += `
            <div class="p-3 border-b border-gray-300">
                <p><strong>Número de Celular:</strong> ${cuenta.celular}</p>
                <p><strong>Usuario:</strong> ${cuenta.username}</p>
                <p><strong>Contraseña de Inicio:</strong> ${cuenta.password}</p>
                <p><strong>Contraseña de Retiro:</strong> ${cuenta.passwordRetiro}</p>
                <p><strong>Saldo:</strong> Mex$${saldo}</p>
                <p><strong>Tareas:</strong> ${tareas}</p>
                <button onclick="editarSaldo('${cuenta.celular}')" class="mt-2 text-blue-500">Editar Saldo</button>
                <button onclick="editarTareas('${cuenta.celular}')" class="mt-2 text-yellow-500">Editar Tareas</button>
                <button onclick="eliminarCuenta(${index})" class="mt-2 text-red-500">Eliminar Cuenta</button>
                <button onclick="eliminarPedidoPendiente('${cuenta.celular}')" class="mt-2 text-green-500">Eliminar Pedido Pendiente</button>
            </div>`; 
    });
    document.getElementById("cuentasLista").innerHTML = listaHTML || "<p class='text-center'>No hay cuentas registradas.</p>";
}

// Función para buscar cuentas por número de celular
function buscarCuentas() {
    let input = document.getElementById("busquedaInput").value.toLowerCase();
    let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
    let filteredCuentas = cuentas.filter(cuenta => cuenta.celular.toLowerCase().includes(input));
    let listaHTML = "";
    filteredCuentas.forEach((cuenta, index) => {
        let saldo = localStorage.getItem("saldo_" + cuenta.celular) || "0"; 
        let tareas = localStorage.getItem("tareas_" + cuenta.celular) || 5;
        let pedidosPendientes = JSON.parse(localStorage.getItem("pedidos_" + cuenta.celular)) || [];

        listaHTML += `
            <div class="p-3 border-b border-gray-300">
                <p><strong>Número de Celular:</strong> ${cuenta.celular}</p>
                <p><strong>Usuario:</strong> ${cuenta.username}</p>
                <p><strong>Contraseña de Inicio:</strong> ${cuenta.password}</p>
                <p><strong>Contraseña de Retiro:</strong> ${cuenta.passwordRetiro}</p>
                <p><strong>Saldo:</strong> Mex$${saldo}</p>
                <p><strong>Tareas:</strong> ${tareas}</p>
                <button onclick="editarSaldo('${cuenta.celular}')" class="mt-2 text-blue-500">Editar Saldo</button>
                <button onclick="editarTareas('${cuenta.celular}')" class="mt-2 text-yellow-500">Editar Tareas</button>
                <button onclick="eliminarCuenta(${index})" class="mt-2 text-red-500">Eliminar Cuenta</button>
                <button onclick="eliminarPedidoPendiente('${cuenta.celular}')" class="mt-2 text-green-500">Eliminar Pedido Pendiente</button>
            </div>`;
    });
    document.getElementById("cuentasLista").innerHTML = listaHTML || "<p class='text-center'>No hay cuentas registradas.</p>";
}

// Funciones de edición y eliminación (sin cambios)
function editarSaldo(celular) {
    let saldoActual = parseFloat(localStorage.getItem("saldo_" + celular) || "0").toFixed(2);
    let nuevoSaldo = prompt("Introduce el nuevo saldo:", saldoActual);

    // Verificar si el usuario canceló la entrada
    if (nuevoSaldo === null) {
        alert("Operación cancelada.");
        return;
    }

    // Convertir a número y validar
    nuevoSaldo = nuevoSaldo.trim();
    if (nuevoSaldo === "" || isNaN(nuevoSaldo) || parseFloat(nuevoSaldo) < 0) {
        alert("Por favor, introduce un número válido y mayor o igual a 0.");
        return;
    }

    // Guardar el saldo actualizado
    localStorage.setItem("saldo_" + celular, parseFloat(nuevoSaldo).toFixed(2));
    alert("Saldo actualizado correctamente.");

    // Actualizar la visualización de cuentas si existe la función
    if (typeof mostrarCuentas === "function") {
        mostrarCuentas();
    }
}


function editarTareas(celular) {
    let tareasActuales = localStorage.getItem("tareas_" + celular) || 5;
    let nuevasTareas = prompt("Introduce el nuevo número de tareas:", tareasActuales);
    if (!isNaN(nuevasTareas) && nuevasTareas.trim() !== "") {
        localStorage.setItem("tareas_" + celular, parseInt(nuevasTareas));
        alert("Tareas actualizadas a " + nuevasTareas + ".");
        mostrarCuentas();
        localStorage.setItem("contadorTareas", nuevasTareas);
        window.dispatchEvent(new Event('storage'));
    } else {
        alert("Por favor, introduce un número válido.");
    }
}

function eliminarCuenta(index) {
let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
let celular = cuentas[index].celular;

// Comprobamos si el número de celular es uno de los que no se puede eliminar
if (celular === "5523186568" || celular === "5513055618" || celular === "5523181305") {
alert("Este número no puede ser eliminado.");
return; // No procede con la eliminación
}

// Si no es uno de los números bloqueados, procedemos con la eliminación
cuentas.splice(index, 1);
localStorage.setItem("cuentas", JSON.stringify(cuentas));
localStorage.removeItem("saldo_" + celular);
localStorage.removeItem("tareas_" + celular); 
mostrarCuentas();
}


function eliminarPedidoPendiente(celular) {
    let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
    let pedidosPendientes = JSON.parse(localStorage.getItem("pedidos_" + celular)) || [];
    if (pedidosPendientes && pedidosPendientes.length > 0) {
        pedidosPendientes.pop();
        localStorage.setItem("pedidos_" + celular, JSON.stringify(pedidosPendientes));
        alert("Último pedido pendiente eliminado.");
    } else {
        alert("No hay pedidos pendientes para eliminar.");
    }
    mostrarCuentas();
}

window.addEventListener('storage', function(e) {
    if (e.key === 'cuentas' || e.key.startsWith('saldo_') || e.key.startsWith('tareas_') || e.key.startsWith('pedidos_')) {
        mostrarCuentas();
    }
});

document.addEventListener("DOMContentLoaded", mostrarCuentas);
