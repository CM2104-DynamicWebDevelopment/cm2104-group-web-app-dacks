var getNumbers = 'http://kalzeo.pythonanywhere.com/api/overall-numbers/';
var totalInfected;
var suspected;
var cured;
var dead;
var severe;


$.getJSON(getNumbers, function(data)
{
	$.each(data, function(i, item)
	{
		total = data[i].totalCases;
		$("#infectedTotal").append(total);
		
		suspected = data[i].suspectedCases;
		cured = data[i].curedCases;
		dead = data[i].totalDead;
		severe = data[i].severeCases;
	});
});