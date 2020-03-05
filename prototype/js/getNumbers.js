// Variables to store the stats of the Coronavirus
var totalInfected;
var suspected;
var cured;
var dead;
var severe;

// Run once the page DOM is ready to execute JS
$(document).ready(function()
{
	// Get the JSON returned from our custom API to get the overall stats of the Coronavirus
	$.getJSON('https://kalzeo.pythonanywhere.com/api/stats/', function(data)
	{
		// Store the stats of the Coronavirus in their respected variables
		total = data[0]["totalCases"];

		// Append the total to the number of infected string
		$("#infectedTotal").append(total);

		suspected = data[0].suspectedCases;
		cured = data[0].curedCases;
		dead = data[0].totalDead;
		severe = data[0].severeCases;
	});
});
