 
        async function uploadImage() {
            const input = document.getElementById('fileInput');
            if (input.files.length === 0) {
                alert("Por favor, selecciona una imagen.");
                return;
            }
            const formData = new FormData();
            formData.append('file', input.files[0]);

            const response = await fetch('https://mrface.onrender.com/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            // Mostrar la imagen procesada
            const processedImage = document.getElementById('processedImage');
            processedImage.src = 'data:image/png;base64,' + data.image_with_points_base64;
            processedImage.style.display = 'block';

            console.log('Imagen original subida con ID:', data.drive_id);
        }
   

