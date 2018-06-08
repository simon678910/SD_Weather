//setting up for the openweathermap
const key = '6f0a0d476e913d7f62e149277ecc6289'
var url = `http://api.openweathermap.org/data/2.5/forecast?q=SanDiego,us&APPID=${key}`

//setting up express
var express = require('express')
var app = express()

//setting up 
