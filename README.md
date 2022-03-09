# leaflet-challenge

United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

visualise their earthquake data. They collect a massive amount of data from all over the world each day, visualise their data will allow them to better educate the public and other government organisations (and hopefully secure more funding..) on issues facing our planet.

GitHub repository, the folder names to correspond to the challenges: **Leaflet-Step-1** and **Leaflet-Step-2**.

### Level 1: Basic Visualisation

Your first task is to visualise an earthquake data set.

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualise. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualisation.

https://earthquake.usgs.gov/fdsnws/event/1/application.json
{"type":"FeatureCollection","metadata":{"generated":1646699233000,"url":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson","title":"USGS Significant Earthquakes, Past Day","status":200,"api":"1.10.3","count":0},"features":[]}

**Import & Visualise the Data**

   Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

   * Your data markers should reflect the magnitude of the earthquake in their size and colour. Earthquakes with higher magnitudes should appear larger and darker in colour.

   * Include popups that provide additional information about the earthquake when a marker is clicked.

   * Create a legend that will provide context for your map data.

   * Your visualisation should look something like the map above.

   ### Level 2: More Data (Optional)

![5-Advanced](Images/5-Advanced.png)

The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in a second data set and visualise it along side your original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

In this step we are going to..

* Plot a second data set on our map.

* Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.

* Add layer controls to our map.
