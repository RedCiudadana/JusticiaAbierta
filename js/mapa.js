document.addEventListener("DOMContentLoaded", function () {
    // Crear el mapa
    var map = L.map('map');

    // Añadir capa de mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

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
        { nombre: "Ministerio Público", coordenadas: [14.6351, -90.5069], tipo: 'refugios', horarios: 'Lunes - Viernes 9 am a 5pm', contacto: '24781347', url: "https://www.mp.gob.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Ministerio Público", coordenadas: [14.6345, -90.5464], tipo: 'asesoría legal', horarios: 'Lunes - Viernes 9 am a 5pm', contacto: '24781347', url: "https://www.mp.gob.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Ministerio Público MAIMI", coordenadas: [14.625, -90.5228], tipo: 'centros de salud', horarios: 'Lunes - Viernes 9 am a 5pm', contacto: '24781347', url: "https://www.mp.gob.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Mp", coordenadas: [14.6101, -90.5307], tipo: 'refugios', horarios: 'Lunes - Viernes 9 am a 5pm', contacto: '24781347', url: "https://www.mp.gob.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "MP DELITOS ADMINISTRATIVOS", coordenadas: [14.6342, -90.523], tipo: 'asesoría legal', horarios: 'Lunes - Viernes 9 am a 5pm', contacto: '24781347', url: "https://www.mp.gob.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "UNIDAD DE GAFETES MP", coordenadas: [14.6128, -90.5298], tipo: 'centros de salud', horarios: 'Lunes - Viernes 9 am a 5pm', contacto: '24781347', url: "https://www.mp.gob.gt/", imagen: "/ELEMENTOS/institucion.png" },
        { nombre: "Fiscalia Metropolitana Mp", coordenadas: [14.626, -90.5222], tipo: 'centros de salud', horarios: 'Lunes - Viernes 9 am a 5pm', contacto: '24781347', url: "https://www.mp.gob.gt/", imagen: "/ELEMENTOS/institucion.png" }
    ];

    // Variable para almacenar los marcadores
    var markers = [];

    // Función para agregar marcadores de instituciones
    function addMarkers(filter) {
        // Eliminar marcadores existentes
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        // Agregar marcadores según el filtro
        instituciones.forEach(function(institucion) {
            if (filter === 'todos' || institucion.tipo === filter) {
                // Crear icono personalizado
                var customIcon = L.icon({
                    iconUrl: institucion.imagen, // Ruta del icono personalizado
                    iconSize: [32, 32], // Tamaño del icono
                    iconAnchor: [16, 32], // Punto del icono que corresponde a la ubicación del marcador
                    popupAnchor: [0, -32] // Punto desde el cual se abrirá el popup
                });

                var marker = L.marker(institucion.coordenadas, { icon: customIcon }).addTo(map);
                var popupContent = `
                    <div class="popup-content">
                        <img src="${institucion.imagen}" alt="${institucion.nombre}" style="width: 30px; height: 30px; margin-bottom:5px"><br>
                        <b>${institucion.nombre}</b><br>
                        <b>Tipo:</b> ${institucion.tipo}<br>
                        <b>Horarios de Atención:</b> ${institucion.horarios}<br>
                        <b>Contacto:</b> ${institucion.contacto}<br>
                        <button class="btn2" onclick="window.location.href='${institucion.url}'">Ir a la página</button>
                    </div>`;
                marker.bindPopup(popupContent);
                markers.push(marker);
            }
        });
    }

    // Agregar los marcadores iniciales (mostrar todos)
    addMarkers('todos');

    // Manejar el cambio en el filtro
    document.getElementById('tipo-institucion').addEventListener('change', function() {
        var filter = this.value;
        addMarkers(filter);
    });
});
