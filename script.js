/* server's url*/
const url = "http://localhost:3000";

/* Row number */
const rMax = 2
const rMin = 3
const rHumidity = 4


$(document).ready(function(){

	$.get(url, function(data, status){
		var weatherData = JSON.parse(data);
		initDates();
		setMax(weatherData);
		setMin(weatherData);
		setHumidity(weatherData);

	})
	.fail(function(request, status, error){
		alert(status);
	});
});

/* Helper function for getting the dates and construct to the mm/dd/yyyy structure
   Input: an integer i days
   Output: the mm/dd/yyyy string after i days of current day
*/

function constructDate(days){
	var date = new Date();
	date.setDate(date.getDate() + days);
	return (date.getMonth()+1)+'/'+(date.getDate())+'/'+date.getFullYear();
}

/* Initialize the today's date and the following 5days */
function initDates(){
	/*Total have a 6 days*/
	for(i = 0; i < 6;i++){
		if(i == 0)
			$("#today").text(constructDate(i));
		else
			$("#future tr:first-child th:nth-child("+ i + ")").text(constructDate(i));
	}
}
function setMax(data){
	for(i = 0; i < 5; i++){
		$("#future tr:nth-child(" + rMax + ") th:nth-child(" + (i+1) + ")")
		.text(data.max[i]);
	}
}

function setMin(data){
	for(i = 0; i < 5; i++){
		$("#future tr:nth-child(" + rMin + ") th:nth-child(" + (i+1) + ")")
		.text(data.min[i]);
	}
}
function setHumidity(data){
	for(i = 0; i < 5; i++){
		$("#future tr:nth-child(" + rHumidity + ") th:nth-child(" + (i+1) + ")")
		.text(data.humidity[i]);
	}
}
