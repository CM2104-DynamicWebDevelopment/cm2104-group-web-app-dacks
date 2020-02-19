var map;
var getLocations = 'http://127.0.0.1:5000/api/location-data/';
var opened;
var image1 = 'C:/Users/ixkal/Desktop/cm2104-group-web-app-dacks-master/final/img/map-icon.png';
var infoWindowsOpenCurrently;// A temporarily variable to save currently opened info window

function getLatLng(city)
{  
	var urlz= "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyCRFhUZw7jPcsEiL_OcgfKXrfhbKVMBlzE&language=en";
	
	var latLng = null;
	$.ajax({
	  url: urlz,
	  dataType: 'json',
	  async: false,
	  success: function(data) 
	  {
		var path = data["results"]["0"]["geometry"]["location"];
		latLng = {lat: path['lat'], lng: path['lng']};
	  }
	});
	
	return latLng
}

function initMap() 
{
	map = new google.maps.Map(document.getElementById('map'), 
	{
		zoom: 3,
		center: new google.maps.LatLng(38.9697, 59.5563),
		mapTypeId: 'roadmap',
		scaleControl: false,
		disableDefaultUI: true,
		fullscreenControl: true,
		styles: mapStyle
	});
	
	$.getJSON(getLocations, function(data)
	{
		$.each(data, function(i, item)
		{
			var name = data[i].place;
			var confirmed = data[i].infected;
			var cured = data[i].cured;
			var dead = data[i].dead;
			
			var latLng = getLatLng(name);
			var marker = new google.maps.Marker({position: {lat:latLng.lat, lng:latLng.lng}, map: map, icon: image1});
			
			var info = `Location: ${name}<hr>Confirmed Infections: ${confirmed}<br>People Cured: ${cured}<br>Deaths Caused: ${dead}`;
		    var infoWindow = new google.maps.InfoWindow({content: info});
			
			marker.addListener('click', function()
			{
				infoWindow.open(map, marker);
			});
		});
	});
}