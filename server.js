//setting up for the openweathermap
const key = '6f0a0d476e913d7f62e149277ecc6289';
var url = `http://api.openweathermap.org/data/2.5/forecast?zip=92126,us&units=imperial&APPID=${key}`;

//setting up for request modules for connecting the openweatherap
var request = require('request');
//setting up express
var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/',function(req, res){
	/* Access the Openweathermap website */
	request(url, function(err, response, body){		
		/* Get the data into a json file */
		var data = JSON.parse(body);
		res.send(createJson(data));
	});
})

function fiveDayData(min, max, humidity, description, icon){
	this.min = min;
	this.max = max;
	this.description = description;
	this.humidity = humidity;
	this.icon = icon;
}

function createJson(data){
	var min = [];
	var max = [];
	var humidity = [];
	var description = [];
	var icon = [];
	for(i = 0; i < data.list.length/8; i++){
		min.push(data.list[i*8].main.temp_min);
		max.push(data.list[i*8].main.temp_max);
		humidity.push(data.list[i*8].main.humidity);
		description.push(data.list[i*8].weather[0].description);
		icon.push(data.list[i*8].weather[0].icon);
	}
	var dataJson = JSON.stringify(new fiveDayData(min, max, humidity, description, icon));
	return dataJson;
}
app.listen(3000, function(){

})
