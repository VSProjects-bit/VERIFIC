

    // Función para marcar la página actual como activa
    function marcarPaginaActual() {
        const links = document.querySelectorAll(".footer-link");
        const currentPage = window.location.pathname.split("/").pop();

        links.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Ejecutar al cargar la página
    document.addEventListener("DOMContentLoaded", marcarPaginaActual);
