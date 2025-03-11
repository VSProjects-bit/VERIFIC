
        const phone = localStorage.getItem("telefono");
        const username = localStorage.getItem("username");

        document.getElementById("userPhone").textContent = phone || "No encontrado";
        document.getElementById("userName").textContent = username || "No encontrado";
