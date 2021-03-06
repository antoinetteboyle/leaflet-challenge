//HOMEWORK LEAFLET-CHALLENGE

// Define layers
var satellitemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY,
  }
);

var darkmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY,
  }
);

var outdoorsmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY,
  }
);

// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Satelite": satellitemap,
  "Dark Map": darkmap,
  "Outdoors": outdoorsmap,
};

let earthquakes = new L.LayerGroup();
let faultlines = new L.LayerGroup();

// Create overlay object to hold our overlay layer
var overlayMaps = {
  "Faultlines": faultlines,
  "Earthquakes": earthquakes,
};

// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [satellitemap, earthquakes],
});

// Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
L.control
  .layers(baseMaps, overlayMaps, {
    collapsed: false,
  })
  .addTo(myMap);

// Store our API endpoint inside queryUrl
  //var start_time = "2022-02-04";
  //var end_time = "2022-02-10";
  //var queryUrl ="https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" + start_time + "&endtime=" + end_time;
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

 var geojson;

// Perform a GET request to the query URL
d3.json(url).then(function (data) {

  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 10;
  }

  function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

  geojson = L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng,{
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5,
          });
    },
    // We create a popup for each circleMarker to display the magnitude and location of the earthquake
    //  after the marker has been created and styled.
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "Magnitude: " +
          feature.properties.mag +
          "<br>Location: " +
          feature.properties.place
      );
    },
  }).addTo(earthquakes);

  // Then we add the earthquake layer to our map.
  earthquakes.addTo(myMap);

d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (faults) {

 L.geoJson(faults, {color: "red"}).addTo(faultlines);
 faultlines.addTo(myMap);
})

// Set up the legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");

  div.innerHTML += "<h4>Magnitude</h4>";
  
  categories = [' 0-1',' 1-2',' 2-3',' 3-4',' 4-5',' 5+'];
  legColor = ["#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"]

  for (var i = 0; i < categories.length; i++) {
  div.innerHTML += `<i style="background: ${legColor[i]}"></i><span> ${categories[i]}</span><br>`};

  return div;
};
// Adding legend to the map
legend.addTo(myMap);


});