// An app to display the weather forecast for the next 4 days
// Jamie Mattocks 

var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
const api_key = '98e621b0-231d-4ddd-bbe8-5a1a1e7ff48b'; // Your api key


app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded());  

// Landing page
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api', (req, res) => {
  console.log(req.body.location_id);
	var options = {url: 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/' +
			req.body.location_id +
			'?res=daily&' + 
			'key=' +
			api_key,
			headers: {
				'Content-Type': 'application/json'
			}};
	request(options, (error, response, body) => {
		console.log('error: ', error);
		console.log('status code: ', response && response.statusCode);
		console.log('body: ', body);
		body = JSON.parse(body);
		res.setHeader('Content-Type', 'application/json');
		res.send(body);
	});
})

// app.post('/test', (req, res) => {
// 	var options = {url: 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/' +
// 		location_id +
// 		'?res=daily&' + 
// 		'key=' +
// 		api_key,
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}};
// 	request(options, (error, response, body) => {
// 			console.log('error: ', error);
// 			console.log('status code: ', response && response.statusCode);
// 			// console.log('body: ', body); 								// Displays the data in the console
// 			body = JSON.parse(body);
// 			res.setHeader('Content-Type', 'application/json');
// 			res.send(body);
// 		});
// });

// app.get('/test', (req, res) => {
// 	res.render('index');
// });


app.listen(process.env.PORT, 3000)
console.log('Server ready');
