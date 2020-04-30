// Variables to store the stats of the Coronavirus
var totalInfected;
var suspected;
var cured;
var dead;

// Run once the page DOM is ready to execute JS
$(document).ready(function()
{
	// Get the JSON returned from our custom API to get the overall stats of the Coronavirus
	$.getJSON('https://kalzeo.pythonanywhere.com/api/stats/', function(data)
	{
		// Store the stats of the Coronavirus in their respected variables
		total = data[0].totalCases;

		// Append the total to the number of infected string
		$("#infectedTotal").append(total);
		
		cured = data[0].curedCases;
		dead = data[0].totalDead;
	
	// Update the statistics modal with the number of cases, deaths and cured
        $('#statisticsModal .modal-body').append(`Confirmed Cases: ${total}<br>Confirmed Deaths: ${dead}<br>Confirmed Cured: ${cured}`);
	});
});
