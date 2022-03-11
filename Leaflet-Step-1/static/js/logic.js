//HOMEWORK LEAFLET-CHALLENGE

// Define streetmap and darkmap layers
var streetmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
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

// var streetmap = L.tileLayer(
//   "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
//   {
//     attribution:
//       "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY,
//   }
// );

// Define a baseMaps object to hold our base layers
var baseMaps = {
  //"Satelite": satelite,
  //"GreyScale": greyScale,
  "Street Map": streetmap,
  "Dark Map": darkmap,
  //"Outdoors": outdoors,
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
  layers: [streetmap, earthquakes],
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
var queryUrl =
  "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";
  
  var geojson;

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {

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

 L.geoJson(faults, {color: "#000000"}).addTo(faultlines);
 faultlines.addTo(myMap);
})

/*Legend specific*/
// Set up the legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var limits = geojson.options.limits;
  var colors = geojson.options.colors;
  var labels = [];
  // Add min & max
  var legendInfo = "<h1>Median Income</h1>" +
    "<div class=\"labels\">" +
      "<div class=\"min\">" + limits[0] + "</div>" +
      "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    "</div>";
  div.innerHTML = legendInfo;
  limits.forEach(function(limit, index) {
    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  });
  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};
// Adding legend to the map
legend.addTo(myMap);
/*Legend end*/

});
