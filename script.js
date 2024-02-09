document.addEventListener("DOMContentLoaded", function () {
    const corazon = document.querySelector(".corazon");
    const sobre = document.querySelector('.sobre');
    const contenidoCarta = document.getElementById('contenidoCarta');
    const carta = document.querySelector('.carta');  // Agrega la referencia a la carta
    const botonCerrar = document.createElement('button');

    botonCerrar.innerText = 'Cerrar';
    botonCerrar.addEventListener('click', cerrarCarta);

    function abrirCarta() {
        // Modificación para el efecto de desvanecimiento al abrir
        contenidoCarta.style.opacity = '0';
        contenidoCarta.style.display = 'block';
        let opacity = 0;
        const fadeInInterval = setInterval(function () {
            if (opacity < 1) {
                opacity += 0.05;
                contenidoCarta.style.opacity = opacity;
            } else {
                clearInterval(fadeInInterval);
            }
        }, 50);
        botonCerrar.classList.add('cerrar-btn');

        carta.style.height = '400px';  // Ajusta la altura de la carta cuando se abre la carta
        contenidoCarta.style.maxHeight = '300px'; // Ajusta la altura máxima del contenido
        contenidoCarta.style.overflowY = 'auto'; // Agrega desbordamiento al contenido
        sobre.style.display = 'none';
        corazon.style.display = 'none';
        contenidoCarta.appendChild(botonCerrar);
    }

    function cerrarCarta() {
        // Modificación para el efecto de desvanecimiento al cerrar
        let opacity = 1;
        const fadeOutInterval = setInterval(function () {
            if (opacity > 0) {
                opacity -= 0.05;
                contenidoCarta.style.opacity = opacity;
            } else {
                clearInterval(fadeOutInterval);
                contenidoCarta.style.display = 'none';
            }
        }, 50);
        contenidoCarta.scrollTop = 0;
        carta.style.height = '200px'; // Restaura la altura original de la carta
        contenidoCarta.style.maxHeight = '100px'; // Restaura la altura máxima del contenido
        contenidoCarta.style.overflowY = 'hidden'; // Restaura el desbordamiento al contenido
        sobre.style.display = 'block';
        corazon.style.display = 'block';
        contenidoCarta.removeChild(botonCerrar);
    }

    sobre.addEventListener("click", abrirCarta);

    document.addEventListener("mousemove", function (event) {
        const { clientX, clientY } = event;
        const rect = corazon.getBoundingClientRect();

        const distanciaX = clientX - (rect.left + rect.width / 2);
        const distanciaY = clientY - (rect.top + rect.height / 2);
        const distanciaDesdeElCentro = Math.sqrt(distanciaX ** 2 + distanciaY ** 2);

        const nuevoTamano = 55 - distanciaDesdeElCentro / 10;
        const nuevaTonalidad = `rgb(${255 - distanciaDesdeElCentro}, 94, 120)`;

        const tamanoMinimo = 20;
        corazon.style.fontSize = `${Math.max(nuevoTamano, tamanoMinimo)}px`;
        corazon.style.color = nuevaTonalidad;
    });

    // Agregar scroll al contenido de la carta
    contenidoCarta.style.maxHeight = '100px';  // Ajusta la altura máxima según tu preferencia
    contenidoCarta.style.overflowY = 'auto';
});
