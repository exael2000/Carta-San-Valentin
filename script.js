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

    // Lista para almacenar las frases
    const frasesList = [];

    botonCerrar.innerText = 'Cerrar';
    botonCerrar.addEventListener('click', cerrarCarta);

    frasesBtn.addEventListener('click', abrirPanelFrases);
    cerrarFrasesBtn.addEventListener('click', cerrarPanelFrases);

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

    function abrirPanelFrases() {
        frasesPanel.style.display = 'block';
        frasesCargadasDiv.innerHTML = '';

        fetch('frases.txt')
            .then(response => response.text())
            .then(data => {
                const frasesArray = data.split('\n');
                frasesArray.forEach((frase, index) => {
                    frasesList.push(frase);
                    agregarFraseAlDOM(frase, index);
                });
            })
            .catch(error => console.error('Error cargando frases:', error));
    }

    function cerrarPanelFrases() {
        frasesPanel.style.display = 'none';
    }

    function agregarFraseAlDOM(frase, index) {
        const fraseContainer = document.createElement('div');
        fraseContainer.dataset.index = index;

        const fraseDiv = document.createElement('div');
        fraseDiv.innerText = obtenerParteFrase(frase);

        fraseContainer.appendChild(fraseDiv);
        frasesCargadasDiv.appendChild(fraseContainer);

        fraseContainer.addEventListener('click', function () {
            console.log(`Evento clic en frase: "${frase}"`);
            alternarFraseAutorTitulo(fraseContainer);
        });
    }

    function obtenerParteFrase(fraseCompleta) {
        const partes = fraseCompleta.split('-');
        return partes[0];
    }

    function alternarFraseAutorTitulo(contenedor) {
        const index = contenedor.dataset.index;

        if (index !== undefined && frasesList[index]) {
            const fraseCompleta = frasesList[index];
            const partes = fraseCompleta.split('-');

            if (partes.length >= 3) {
                if (contenedor.classList.contains('mostrarAutorTitulo')) {
                    // Cambiar a solo frase
                    const fraseDiv = contenedor.querySelector('div');
                    fraseDiv.innerText = obtenerParteFrase(fraseCompleta);
                    contenedor.classList.remove('mostrarAutorTitulo');
                } else {
                    // Cambiar a autor y título
                    const nuevoContenido = document.createElement('div');
                    nuevoContenido.innerHTML = `${partes[1]} - ${partes[2]}`;
                    contenedor.innerHTML = ''; // Limpiar el contenido actual
                    contenedor.appendChild(nuevoContenido);
                    contenedor.classList.add('mostrarAutorTitulo');
                }
            }
        }
    }
});
