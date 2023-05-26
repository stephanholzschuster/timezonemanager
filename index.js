   // Funktion zum Abrufen der aktuellen Uhrzeit
    function getCurrentTime(offset) {
      var date = new Date();
      var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
      var nd = new Date(utc + (3600000 * offset));
      return nd.toLocaleString();
    }

    // Uhrzeit für jede Stadt aktualisieren
    function updateClocks() {
      document.getElementById('san-francisco-time').textContent = getCurrentTime(-8);
      document.getElementById('denver-time').textContent = getCurrentTime(-7);
      document.getElementById('dallas-time').textContent = getCurrentTime(-6);
      document.getElementById('new-york-time').textContent = getCurrentTime(-5);
    }

    // Aktualisiere die Uhrzeiten alle 1 Sekunde
    setInterval(updateClocks, 1000);