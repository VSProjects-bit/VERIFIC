
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginTab.addEventListener('click', () => {
   loginForm.classList.remove('hidden');
   registerForm.classList.add('hidden');
});

registerTab.addEventListener('click', () => {
   registerForm.classList.remove('hidden');
   loginForm.classList.add('hidden');
});

document.getElementById('toRegister').addEventListener('click', () => {
   registerForm.classList.remove('hidden');
   loginForm.classList.add('hidden');
});

document.getElementById('toLogin').addEventListener('click', () => {
   loginForm.classList.remove('hidden');
   registerForm.classList.add('hidden');
});

document.getElementById('register').addEventListener('submit', function(e) {
   e.preventDefault();

   const phone = document.getElementById('registerPhone').value;
   const username = document.getElementById('registerUsername').value;
   const password = document.getElementById('registerPassword').value;
   const withdrawPassword = document.getElementById('withdrawPassword').value;
   const verificationCode = document.getElementById('verificationCode').value;


   const phoneRegex = /^\d{10,13}$/;
   if (!phoneRegex.test(phone)) {
       document.getElementById('phoneError').classList.remove('hidden');
       return;
   } else {
       document.getElementById('phoneError').classList.add('hidden');
   }


   const usernameRegex = /^(?=(.*\d){2})(?=(.*\w){4,})/;
   if (!usernameRegex.test(username)) {
       document.getElementById('usernameError').classList.remove('hidden');
       return;
   } else {
       document.getElementById('usernameError').classList.add('hidden');
   }

   const passwordRegex = /^(?=(.*\d){2})(?=(.*\w){4,})/;
   if (!passwordRegex.test(password)) {
       document.getElementById('passwordError').classList.remove('hidden');
       return;
   } else {
       document.getElementById('passwordError').classList.add('hidden');
   }

   if (!passwordRegex.test(withdrawPassword)) {
       document.getElementById('withdrawPasswordError').classList.remove('hidden');
       return;
   } else {
       document.getElementById('withdrawPasswordError').classList.add('hidden');
   }

   if (phone === '' || username === '' || password === '' || withdrawPassword === '' || verificationCode === '') {
       document.getElementById('registerError').innerText = 'Por favor, completa todos los campos.';
       document.getElementById('registerError').classList.remove('hidden');
   } else if (verificationCode !== '558013') {
       document.getElementById('registerError').innerText = 'Código de verificación incorrecto.';
       document.getElementById('registerError').classList.remove('hidden');
   } else {
       let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];

       const telefonoExistente = cuentas.find(cuenta => cuenta.celular === phone);
       if (telefonoExistente) {
           alert("Este número ya está registrado. Por favor, inicie sesión.");
           return;
       }


       cuentas.push({ celular: phone, username, password, passwordRetiro: withdrawPassword, tareas: 0 });

      
       let saldo = localStorage.getItem("saldo_" + phone);
       if (!saldo) {
           saldo = 28;
           localStorage.setItem("saldo_" + phone, saldo.toFixed(2)); 
       } else {
           saldo = parseFloat(saldo); 
       }

       let gananciasHoy = 0; 
       let ingresosTotales = saldo; 

       localStorage.setItem("cuentas", JSON.stringify(cuentas));
       localStorage.setItem("telefono", phone);
       localStorage.setItem("username", username);
       localStorage.setItem("saldo_" + phone, saldo.toFixed(2)); 
       localStorage.setItem("gananciasHoy_" + phone, gananciasHoy.toFixed(2)); 
       localStorage.setItem("ingresosTotales_" + phone, ingresosTotales.toFixed(2)); 

       window.location.href = "Portada.html";
   }
});