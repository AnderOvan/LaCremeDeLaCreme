document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.card-carousel');

    carousels.forEach(carousel => {
        // Obtener el listado de imágenes desde el atributo data-images
        const images = carousel.dataset.images.split(',').map(img => img.trim());
        const imgElement = carousel.querySelector('.carousel-img');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        
        let currentIndex = 0;
        let autoRotateInterval;

        // Función para cambiar de imagen con efecto suave
        const updateImage = (index) => {
            imgElement.classList.add('fade-out');
            setTimeout(() => {
                imgElement.src = images[index];
                imgElement.classList.remove('fade-out');
            }, 250);
        };

        const showNext = () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage(currentIndex);
        };

        const showPrev = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage(currentIndex);
        };

        // Iniciar rotación automática (cada 3500ms = 3.5 segundos)
        const startAutoRotate = () => {
            autoRotateInterval = setInterval(showNext, 5500);
        };

        const stopAutoRotate = () => {
            clearInterval(autoRotateInterval);
        };

        // Eventos de los botones
        nextBtn.addEventListener('click', () => {
            stopAutoRotate();
            showNext();
            startAutoRotate();
        });

        prevBtn.addEventListener('click', () => {
            stopAutoRotate();
            showPrev();
            startAutoRotate();
        });

        // Pausar rotación automática cuando el usuario pasa el mouse encima
        carousel.addEventListener('mouseenter', stopAutoRotate);
        carousel.addEventListener('mouseleave', startAutoRotate);

        // Arrancar rotación
        startAutoRotate();
    });
});