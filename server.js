//setting up for the openweathermap
const key = '6f0a0d476e913d7f62e149277ecc6289';
const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?zip=92126,us&units=imperial&APPID=${key}`;
var currentURL = `http://api.openweathermap.org/data/2.5/weather?zip=92126,us&units=imperial&APPID=${key}`;

//setting up for request modules for connecting the openweatherap
var request = require('request');
//setting up express
var express = require('express');
var app = express();


/* Main functions ==================================================*/
app.get('/',function(req, res){

	/* Access the Openweathermap forecast data */
	request(forecastURL, function(forecastErr, forecastRes, forecastBody){		
		if(!forecastErr){
			/* Access the Openweathermap current weather data */
			request(currentURL, function(currentErr, currentRes,
				currentBody){	
				if(!currentErr){
					/* Put the response from api to JSON */
					var fiveData = JSON.parse(forecastBody);
					var currentData = JSON.parse(currentBody);

					/* Return a JSON file with current and forecast data*/
					res.send(createJson(fiveData, currentData));
				}
			});
		}
	});

})

/* listen to the port 8080 */
app.listen(8080, function(){

})

/* Custome Objects ========================================= */

/* forecast data */
function fiveDayData(min, max, humidity, description, icon){
	this.fiveMin = min;
	this.fiveMax = max;
	this.fiveDescription = description;
	this.fiveHumidity = humidity;
	this.fiveIcon = icon;
}

/* current weather data */
function todayData(min, max, humidity, description, icon){
	this.min = min;
	this.max = max;
	this.description = description;
	this.humidity = humidity;
	this.icon = icon;
}

/* Helper functions ==============================================*/

/* Create a single functon using both forcast and current weather data*/
/* input: fiveSetsOfData oneSetsOfData
 * output: {
 *		"fiveMin": []
 *		"fiveMax": []
 *		"fiveDescription": []
 *		"fiveHumidity": []
 *		"fiveIcon": []
 *		"min": []
 *		"max": []
 *		"description": []
 *		"humidity": []
 *		"icon": []
 * 	   }
 */
function createJson(fiveData, currentData){
	/* init variables */
	var min = [];
	var max = [];
	var humidity = [];
	var description = [];
	var icon = [];
	var currentMin;
	var currentMax;
	var currentHumidity;
	var currentDescription;
	var currentIcon;

	/* Process the forecast data */
	/* The api result have 5days, every 3 hour's data, totoal a 40 sets of data, we want data for each day, so 40/5 = 8 */
	for(i = 0; i < fiveData.list.length/8; i++){
		min.push(fiveData.list[i*8].main.temp_min);
		max.push(fiveData.list[i*8].main.temp_max);
		humidity.push(fiveData.list[i*8].main.humidity);
		description.push(fiveData.list[i*8].weather[0].description);
		icon.push(fiveData.list[i*8].weather[0].icon);
	}

	/* Process the current weather data */
	currentMin = currentData.main.temp_min;
	currentMax = currentData.main.temp_max;
	currentHumidity = currentData.main.humidity;
	currentDescription = currentData.weather[0].description;
	currentIcon = currentData.weather[0].icon;
	
	/* Putting data into the custom objects */
	var fiveJson = new fiveDayData(min, max, humidity, description, icon);
	var currentJson = new todayData(currentMin, currentMax, currentHumidity, currentDescription, currentIcon);

	return JSON.stringify(combineJson(fiveJson, currentJson));
}


/* Combine two Objects into one object*/
/* intput: object1, obejct2
 * output: {object1, object2}
 */
function combineJson(first, second){
	var result = {};
	result = Object.assign( first, second);
	return result;
	
}
