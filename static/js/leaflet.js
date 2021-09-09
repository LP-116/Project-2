var myMap = L.map("map", {
    center: [-37.840935, 144.946457],
    zoom: 10
  });

var outdoorLayer =L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 12,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1IjoibWpqb2huc29uOTQiLCJhIjoiY2tzcGx5eTI0MDRrMjJvcTR5dXJvYW9lbSJ9._mU94YuzAPKe6OVDEhkzKg"
  }).addTo(myMap);


var incidentsURL = "/api/v1.0/map2"


  function circleColor(qty)  {
    switch (true) {
    case (qty >= 10000):
        return "#ff0000";
    case (qty > 5000):
        return "#ff8000";
    case (qty > 2000):
        return "#ffbf00";
    case (qty > 1000):
        return "#ffff00";
    case (qty > 500):
        return "#bfff00";
    case (qty > 200):
        return "#66ff8c";
    case (qty > 0):
        return "#66ff8c";
    
    }

}

function legendColor(d) {
    return d > 10000 ? '#ff0000' :
           d > 5000 ? '#ff8000' :
           d > 2000  ? '#ffbf00' :
           d > 1000  ? '#ffff00' :
           d > 500  ? '#bfff00':
           d > 200  ? '#66ff8c':
                    '#66ff8c';

}

function incidents(data) {


        for (var i = 0; i < data.length; i++) {
           L.circle([data[i][2],data[i][3]], {
                weight: 0.4,
                color: "black",
                fillColor: circleColor(data[i][4]),
                fillOpacity: 0.7,
                radius: 800
            }).addTo(myMap);
    }; 

}





d3.json("/api/v1.0/map2").then(function(data) {


    for (var i = 0; i < data.length; i++) {
      var incidents = L.circle([data[i][2],data[i][3]], {
            weight: 0.4,
            color: "black",
            fillColor: circleColor(data[i][4]),
            fillOpacity: 0.7,
            radius: 800
        }).addTo(myMap);
        }

    var baseMaps = {
        "Outdoors": outdoorLayer
        }

    var overlayMaps = {
        Incidents: incidents
        };

    L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);

})


var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 200, 500, 1000, 2000, 5000, 10000],
      labels = [];
  
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML += 
              '<div><i style="background:' + legendColor(grades[i] + 1) + '"></i> ' + 
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+' +'</div>');
  }
  
  return div;
  };

legend.addTo(myMap);

