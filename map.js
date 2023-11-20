'use strict';

// Karte anzeigen
let map = L.map('map', {
  center: [37.8, -96],
  zoom: 4,
});

// Hinzufügen der Kartenlayer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

// Funktion zum Markieren einer Stadt und Anzeigen der aktuellen Uhrzeit
function markCity(lat, lng, cityName) {
  var marker = L.marker([lat, lng]).addTo(map);
  map.setView([lat, lng], 10);

  marker.on('mouseover', function () {
    var timezoneUrl =
      'https://api.timezonedb.com/v2.1/get-time-zone?key=2JERXS8XSKOC&format=json&by=position&lat=' +
      lat +
      '&lng=' +
      lng;

    fetch(timezoneUrl)
      .then(response => response.json())
      .then(data => {
        var currentTime = new Date().toLocaleTimeString('de-DE', {
          timeZone: data.zoneName,
        });

        var locationText = cityName;
        if (data.state || data.state_code) {
          locationText += ', ' + (data.state || data.state_code);
        }

        marker.bindTooltip(locationText + '<br>' + currentTime).openTooltip();

        var updateTooltipTime = function () {
          currentTime = new Date().toLocaleTimeString('de-DE', {
            timeZone: data.zoneName,
          });
          marker.setTooltipContent(locationText + '<br>' + currentTime);
        };

        // Aktualisiere die Uhrzeit alle 1 Sekunde
        var tooltipInterval = setInterval(updateTooltipTime, 1000);

        marker.on('mouseout', function () {
          clearInterval(tooltipInterval);
          marker.unbindTooltip();
        });
      })
      .catch(error => alert(error));
  });
}

// Eventlistener für die Suchleiste
document.getElementById('search').addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    // Wenn die Eingabetaste gedrückt wird
    e.preventDefault();
    var query = this.value;
    searchCity(query);
  }
});

// Funktion zum Suchen einer Stadt und Markieren
function searchCity(query) {
  var geocodeUrl =
    'https://api.opencagedata.com/geocode/v1/json?q=' +
    encodeURIComponent(query) +
    '&key=0c5d895755e046b8bedb0d3fc72c0ce2';

  fetch(geocodeUrl)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        var city = data.results[0];
        var lat = city.geometry.lat;
        var lng = city.geometry.lng;
        var cityName =
          city.components.city ||
          city.components.town ||
          city.components.village;
        markCity(lat, lng, cityName);
      } else {
        alert('City not found');
      }
    })
    .catch(error => alert(error));
}

// Default View Funktionalität
// Finde den Zurücksetzen-Button
let resetMapButton = document.getElementById('resetMapButton');

// Setze die Karte auf ihre Ursprungskoordinaten zurück
let resetMap = function() {
  map.setView([37.8, -96], 4)
}

// eventListener wenn der Button "Default View" geklickt wird
resetMapButton.addEventListener('click', resetMap);

// eventListener, wenn die Taste "V" geklickt wird
document.addEventListener('keydown', function (e) {
  if (e.code === 'KeyV') {
    resetMap()
  }
});


//Delete Markers Funktionalität
// Finde den Delete Markers Button
const clearMarkersButton = document.getElementById('deleteMarkers');

//Lösche alle Marker und gehe in den default View
let clearMarkers = function() {
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
  resetMap();
}

// eventListener wenn der Button "Delete Markers" geklickt wird
clearMarkersButton.addEventListener('click', clearMarkers);

// eventListener, wenn die Taste "D" geklickt wird
document.addEventListener('keydown', function(e) {
  if (e.code === 'KeyD') {
   clearMarkers()
  }
})
