
    // Función para mostrar el modal
    function mostrarModal(mensaje) {
        const modal = document.getElementById('modal');
        const modalMessage = document.getElementById('modalMessage');
        modalMessage.textContent = mensaje;
        modal.style.display = 'block';

        // Cerrar el modal después de 3 o 2 segundos
        setTimeout(() => {
            modal.style.display = 'none';
        }, mensaje === "Recarga confirmada" ? 2000 : 3000);
    }

    // Función para cerrar el modal manualmente
    function closeModal() {
        document.getElementById('modal').style.display = 'none';
    }

    // Función para mostrar las recargas en la lista
    function mostrarHistorialRecargas() {
        const telefonoActivo = localStorage.getItem("telefono");
        if (!telefonoActivo) {
            alert("No hay número de teléfono registrado. Por favor, inicia sesión.");
            return;
        }

        let recargasPorTelefono = JSON.parse(localStorage.getItem('recargasPorTelefono')) || {};
        const recargas = recargasPorTelefono[telefonoActivo] || [];
        const historialRecargas = document.getElementById('historialRecargas');
        historialRecargas.innerHTML = ''; // Limpiar la lista antes de mostrar nuevas

        // Mostrar las recargas
        recargas.forEach(recarga => {
            const recargaItem = document.createElement('li');
            recargaItem.textContent = `Monto: $${recarga.monto} | Banco: ${recarga.banco} | Código: ${recarga.codigo} | Fecha: ${recarga.fecha}`;
            historialRecargas.appendChild(recargaItem);
        });
    }

    // Guardar recarga
    document.getElementById('guardarRecarga').addEventListener('click', function() {
        const monto = parseFloat(document.getElementById('montoRecarga').value);
        const banco = document.getElementById('bancoRecarga').value.trim();
        const codigo = document.getElementById('codigoVerificacion').value.trim();
        let codigoEsperado = '';
        let codigoUsado = false;

        // Verificar si el código ya ha sido utilizado
        if (localStorage.getItem('codigoUsado_' + codigo)) {
            mostrarModal("Este código ya ha sido utilizado.");
            return;
        }

        // Validar los códigos según el rango de monto
        if (monto >= 1 && monto <= 100) {
            const codigos = ['MN1', 'MM2', 'MJ3', 'Mk4', 'MLK5', 'MGT6', 'MAE7', 'MWE8'];
            if (!codigos.includes(codigo)) {
                mostrarModal("Introduce un código válido.");
                return;
            }
            codigoEsperado = codigo;
        } else if (monto >= 101 && monto <= 999) {
            const codigos = ['KL1', 'HT2', 'TUS3', 'YT4', 'AS5', 'OPT6', 'DS7', 'WQ8'];
            if (!codigos.includes(codigo)) {
                mostrarModal("Introduce un código válido.");
                return;
            }
            codigoEsperado = codigo;
        } else if (monto >= 1000 && monto <= 50000) {
            const codigos = ['DE1', 'KL2', 'VB3', 'CXZ4', 'CG5', 'FTR6', 'IOP7', 'ÑPp'];
            if (!codigos.includes(codigo)) {
                mostrarModal("Introduce un código válido.");
                return;
            }
            codigoEsperado = codigo;
        } else {
            mostrarModal("Monto fuera de los rangos permitidos.");
            return;
        }

        // Verificar si el código proporcionado coincide con el esperado
        if (codigo === codigoEsperado) {
            // Guardar la recarga en el localStorage
            const recarga = {
                monto: monto,
                banco: banco,
                fecha: new Date().toLocaleString(),
                codigo: codigo
            };

            // Obtener el teléfono activo
            const telefonoActivo = localStorage.getItem("telefono");
            if (!telefonoActivo) {
                alert("No hay número de teléfono registrado. Por favor, inicia sesión.");
                return;
            }

            // Obtener las recargas almacenadas para el teléfono activo
            let recargasPorTelefono = JSON.parse(localStorage.getItem('recargasPorTelefono')) || {};

            // Si no existe una entrada para el teléfono activo, crearla
            if (!recargasPorTelefono[telefonoActivo]) {
                recargasPorTelefono[telefonoActivo] = [];
            }

            // Agregar la nueva recarga a la lista de recargas del teléfono activo
            recargasPorTelefono[telefonoActivo].push(recarga);
            localStorage.setItem('recargasPorTelefono', JSON.stringify(recargasPorTelefono));

            // Marcar el código como usado
            localStorage.setItem('codigoUsado_' + codigo, 'true');

            mostrarModal("Recarga confirmada");

            // Mostrar las recargas en la lista acumulativa
            mostrarHistorialRecargas();

            // Resetear el formulario
            document.getElementById('montoRecarga').value = '';
            document.getElementById('bancoRecarga').value = '';
            document.getElementById('codigoVerificacion').value = '';

        } else {
            mostrarModal("Introduce el código dado por tu supervisor.");
        }
    });

    // Mostrar el historial de recargas cuando la página se cargue
    mostrarHistorialRecargas();
