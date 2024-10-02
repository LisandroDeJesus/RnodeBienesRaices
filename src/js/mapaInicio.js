(function(){

        // Logical Or
        const lat =  7.88782;
        const lng =  -67.47236;
        const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapa);

       
})()