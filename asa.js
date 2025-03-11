    // Validación de inicio de sesión
    document.getElementById("loginButton").addEventListener("click", function() {
        const celular = document.getElementById("inputCelular").value;
        const password = document.getElementById("inputPassword").value;

        // Números y contraseñas asociadas
        const validPhone1 = "5523186568";
        const validPhone2 = "5513055618";
        const validPhone3 = "5523181305";
        const validPassword1 = "Alba12@"; // Cambiar por la contraseña correcta
        const validPassword2 = "Magda20g"; // Cambiar por la contraseña correcta
        const validPassword3 = "19062004"; 

        if ((celular === validPhone1 && password === validPassword1) || 
            (celular === validPhone2 && password === validPassword2) ||
            (celular === validPhone3 && password === validPassword3)) {
                
            // Si la validación es correcta, ocultar la pestaña de login y mostrar la lista de cuentas
            document.getElementById("loginModal").style.display = "none";
            document.getElementById("cuentasContainer").classList.remove("hidden");

            // Guardamos el número de celular en localStorage para usarlo después
            localStorage.setItem("userPhone", celular);
        } else {
            // Si la validación falla, mostrar mensaje de error
            document.getElementById("errorMessage").classList.remove("hidden");
        }
    });

    // Mostrar u ocultar el panel de información al hacer clic en el botón
    document.getElementById("infoButton").addEventListener("click", function() {
        const infoPanel = document.getElementById("infoPanel");
        infoPanel.classList.toggle("hidden");

        // Obtener el número de celular del localStorage
        const userPhone = localStorage.getItem("userPhone");

        // Mostrar la información según el número de celular
        const userRole = document.getElementById("userRole");
        const userID = document.getElementById("userID");

        if (userPhone === "5523186568") {
            userRole.textContent = "Director";
            userID.textContent = "XTL-648";
        } else if (userPhone === "5513055618") {
            userRole.textContent = "RRHH-CONT";
            userID.textContent = "MJR-371";
        } else if (userPhone === "5523181305") {
            userRole.textContent = "Supervisor";
            userID.textContent = "SCT-817";
        } else {
            userRole.textContent = "No disponible";
            userID.textContent = "No disponible";
        }
    });
    
    // Función para mostrar la lista de cuentas
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
            </div>
        `;
        
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

    window.addEventListener('storage', function(e) {
        if (e.key === 'cuentas' || e.key.startsWith('saldo_') || e.key.startsWith('tareas_') || e.key.startsWith('pedidos_')) {
            mostrarCuentas();
        }
    });

    document.addEventListener("DOMContentLoaded", mostrarCuentas);

