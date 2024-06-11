function initMap() {
    const center = { lat: 15.783471, lng: -90.230759 }; // Centro de Guatemala

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: center,
    });

    const institutions = [
        { name: "Centro de Atención Integral para Mujeres", lat: 14.634915, lng: -90.506882 },
        { name: "Fundación Sobrevivientes", lat: 14.634993, lng: -90.506821 },
        // Añade más instituciones aquí
    ];

    institutions.forEach((institution) => {
        const marker = new google.maps.Marker({
            position: { lat: institution.lat, lng: institution.lng },
            map: map,
            title: institution.name,
        });

        const infowindow = new google.maps.InfoWindow({
            content: `<h2>${institution.name}</h2><p>Servicios ofrecidos...</p>`,
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });

        // Añadir círculo de 5km de radio alrededor de cada institución
        const circle = new google.maps.Circle({
            map: map,
            radius: 5000, // 5 km en metros
            fillColor: '#AA0000',
            strokeColor: '#AA0000',
            strokeOpacity: 0.35,
            strokeWeight: 2,
        });
        circle.bindTo('center', marker, 'position');
    });
}
