var getNumbers = 'http://127.0.0.1:5000/api/overall-numbers/';
var total;
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