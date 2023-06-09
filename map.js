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

// TODO: Neben dem Cityname noch den State hinzufügen, zum Beispiel: Denver, Colorado

// Finde den Zurücksetzen-Button
const resetMapButton = document.getElementById('resetMapButton');

// Füge einen Klick-Event-Listener zum Zurücksetzen-Button hinzu
resetMapButton.addEventListener('click', function () {
  // Setze die Karte auf ihre Ursprungskoordinaten zurück
  map.setView([37.8, -96], 4);
});

const clearMarkers = document.getElementById('deleteMarkers');

clearMarkers.addEventListener('click', function () {
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
  map.setView([37.8, -96], 4);
});
