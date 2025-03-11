
// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function generarNumeroSeguimiento() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    const numeros = '0123456789';   
    let numeroSeguimiento = '';

    for (let i = 0; i < 7; i++) {
        const aleatorio = Math.floor(Math.random() * caracteres.length);
        numeroSeguimiento += caracteres.charAt(aleatorio); 
    }

    for (let i = 0; i < 4; i++) {
        const aleatorio = Math.floor(Math.random() * numeros.length);
        numeroSeguimiento += numeros.charAt(aleatorio); 
    }

    return numeroSeguimiento;
}

function mostrarRetiros() {
    let telefono = localStorage.getItem("telefono");
    if (!telefono) {
        alert("No se encontró un teléfono válido. Inicia sesión.");
        window.location.href = "index.html";
        return;
    }

    // Obtener los retiros realizados desde Firebase
    const retirosRef = db.collection("retiros"); // Colección de retiros en Firestore
    retirosRef.where("telefono", "==", telefono).get().then((querySnapshot) => {
        let listaRetiros = document.getElementById("retirosList");
        listaRetiros.innerHTML = '';

        if (querySnapshot.empty) {
            listaRetiros.innerHTML = "<p>No has realizado retiros aún.</p>";
        } else {
            querySnapshot.forEach((doc) => {
                let retiro = doc.data();
                if (!retiro.numeroSeguimiento) {
                    retiro.numeroSeguimiento = generarNumeroSeguimiento(); // Generar número de seguimiento si no existe
                }

                let item = document.createElement("div");
                item.classList.add("retiro-item");

                let info = document.createElement("div");
                info.classList.add("info");
                info.innerHTML = `Monto: Mex$${retiro.monto.toFixed(2)}<br>Fecha: ${retiro.fecha}<br><strong>Número de seguimiento:</strong> ${retiro.numeroSeguimiento}`;

                let estado = document.createElement("div");
                estado.classList.add("estado");
                
                switch(retiro.estado) {
                    case "Confirmado":
                        estado.style.backgroundColor = "#28a745";
                        estado.innerText = "✔";
                        break;
                    case "En proceso":
                        estado.style.backgroundColor = "#6c757d";
                        estado.innerText = "⏳";
                        break;
                    case "Rechazado":
                        estado.style.backgroundColor = "#dc3545";
                        estado.innerText = "✖";
                        break;
                }

                item.appendChild(info);
                item.appendChild(estado);
                listaRetiros.appendChild(item);
            });
        }
    }).catch((error) => {
        console.error("Error al obtener los retiros:", error);
    });
}

document.addEventListener("DOMContentLoaded", mostrarRetiros);
