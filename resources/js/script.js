// Cambia el texto en el área de subida para mostrar el nombre del archivo
document.getElementById("file").addEventListener("change", function () {
    const fileName = this.files[0] ? this.files[0].name : "Haz clic o arrastra una imagen aquí";
    document.querySelector(".upload-icon span").textContent = fileName;
});

// Dispara el input de tipo archivo al hacer clic en el área completa de subida
document.getElementById("uploadArea").addEventListener("click", function () {
    document.getElementById("file").click();
});

// Subir y procesar imagen
document.getElementById("uploadForm").onsubmit = async function (event) {
    event.preventDefault();
    const fileInput = document.getElementById("file").files[0];
    const loadingMessage = document.getElementById('loading');
    const processedImage = document.getElementById("processedImage");
    const driveLink = document.getElementById("driveLink");

    const formData = new FormData();
    formData.append("file", fileInput);

    // Muestra el mensaje de carga y oculta la imagen y el enlace de Drive
    loadingMessage.style.display = 'block';
    processedImage.style.display = "none";
    driveLink.innerHTML = '';

    try {
        const response = await fetch('https://mrface.onrender.com/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if (result.error) {
            alert(result.error);
        } else {
            // Muestra la imagen procesada
            processedImage.src = "data:image/png;base64," + result.image_with_points_base64;
            processedImage.style.display = "block";

            // Muestra el enlace a Google Drive
            driveLink.innerHTML = `<a href="https://drive.google.com/file/d/${result.drive_id}/view" target="_blank">Ver en Google Drive</a>`;
        }
    } catch (error) {
        console.error('Error al procesar la imagen:', error);
        alert("Ocurrió un error al procesar la imagen.");
    } finally {
        // Oculta el mensaje de carga cuando se complete el proceso
        loadingMessage.style.display = 'none';
    }
};

// Procesar transformaciones
async function processOperation(operation) {
    const loadingMessage = document.getElementById('loading');
    const processedImage = document.getElementById("processedImage");
    const driveLink = document.getElementById("driveLink");

    // Muestra el mensaje de carga y oculta la imagen
    loadingMessage.style.display = 'block';
    processedImage.style.display = "none";
    driveLink.innerHTML = '';

    try {
        const response = await fetch(`https://mrface.onrender.com/process?operation=${operation}`, {
            method: 'GET',
        });

        const result = await response.json();
        if (result.error) {
            alert(result.error);
        } else {
            // Muestra la imagen procesada
            processedImage.src = "data:image/png;base64," + result.image_with_points_base64;
            processedImage.style.display = "block";

            // Muestra el enlace a Google Drive (si aplica)
            if (result.drive_id) {
                driveLink.innerHTML = `<a href="https://drive.google.com/file/d/${result.drive_id}/view" target="_blank">Ver en Google Drive</a>`;
            }
        }
    } catch (error) {
        console.error('Error al procesar la operación:', error);
        alert("Ocurrió un error al procesar la operación.");
    } finally {
        // Oculta el mensaje de carga cuando se complete el proceso
        loadingMessage.style.display = 'none';
    }
}

// Eventos para los botones de transformación
document.getElementById('originalBtn').addEventListener('click', () => processOperation('original'));
document.getElementById('brightnessBtn').addEventListener('click', () => processOperation('brightness'));
document.getElementById('horizontalFlipBtn').addEventListener('click', () => processOperation('horizontal_flip'));
document.getElementById('verticalFlipBtn').addEventListener('click', () => processOperation('vertical_flip'));
