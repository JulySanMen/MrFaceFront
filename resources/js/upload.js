
// Cambia el texto en el área de subida para mostrar el nombre del archivo
document.getElementById("file").addEventListener("change", function() {
    const fileName = this.files[0] ? this.files[0].name : "Haz clic o arrastra una imagen aquí";
    document.querySelector(".upload-icon span").textContent = fileName;
});

// Dispara el input de tipo archivo al hacer clic en el área completa de subida
document.getElementById("uploadArea").addEventListener("click", function() {
    document.getElementById("file").click();
});
