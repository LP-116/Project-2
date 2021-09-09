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

d3.csv("data-2 copy.csv").then(function(data) {

var markerClusters = L.markerClusterGroup();

for ( var i = 0; i < data.length; ++i )
{
  var m = L.marker( [data[i].Latitude, data[i].Longitude] )
  markerClusters.addLayer( m );
}

myMap.addLayer( markerClusters );
})

