(function() {
    const lat = 43.7181228;
    const lng = -79.5428666;
    const mapa = L.map('mapa').setView([lat, lng ], 16);
    let marker;

    //Utilizar provider y geocoder:
    const geocodeService = L.esri.Geocoding.geocodeService();
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //El Pin:
     marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true

    })
    .addTo(mapa)
    

    //Detectar el Movimiento del pin:
    marker.on('moveend', function(e){
    marker = e.target
    const posicion = marker.getLatLng();
    mapa.panTo(new L.LatLng(posicion.lat , posicion.lng))

        //Obtener la informacion de las calles al soltar el  pin :
        geocodeService.reverse().latlng(posicion, 16).run(function(error , resultado){
            marker.bindPopup(resultado.address.LongLabel)
        })

    })


})()
