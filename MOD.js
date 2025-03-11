
function ajustarModal(id, ancho, alto) {
let modal = document.getElementById(id).querySelector('.modal-content');
modal.style.width = ancho;
modal.style.height = alto;
}

function ajustarImagen(id, ancho, alto) {
let imagen = document.getElementById(id).querySelector('.modal-content img');
imagen.style.width = ancho;
imagen.style.height = alto;
}

ajustarModal('myModal', '100%', '250px');
ajustarImagen('myModal', '100px', '100px'); 
