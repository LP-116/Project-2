var myMap = L.map("map", {
  center: [-37.840935, 144.946457],
  zoom: 10
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 12,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: "pk.eyJ1IjoibWpqb2huc29uOTQiLCJhIjoiY2tzcGx5eTI0MDRrMjJvcTR5dXJvYW9lbSJ9._mU94YuzAPKe6OVDEhkzKg"
}).addTo(myMap);

d3.csv("data-1.csv").then(function(data) {

  locationArray = [];

  var result = data.forEach(data => locationArray.push([data.Latitude, data.Longitude]))

  locationArray=locationArray.filter(x=>x[0]&x[1])
      
    var heat = L.heatLayer(locationArray, {
      radius: 4,
      blur: 1,
      // max: 0.5,
      // gradient: {0: "green",0.2: "green",0.4: "yellow",0.6: "#ffc800",0.8: "#ffff00",1: "red"}
  
    }).addTo(myMap);
  
  
  })


    



