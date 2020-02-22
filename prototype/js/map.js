var map;
var opened = false;

/**
 * Get the latitude and longitude coordinates for a given location
 * 
 * @param {any} locationDetails  - The location details object
 */
function getLatLng(locationDetails)
{  
    $.ajax(
    {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${locationDetails.name}&key=AIzaSyCRFhUZw7jPcsEiL_OcgfKXrfhbKVMBlzE&language=en`,
	    dataType: 'json',
	    success: function(data) 
        {
            try
            {
                // If no error is thrown, use the locations coordinates to plot a point on the map
                var path = data["results"]["0"]["geometry"]["location"];
                latLng = { lat: path['lat'], lng: path['lng'] };
                placeMarker(locationDetails, latLng);
            }

            catch (e)
            {
                // do nothing and continue
            }
	    }
	});
}

// Initialise the map
function initMap() 
{
    // Create the map and set its options
	map = new google.maps.Map(document.getElementById('map'), 
	{
        zoom: 2,
        minZoom: 2,
        center: new google.maps.LatLng(39.0742, 21.8243),
        mapTypeId: 'roadmap',
        scrollwheel: true,
		disableDefaultUI: true,
		fullscreenControl: true,
		styles: mapStyle
        });

    // Get the JSON returned from a specified URL	
    $.getJSON("http://kalzeo.pythonanywhere.com/api/location-data/", function(data)
    {
        /*
         * Loop through each of the entries in the JSON to generate an object to hold the details of each location.
         * Each location will be turned into its latitude and longitude coordinates to be plotted on the map.
        */ 
		$.each(data, function(i)
        {
            locationDetails = { name: data[i].place, confirmed: data[i].infected, cured: data[i].cured, dead: data[i].dead };
            getLatLng(locationDetails);
		});
    });

    // Set map bounds from Svalbard to Southern ocean
    var strictBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-82.8628, 135.0000),
        new google.maps.LatLng(77.8750, 20.9752)
        
    );

    // Listen for the dragend event
    map.addListener('dragend', function ()
    {
        if (strictBounds.contains(map.getCenter())) return;
        // We're out of bounds - Move the map back to center
        map.setCenter(new google.maps.LatLng(39.0742, 21.8243));
    });
}

/**
 * Place a marker on the map that will have it's own infowindow with unique information
 * when clicked.
 *
 * @param {any} locationDetails - The location details object
 * @param {any} latLng - The lat and longitude object for the location
 */
function placeMarker(locationDetails, latLng)
{
    // Create the marker and set it's options
    var marker = new google.maps.Marker({ position: { lat: latLng.lat, lng: latLng.lng }, map: map, icon: '../prototype/img/markericon.png' });

    // The content for the infowindow when the marker gets clicked
    var info = `Location: ${locationDetails.name}<hr>Confirmed Infections: ${locationDetails.confirmed}<br>People Cured: ${locationDetails.cured}<br>Deaths Caused: ${locationDetails.dead}`;
    var infoWindow = new google.maps.InfoWindow({ content: info });

    /*
    *   When a marker on the map gets clicked, open a infowindow.
    *
    *   If it's the first marker on the map being getting clicked - open a infowindow and save the state of
    *   the infowindow so that it can act as a previous state for closing future infowindows.
    *
    *   If a infowindow state has been saved and another marker gets pressed then close the state of the previous
    *   infowindow and set the state as the new infowindow that will be opened. Open the new infowindow after the
    *   previous one has been shut.
    */
    marker.addListener('click', function () {
        if (opened == false) {
            infoWindow.open(map, marker);
            previousWindow = infoWindow;
            opened = true
        }
        else {
            previousWindow.close();
            previousWindow = infoWindow;
            infoWindow.open(map, marker);
        }
    });

    // If the 'x' button is pressed on the markers infowindow then set opened to false
    infoWindow.addListener('closeclick', function ()
    {
        opened = false;
    });
}
