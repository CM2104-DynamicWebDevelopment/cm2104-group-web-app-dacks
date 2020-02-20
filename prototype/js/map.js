var map;

function getLatLng(locationDetails)
{  
    var geocodeAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationDetails.name}&key=AIzaSyCRFhUZw7jPcsEiL_OcgfKXrfhbKVMBlzE&language=en`;
    var latLng = null;

	$.ajax({
      url: geocodeAPI,
	  dataType: 'json',
	  success: function(data) 
      {
          try
          {
              var path = data["results"]["0"]["geometry"]["location"];
              latLng = { lat: path['lat'], lng: path['lng'] };
              placeMarker(locationDetails, latLng);
          }
          catch (e)
          {
              // do nothing
          }
	  }
	});
}


function initMap() 
{
	map = new google.maps.Map(document.getElementById('map'), 
	{
		zoom: 3,
        center: new google.maps.LatLng(39.0742, 21.8243),
		mapTypeId: 'roadmap',
		disableDefaultUI: true,
		fullscreenControl: true,
		styles: mapStyle
	});
	
    $.getJSON("http://kalzeo.pythonanywhere.com/api/location-data/", function(data)
	{
		$.each(data, function(i)
        {
            locationDetails = { name: data[i].place, confirmed: data[i].infected, cured: data[i].cured, dead: data[i].dead };
            getLatLng(locationDetails);
		});
	});
}

function placeMarker(locationDetails, latLng)
{
    var marker = new google.maps.Marker({ position: { lat: latLng.lat, lng: latLng.lng }, map: map, icon: '../prototype/img/markericon.png' });

    var info = `Location: ${locationDetails.name}<hr>Confirmed Infections: ${locationDetails.confirmed}<br>People Cured: ${locationDetails.cured}<br>Deaths Caused: ${locationDetails.dead}`;
    var infoWindow = new google.maps.InfoWindow({ content: info });

    marker.addListener('click', function ()
    {
        infoWindow.open(map, marker);
    });
}
