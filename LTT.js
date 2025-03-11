
        function mostrarConfirmacion() {
            document.getElementById("confirmacion-modal").classList.remove("hidden");
        }

        function cerrarConfirmacion() {
            document.getElementById("confirmacion-modal").classList.add("hidden");
        }

        function confirmarPago() {
            const cantidadSeleccionada = document.getElementById("cantidad").value;
            alert(`Orden generada con éxito. Cantidad: Mex$${cantidadSeleccionada}`);
            cerrarConfirmacion();
            window.location.href = "AmazonMAIN.html"; 
        }
    