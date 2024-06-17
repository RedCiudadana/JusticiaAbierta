document.addEventListener("DOMContentLoaded", function () {
    // Crear el mapa
    var map = L.map('map');

    // Añadir capa de mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Icono personalizado para las instituciones
    var institutionIcon = L.icon({
        iconUrl: '/ELEMENTOS/institucion.png', // Ruta del icono personalizado
        iconSize: [32, 32], // Tamaño del icono
        iconAnchor: [16, 32], // Punto del icono que corresponde a la ubicación del marcador
        popupAnchor: [0, -32] // Punto desde el cual se abrirá el popup
    });

    // Función para establecer la vista inicial y agregar el marcador de "Estas aquí"
    function setInitialView(lat, lon) {
        map.setView([lat, lon], 14); // Nivel de zoom 14 es aproximadamente 5 km

        // Agregar marcador "Estas aquí"
        var marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup('<b>Estás aquí</b>').openPopup();
    }

    // Geolocalización
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            setInitialView(lat, lon);
        }, function() {
            alert("No se pudo obtener su ubicación. Se utilizará la vista predeterminada.");
            setInitialView(15.7835, -90.2308); // Coordenadas centrales de Guatemala
        });
    } else {
        alert("Geolocalización no soportada por su navegador. Se utilizará la vista predeterminada.");
        setInitialView(15.7835, -90.2308); // Coordenadas centrales de Guatemala
    }

    // Datos de las instituciones
    var instituciones = [
        { nombre: "Ministerio Público", coordenadas: [14.6351, -90.5069	], url: "https://www.mp.gob.gt/" },
        { nombre: "Ministerio Público", coordenadas: [14.6345, -90.5464	], url: "https://www.mp.gob.gt/" },
        { nombre: "Ministerio Público MAIMI", coordenadas: [14.625, -90.5228], url: "https://www.mp.gob.gt/" },
        { nombre: "Mp", coordenadas: [14.6101, -90.5307	], url: "https://www.mp.gob.gt/" },
        { nombre: "MP DELITOS ADMINISTRATIVOS", coordenadas: [14.6342, -90.523], url: "https://www.mp.gob.gt/" },
        { nombre: "UNIDAD DE GAFETES MP", coordenadas: [14.6128, -90.5298], url: "https://www.mp.gob.gt/" },
        { nombre: "Fiscalia Metropolitana Mp", coordenadas: [14.626, -90.5222], url: "https://www.mp.gob.gt/" }
    ];

    // Función para agregar marcadores de instituciones
    instituciones.forEach(function(institucion) {
        var marker = L.marker(institucion.coordenadas, { icon: institutionIcon }).addTo(map);

        // Crear contenido del popup con un botón para redirigir
        var popupContent = `
            <div class="popup-content">
                <b>${institucion.nombre}</b><br>
                <button class="btn" onclick="window.location.href='${institucion.url}'">Ir a la página</button>
            </div>`;
        
        marker.bindPopup(popupContent);
    });
});
