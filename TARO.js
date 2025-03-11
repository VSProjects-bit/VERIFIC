const numeroTelefono = localStorage.getItem('telefono'); 
if (!numeroTelefono) {
    const telefonoInput = prompt("Por favor, ingresa tu número de teléfono:");
    if (telefonoInput) {
        localStorage.setItem('telefono', telefonoInput); 
    } else {
        alert("El número de teléfono es obligatorio.");
        window.location.href = "mia.html"; 
    }
}

function formatearCuenta() {
    const cuenta = document.getElementById('cuenta');
    let cuentaValor = cuenta.value.replace(/\D/g, '');
    if (cuentaValor.length > 20) {
        cuentaValor = cuentaValor.slice(0, 20); 
    }
    if (cuentaValor.length <= 16) {
        cuentaValor = cuentaValor.replace(/(\d{4})(?=\d)/g, '$1 '); 
    }
    else if (cuentaValor.length <= 18) {
        cuentaValor = cuentaValor.replace(/(\d{4})(?=\d)/g, '$1 '); 
    }
    else if (cuentaValor.length === 20) {
        cuentaValor = cuentaValor.replace(/(\d{4})(?=\d)/g, '$1 '); 
    }
    cuenta.value = cuentaValor;
    const tipoCuenta = document.getElementById('tipoCuenta');
    if (cuentaValor.replace(/\s/g, '').length === 16) { 
        tipoCuenta.textContent = 'Tarjeta';
    } else if (cuentaValor.replace(/\s/g, '').length === 18) {  
        tipoCuenta.textContent = 'Clabe';
    } else {
        tipoCuenta.textContent = ''; 
    }
}

function guardarTarjeta() {
    let nombreInput = document.getElementById("nombre");
    let bancoInput = document.getElementById("banco");
    let cuentaInput = document.getElementById("cuenta");

    let nombre = nombreInput.value;
    let banco = bancoInput.value;
    let cuenta = cuentaInput.value;

    if (!nombre || !banco || !cuenta) {
        abrirModalAdvertencia();
        return;
    }

    let tarjetaGuardada = { nombre, banco, cuenta };

    // Recupera las tarjetas guardadas en el localStorage o un array vacío si no hay ninguna
    const tarjetasGuardadas = JSON.parse(localStorage.getItem("tarjetas")) || [];

    // Añade la nueva tarjeta al array de tarjetas
    tarjetasGuardadas.push(tarjetaGuardada);

    // Guarda nuevamente el array de tarjetas en el localStorage
    localStorage.setItem("tarjetas", JSON.stringify(tarjetasGuardadas));

    bloquearInputs(nombreInput, bancoInput, cuentaInput);
    abrirModal();
}

function bloquearInputs(...inputs) {
    inputs.forEach(input => input.setAttribute("readonly", true));
}

function abrirModal() {
    document.getElementById("myModal").style.display = "block";

    setTimeout(function() {
        cerrarModal();
    }, 2000); 
}

function cerrarModal() {
    document.getElementById("myModal").style.display = "none";
    cargarTarjetas(); // Cargar tarjetas después de cerrar el modal
}

function abrirModalAdvertencia() {
    document.getElementById("myModalAdvertencia").style.display = "block";

    // Cierra el modal automáticamente después de 2 segundos
    setTimeout(function() {
        cerrarModalAdvertencia(); 
    }, 2000); 
}

function cerrarModalAdvertencia() {
    document.getElementById("myModalAdvertencia").style.display = "none";
}

