/* server's url*/
const url = "http://localhost:8080";
const iconURL = "http://openweathermap.org/img/w/";

/* Row number */
const rDescription = 2;
const rIcon = 3;
const rMax = 4;
const rMin = 5;
const rHumidity = 6;


$(document).ready(function(){

	/* Using ajax to connect the nodejs server */
	$.get(url, function(data, status){
		/*Get the server's reponse to the JSON*/
		var weatherData = JSON.parse(data);
		initDates();
		setDescription(weatherData);
		setIcon(weatherData);
		setMax(weatherData);
		setMin(weatherData);
		setHumidity(weatherData);

	})
	.fail(function(request, status, error){
		alert(status);
	});
});


/* Update the UI ====================================================
   Since Jquery using CSS selector, the first index is 1 instead of 0*/

/* Initialize the today's date and the following 5days */
function initDates(){
	/*Total have  6 days*/
	for(i = 0; i < 6;i++){
		if(i == 0)
			$("#today").text(constructDate(i)).append("(current weather)");
		else
			$("#future tr:first-child th:nth-child("+ (i+1) + ")").text(constructDate(i));
	}
}

/* Set the description of the table */
function setDescription(data){
	for(i = 0; i < 5; i++){
		$("#future tr:nth-child(" + rDescription + ") th:nth-child(" + (i+2) + ")")
		.text(data.fiveDescription[i]);
	}
	$("#current tr:nth-child(" + rDescription + ") th").text(data.description);
}

function setIcon(data){
	for(i = 0; i < 5; i++){
		$("#future tr:nth-child(" + rIcon + ") th:nth-child(" + (i+2) + ") img")
		.attr("src", iconURL + data.fiveIcon[i] + ".png");
	}
	$("#current tr:nth-child(" + rIcon + ") img").attr("src", iconURL + data.icon + ".png");
}
function setMax(data){
	for(i = 0; i < 5; i++){
		$("#future tr:nth-child(" + rMax + ") th:nth-child(" + (i+2) + ")")
		.text(data.fiveMax[i]);
	}
	$("#current tr:nth-child(" + rMax + ") th").append(data.max);
}

function setMin(data){
	for(i = 0; i < 5; i++){
		$("#future tr:nth-child(" + rMin + ") th:nth-child(" + (i+2) + ")")
		.text(data.fiveMin[i]);
	}
	$("#current tr:nth-child(" + rMin + ") th").append(data.min);
}
function setHumidity(data){
	for(i = 0; i < 5; i++){
		$("#future tr:nth-child(" + rHumidity + ") th:nth-child(" + (i+2) + ")")
		.text(data.fiveHumidity[i]);
	}
	$("#current tr:nth-child(" + rHumidity + ") th").append(data.humidity);
}

/* Helper function ================================================*/

/* Get the dates and construct to the mm/dd/yyyy structure
   Input: an integer i days
   Output: the mm/dd/yyyy string after i days of current day
*/
function constructDate(days){
	var date = new Date();
	date.setDate(date.getDate() + days);
	return (date.getMonth()+1)+'/'+(date.getDate())+'/'+date.getFullYear();
}
