// Creating map object
var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 4
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
   // Grab the data with d3
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson").then(function(response) {

  var markers = L.markerClusterGroup();
  var quakeArray = [];

    // Loop through data's response
    for (var i = 0; i < response.length; i++) {
    // Set each earthquake location features to a variable

      var location = response[i].features;
  
      // Check for i earthquake cordinates
      if(typeof location === 'undefined'){
        // element does not exist
        console.log("undefined") 
      }
  
      else {
        if(typeof location.geometry.coordinates[0] === 'undefined'){
          console.log(location[0])
        }
        if(typeof location.geometry.coordinates[1] === 'undefined'){
          console.log(location[1])
        }
        if(location.geometry.coordinates[0] != null && location.geometry.coordinates[1] != null && location.geometry.coordinates.length >= 2){

         quakeArray.push([location.geometry.coordinates[1], location.geometry.coordinates[0]]);
          // Add a new marker to the cluster group and bind a pop-up
         markers.addLayer(L.marker(location.geometry.coordinates[1], location.geometry.coordinates[0])
         .bindPopup(location.properties.title)).addTo(myMap);
         console.log("bindingpopup");
        }
      }  
      
    }
    // Add our marker cluster layer to the map
  //myMap.addLayer(markers);
  
  });
  