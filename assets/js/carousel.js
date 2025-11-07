// ========================================
// CARROUSEL DE IMÁGENES
// Hecho con JavaScript vanilla y arrays
// ========================================

// Array de imágenes con sus descripciones
// Aquí guardamos todas las imágenes que se mostrarán en el carrousel
const imagenes = [
    {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
        descripcion: 'Desarrollo Web Moderno'
    },
    {
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
        descripcion: 'Código Limpio y Eficiente'
    },
    {
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
        descripcion: 'Diseño Responsivo'
    },
    {
        url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
        descripcion: 'Tecnologías Modernas'
    },
    {
        url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800',
        descripcion: 'Innovación Digital'
    }
];

// Variable para saber qué imagen estamos mostrando actualmente
// Comenzamos en 0 (la primera imagen del array)
let indiceActual = 0;

// Obtenemos los elementos del HTML que vamos a manipular
const imagenElemento = document.getElementById('carouselImage');
const descripcionElemento = document.getElementById('carouselCaption');
const botonAnterior = document.getElementById('prevBtn');
const botonSiguiente = document.getElementById('nextBtn');
const contenedorDots = document.getElementById('carouselDots');

// ========================================
// FUNCIÓN: Mostrar una imagen específica
// ========================================
function mostrarImagen(indice) {
    // Actualizamos la imagen y su descripción
    imagenElemento.src = imagenes[indice].url;
    imagenElemento.alt = imagenes[indice].descripcion;
    descripcionElemento.textContent = imagenes[indice].descripcion;

    // Actualizamos los indicadores (puntos)
    actualizarDots(indice);
}

// ========================================
// FUNCIÓN: Ir a la siguiente imagen
// ========================================
function siguienteImagen() {
    // Incrementamos el índice
    indiceActual++;

    // Si pasamos la última imagen, volvemos a la primera (circular)
    if (indiceActual >= imagenes.length) {
        indiceActual = 0;
    }

    // Mostramos la nueva imagen
    mostrarImagen(indiceActual);
}

// ========================================
// FUNCIÓN: Ir a la imagen anterior
// ========================================
function anteriorImagen() {
    // Decrementamos el índice
    indiceActual--;

    // Si estamos antes de la primera imagen, vamos a la última (circular)
    if (indiceActual < 0) {
        indiceActual = imagenes.length - 1;
    }

    // Mostramos la nueva imagen
    mostrarImagen(indiceActual);
}

// ========================================
// FUNCIÓN: Ir a una imagen específica
// ========================================
function irAImagen(indice) {
    indiceActual = indice;
    mostrarImagen(indiceActual);
}

// ========================================
// FUNCIÓN: Crear los indicadores (puntos)
// ========================================
function crearDots() {
    // Recorremos el array de imágenes
    for (let i = 0; i < imagenes.length; i++) {
        // Creamos un elemento div para cada punto
        const dot = document.createElement('div');
        dot.className = 'dot';

        // Si es el primer punto, lo marcamos como activo
        if (i === 0) {
            dot.classList.add('active');
        }

        // Cuando hacen click en un punto, vamos a esa imagen
        dot.addEventListener('click', function() {
            irAImagen(i);
        });

        // Agregamos el punto al contenedor
        contenedorDots.appendChild(dot);
    }
}

// ========================================
// FUNCIÓN: Actualizar los indicadores
// ========================================
function actualizarDots(indiceActivo) {
    // Obtenemos todos los puntos
    const dots = document.querySelectorAll('.dot');

    // Recorremos todos los puntos
    dots.forEach(function(dot, indice) {
        // Quitamos la clase 'active' de todos
        dot.classList.remove('active');

        // Agregamos 'active' solo al punto actual
        if (indice === indiceActivo) {
            dot.classList.add('active');
        }
    });
}

// ========================================
// EVENTOS: Conectamos los botones
// ========================================

// Cuando hacen click en el botón "Anterior"
botonAnterior.addEventListener('click', anteriorImagen);

// Cuando hacen click en el botón "Siguiente"
botonSiguiente.addEventListener('click', siguienteImagen);

// ========================================
// ROTACIÓN AUTOMÁTICA (Opcional)
// ========================================

// Cambia automáticamente la imagen cada 5 segundos
let intervaloAutomatico = setInterval(siguienteImagen, 5000);

// Si el usuario interactúa, detenemos la rotación automática
botonAnterior.addEventListener('click', function() {
    clearInterval(intervaloAutomatico);
});

botonSiguiente.addEventListener('click', function() {
    clearInterval(intervaloAutomatico);
});

// ========================================
// INICIALIZACIÓN
// ========================================

// Cuando la página carga, mostramos la primera imagen y creamos los puntos
mostrarImagen(0);
crearDots();
