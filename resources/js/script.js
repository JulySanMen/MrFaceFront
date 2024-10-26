document.getElementById("uploadForm").onsubmit = async function(event) {
    event.preventDefault();
    const fileInput = document.getElementById("file").files[0];
    
    const formData = new FormData();
    formData.append("file", fileInput);

    try {
        const response = await fetch("https://mrface.onrender.com/upload", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (result.error) {
            alert(result.error);
        } else {
            // Muestra la imagen procesada
            const processedImage = document.getElementById("processedImage");
            processedImage.src = "data:image/png;base64," + result.image_with_points_base64;
            processedImage.style.display = "block"; // Asegura que la imagen se muestre

            // Muestra el enlace a Google Drive
            const driveLink = document.getElementById("driveLink");
            driveLink.innerHTML = `<a href="https://drive.google.com/file/d/${result.drive_id}/view" target="_blank">Ver en Google Drive</a>`;
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

