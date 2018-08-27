// An app to display the weather forecast for the next 4 days
// Jamie Mattocks 

var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
const api_key = ''; // Your api key
const location_id = '310094';						    // location_id could be retreived from client but I've hardcoded it

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(bodyParser.json({ type: 'application/json' }));  

// Landing page
app.get('/', (req, res) => {
  res.render('index');
});


// Test page
// Server side request for api data, can also be done, I've done it client side for convenience. 
// But a post request from the client will get the same data
app.post('/test', (req, res) => {
	var options = {url: 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/' +
		location_id +
		'?res=daily&' + 
		'key=' +
		api_key,
		headers: {
			'Content-Type': 'application/json'
		}};
	request(options, (error, response, body) => {
			console.log('error: ', error);
			console.log('status code: ', response && response.statusCode);
			// console.log('body: ', body); 								// Displays the data in the console
			body = JSON.parse(body);
			res.setHeader('Content-Type', 'application/json');
			res.send(body);
		});
});

app.get('/test', (req, res) => {
	res.render('index');
});


app.listen(8080, 'localhost')
app.listen(8080, '192.168.0.16');
console.log('Server ready on 8080');