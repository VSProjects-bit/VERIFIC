        function abrirModalAdvertencia() {
                document.getElementById("myModalAdvertencia").style.display = "block";
        
                // Cierra el modal automáticamente después de 2 segundos
                setTimeout(function() {
                    cerrarModalAdvertencia();
                }, 2000); // 2000 ms = 2 segundos
            }
        
            function cerrarModalAdvertencia() {
                document.getElementById("myModalAdvertencia").style.display = "none";
            }
