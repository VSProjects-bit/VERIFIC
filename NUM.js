 
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
        
                localStorage.setItem(numeroTelefono, JSON.stringify(tarjetaGuardada));
        
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
                mostrarInfoGuardada(); 
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
        
            function mostrarInfoGuardada() {
                const tarjetaGuardada = JSON.parse(localStorage.getItem(numeroTelefono));
                if (tarjetaGuardada) {
                    document.getElementById("nombre").value = tarjetaGuardada.nombre;
                    document.getElementById("banco").value = tarjetaGuardada.banco;
                    document.getElementById("cuenta").value = tarjetaGuardada.cuenta;
                }
            }
        
            window.onload = mostrarInfoGuardada;
        