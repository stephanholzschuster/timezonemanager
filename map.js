'use strict';

 // Karte anzeigen
let map = L.map('map', {
  center: [37.8, -96],
  zoom: 4
})

// Hinzufügen der Kartenlayer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);


   // Funktion zum Markieren einer Stadt und Anzeigen der aktuellen Uhrzeit
   function markCity(lat, lng, cityName) {
    var marker = L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng], 10);

    marker.on('mouseover', function () {
      var timezoneUrl = 'https://api.timezonedb.com/v2.1/get-time-zone?key=2JERXS8XSKOC&format=json&by=position&lat=' + lat + '&lng=' + lng;

      fetch(timezoneUrl)
        .then(response => response.json())
        .then(data => {
          var currentTime = new Date().toLocaleTimeString('de-DE', { timeZone: data.zoneName });
          marker.bindTooltip(cityName + '<br>' + currentTime).openTooltip();

          var updateTooltipTime = function () {
            currentTime = new Date().toLocaleTimeString('de-DE', { timeZone: data.zoneName });
            marker.setTooltipContent(cityName + '<br>' + currentTime);
          };

          // Aktualisiere die Uhrzeit alle 1 Sekunde
          var tooltipInterval = setInterval(updateTooltipTime, 1000);

          marker.on('mouseout', function () {
            clearInterval(tooltipInterval);
            marker.unbindTooltip();
          });
        })
        .catch(error => console.log(error));
    });
  }

  // Eventlistener für die Suchleiste
  document.getElementById('search').addEventListener('keydown', function (e) {
    if (e.keyCode === 13) { // Wenn die Eingabetaste gedrückt wird
      e.preventDefault();
      var query = this.value;
      searchCity(query);
    }
  });

  // Funktion zum Suchen einer Stadt und Markieren
  function searchCity(query) {
    var geocodeUrl = 'https://api.opencagedata.com/geocode/v1/json?q=' + encodeURIComponent(query) + '&key=0c5d895755e046b8bedb0d3fc72c0ce2';

    fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          var city = data.results[0];
          var lat = city.geometry.lat;
          var lng = city.geometry.lng;
          var cityName = city.components.city || city.components.town || city.components.village;
          markCity(lat, lng, cityName);
        } else {
          console.log('Stadt nicht gefunden');
        }
      })
      .catch(error => console.log(error));
  }