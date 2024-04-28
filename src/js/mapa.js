(function() {
    const lat = 51.9279573;
    const lng = 4.4084277;
    const mapa = L.map('mapa').setView([lat, lng ], 16);
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);


})()
