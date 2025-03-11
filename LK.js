
                const facturaLink = document.getElementById('facturaLink');
                const facturaModal = document.getElementById('facturaModal');
            
                facturaLink.addEventListener('click', () => {
                    // Mostrar la ventana emergente
                    facturaModal.classList.remove('hidden');
                    
                    // Cerrar la ventana emergente después de 3 segundos
                    setTimeout(() => {
                        facturaModal.classList.add('hidden');
                    }, 3000);
                });
            