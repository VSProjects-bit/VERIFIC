
document.getElementById('cantidad').addEventListener('change', function() {
    var customInput = document.getElementById('customCantidad');
    if (this.value === 'custom') {
        customInput.style.display = 'block';  
    } else {
        customInput.style.display = 'none';  
    }
});
