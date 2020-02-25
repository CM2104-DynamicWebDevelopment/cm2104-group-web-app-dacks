var totalInfected;
var suspected;
var cured;
var dead;
var severe;


$.getJSON('http://kalzeo.pythonanywhere.com/api/stats/', function(data)
{
	$.each(data, function(i)
	{
		total = data[i].totalCases;
		$("#infectedTotal").append(total);
		
		suspected = data[i].suspectedCases;
		cured = data[i].curedCases;
		dead = data[i].totalDead;
		severe = data[i].severeCases;
	});
});