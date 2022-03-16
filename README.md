# leaflet-challenge

United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

They collect a massive amount of data from all over the world each day, visualise their data will allow them to better educate the public and other government organisations (and hopefully secure more funding..) on issues facing our planet.

Created a GitHub repository, and folder named **Leaflet-Step-2** to corresponds to the advanced challenge.
The main code can be found at [logic.js](/Leaflet-Step-2/static/js/logic.js).
The visualisation is available here [index.html](/index.html).
The url for this earthquake feed is "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

### Level 1: Basic Visualisation

The first task was to visualise an earthquake data set.

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visited the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and picked one data set to visualise. When we clicked on a data set, 'All Earthquakes from the past week', were given a JSON representation of that data. I used the URL of this JSON to pull in the data for our visualisation.

**Imported & Visualised the Data**

  I created a map using Leaflet that plots all of the earthquakes from earthquakes data set based on their longitude and latitude.

   * the data markers reflect the magnitude of the earthquake in their size and colour. Earthquakes with higher magnitudes appear larger and darker in colour.

   * Included popups that provide additional information about the earthquake when a marker is clicked.

   * Created a legend that provides context for map data.

### Level 2: More Data

* The USGS wanted second data set plot on the map to illustrate the relationship between tectonic plates and seismic activity. I pulled in a second data set and visualised it along side the original set of data. Data on tectonic plates were found at <https://github.com/fraxen/tectonicplates>.

* Added a number of base maps to choose from as well as separated out different data sets into overlays that could be turned on and off independently.

* Added layer controls to the map.
