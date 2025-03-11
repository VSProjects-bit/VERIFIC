
document.addEventListener("DOMContentLoaded", function() {
let telefono = localStorage.getItem("telefono");
if (!telefono) {
alert("No se encontró un teléfono válido. Inicia sesión.");
window.location.href = "index.html";
return;
}

let saldoGuardado = localStorage.getItem("saldo_" + telefono);
document.getElementById("saldo").innerText = saldoGuardado !== null ? `Mex$${parseFloat(saldoGuardado).toFixed(2)}` : "No se ha encontrado saldo.";

let contadorTareas = parseInt(localStorage.getItem("contadorTareas_" + telefono), 10) || 0;
let pedidosPendientes = JSON.parse(localStorage.getItem("pedidosPendientes_" + telefono)) || [];

// Verificar si hay tareas o pedidos pendientes
if (contadorTareas > 0 || pedidosPendientes.length > 0) {
document.getElementById('popupPendiente').style.display = 'block';
setTimeout(function() {
 document.getElementById('popupPendiente').style.display = 'none';
}, 5000);  // Desaparece después de 5 segundos

document.getElementById('confirmar').classList.add('button-disabled');
document.getElementById('confirmar').disabled = true;
}

document.getElementById('amount').addEventListener('input', function() {
const amount = parseFloat(this.value);
const saldo = parseFloat(saldoGuardado) || 0;
const botonConfirmar = document.getElementById('confirmar');

if (amount >= 150 && amount <= saldo) {
 botonConfirmar.classList.remove('button-disabled');
 botonConfirmar.disabled = false;
} else {
 botonConfirmar.classList.add('button-disabled');
 botonConfirmar.disabled = true;
}
});

document.getElementById('confirmar').addEventListener('click', function() {
const amount = parseFloat(document.getElementById('amount').value);
const saldo = parseFloat(saldoGuardado) || 0;
const password = document.getElementById('password').value;

let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
let cuenta = cuentas.find(cuenta => cuenta.celular === telefono);

document.getElementById('mensajeError').style.display = 'none';

if (cuenta && password === cuenta.passwordRetiro) {
 if (saldo >= amount && contadorTareas === 0) {
     const nuevoSaldo = saldo - amount;
     localStorage.setItem("saldo_" + telefono, nuevoSaldo.toFixed(2));
     document.getElementById('mensajeExitoso').style.display = 'block';
     setTimeout(function() {
         document.getElementById('mensajeExitoso').style.display = 'none';
     }, 3000);

     document.getElementById('saldo').innerText = `Mex$${nuevoSaldo.toFixed(2)}`;

     let retiro = {
         monto: amount,
         fecha: new Date().toLocaleString(),
         estado: "En proceso"
     };

     let retirosRealizados = JSON.parse(localStorage.getItem("retirosRealizados_" + telefono)) || [];
     retirosRealizados.push(retiro);
     localStorage.setItem("retirosRealizados_" + telefono, JSON.stringify(retirosRealizados));

     document.getElementById('amount').value = '';
     document.getElementById('password').value = '';
 } else {
     document.getElementById('mensajeError').style.display = 'block';
     setTimeout(function() {
         document.getElementById('mensajeError').style.display = 'none';
     }, 2000);
 }
} else {
 document.getElementById('mensajeError').style.display = 'block';
 setTimeout(function() {
     document.getElementById('mensajeError').style.display = 'none';
 }, 2000);
}
});
});
