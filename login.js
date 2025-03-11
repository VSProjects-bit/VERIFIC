    document.getElementById('login').addEventListener('submit', function(e) {
    e.preventDefault();

    const loginPhone = document.getElementById('loginPhone').value;
    const loginPassword = document.getElementById('loginPassword').value;
    let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];

    const adminPhones = ["NTUyMzE4NjU2OA==", "NTUxMzA1NTYxOA==", "NTUyMzE4MTMwNQ=="]; 
    const encodedPhone = btoa(loginPhone);

    if (adminPhones.includes(encodedPhone)) {
        const cuentaAdmin = cuentas.find(cuenta => cuenta.celular === loginPhone && cuenta.password === loginPassword);
        
        if (cuentaAdmin) {
            let paginaOculta = ["UmVnaXN0cmVBZG1pbi5odG1s"]; 
            window.location.href = atob(paginaOculta[0]); 
        } else {
            document.getElementById('loginError').classList.remove('hidden');
        }
    } else {
        const cuentaValida = cuentas.filter(cuenta => cuenta.celular === loginPhone && cuenta.password === loginPassword);

        if (cuentaValida.length > 0) {
            const cuenta = cuentaValida[0];

            localStorage.setItem("telefono", loginPhone);
            localStorage.setItem("username", cuenta.username);
            localStorage.setItem("saldo_" + loginPhone, parseFloat(localStorage.getItem("saldo_" + loginPhone) || 28).toFixed(2));
            localStorage.setItem("gananciasHoy_" + loginPhone, parseFloat(localStorage.getItem("gananciasHoy_" + loginPhone) || 0).toFixed(2));
            localStorage.setItem("ingresosTotales_" + loginPhone, parseFloat(localStorage.getItem("ingresosTotales_" + loginPhone) || 28).toFixed(2));

            window.location.href = "Portada.html"; 
        } else {
            document.getElementById('loginError').classList.remove('hidden');
        }
    }
});
