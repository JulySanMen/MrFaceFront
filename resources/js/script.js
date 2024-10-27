document.getElementById("uploadForm").onsubmit = async function(event){
            const input = document.getElementById('fileInput');
            if (input.files.length === 0) {
                alert("Por favor, selecciona una imagen.");
                return;
            }
            
            const formData = new FormData();
            formData.append('file', input.files[0]);

            // Mostrar el spinner de carga
            document.getElementById('loading').style.display = 'block';

            try {
                const response = await fetch('https://mrface.onrender.com/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                // Ocultar el spinner de carga
                document.getElementById('loading').style.display = 'none';

                // Mostrar la imagen procesada
                const processedImage = document.getElementById('processedImage');
                processedImage.src = 'data:image/png;base64,' + data.image_with_points_base64;
                processedImage.style.display = 'block';

                console.log('Imagen original subida con ID:', data.drive_id);
            } catch (error) {
                console.error('Error al procesar la imagen:', error);
                alert("Ocurrió un error al procesar la imagen.");
                document.getElementById('loading').style.display = 'none';
            }
        }
