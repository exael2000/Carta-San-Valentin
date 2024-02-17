document.addEventListener("DOMContentLoaded", function () {
    const corazon = document.querySelector(".corazon");
    const sobre = document.querySelector('.sobre');
    const contenidoCarta = document.getElementById('contenidoCarta');
    const carta = document.querySelector('.carta');
    const botonCerrar = document.createElement('button');
    const frasesBtn = document.querySelector('.frases-btn');
    const frasesPanel = document.getElementById('frasesPanel');
    const cerrarFrasesBtn = document.querySelector('.cerrar-frases-btn');
    const frasesCargadasDiv = document.getElementById('frasesCargadas');

    botonCerrar.innerText = 'Cerrar';
    botonCerrar.addEventListener('click', cerrarCarta);

    frasesBtn.addEventListener('click', abrirPanelFrases);
    cerrarFrasesBtn.addEventListener('click', cerrarPanelFrases);

    function abrirCarta() {
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

        carta.style.height = '400px';
        contenidoCarta.style.maxHeight = '300px';
        contenidoCarta.style.overflowY = 'auto';
        sobre.style.display = 'none';
        corazon.style.display = 'none';
        contenidoCarta.appendChild(botonCerrar);
    }

    function cerrarCarta() {
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
        carta.style.height = '200px';
        contenidoCarta.style.maxHeight = '100px';
        contenidoCarta.style.overflowY = 'hidden';
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

    function abrirPanelFrases() {
        frasesPanel.style.display = 'block';

        // Limpia el espacio de frases cada vez que se abre el panel
        frasesCargadasDiv.innerHTML = '';

        // TODO: Lógica para cargar frases desde el archivo y agregarlas al frasesCargadasDiv
        // Ejemplo: Utiliza fetch para cargar las frases desde un archivo o una API
        fetch('frases.txt')
            .then(response => response.text())
            .then(data => {
                // Procesa las frases y agrégales el formato deseado
                const frasesArray = data.split('\n');
                frasesArray.forEach(frase => {
                    // Crea un contenedor independiente para cada frase
                    const fraseContainer = document.createElement('div');

                    // Crea un elemento para mostrar la parte de la frase
                    const fraseDiv = document.createElement('div');
                    fraseDiv.innerText = obtenerParteFrase(frase);

                    // Crea un evento clic para alternar entre mostrar la frase y solo el autor con el título
                    fraseContainer.addEventListener('click', function () {
                        alternarFraseAutorTitulo(frase, fraseContainer);
                    });

                    // Agrega la parte de la frase al contenedor
                    fraseContainer.appendChild(fraseDiv);

                    // Agrega el contenedor al espacio de frases
                    frasesCargadasDiv.appendChild(fraseContainer);
                });
            })
            .catch(error => console.error('Error cargando frases:', error));
    }

    function cerrarPanelFrases() {
        frasesPanel.style.display = 'none';
    }

    function obtenerParteFrase(fraseCompleta) {
        // Divide la frase completa en partes (frase, autor, libro)
        const partes = fraseCompleta.split('-');
        // Devuelve solo la parte de la frase
        return partes[0];
    }

    function alternarFraseAutorTitulo(fraseCompleta, contenedor) {
        // Divide la frase completa en partes (frase, autor, libro)
        const partes = fraseCompleta.split('-');

        // Verifica que haya al menos dos partes (frase y autor+libro)
        if (partes.length >= 2) {
            // Muestra la frase o solo el autor con el título en lugar de la frase actual en el contenedor específico
            contenedor.innerHTML = (contenedor.innerHTML === obtenerParteFrase(fraseCompleta)) ?
                `<strong>Autor:</strong> ${partes[1]}<br><strong>Libro:</strong> ${partes.slice(2).join('-')}` :
                obtenerParteFrase(fraseCompleta);
        }
    }

    // Resto del código...

});
