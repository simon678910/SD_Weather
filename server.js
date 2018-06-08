//setting up for the openweathermap
const key = '6f0a0d476e913d7f62e149277ecc6289';
var url = `http://api.openweathermap.org/data/2.5/forecast?zip=92126,us&APPID=${key}`;

//setting up for request modules for connecting the openweatherap
var request = require('request');
//setting up express
var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/',function(req, res){
	request(url, function(err, response, body){		
		var data = JSON.parse(body);
		res.send(data);

	});
})

app.listen(3000, function(){

})
