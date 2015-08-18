var braintree = require('braintree');
var express = require('express');
var morgan = require('morgan');
var util = require('util');
var app = express();
var bodyParser = require('body-parser');

var gateway = '<braintree>';

//Twilio Credentials 
var accountSid = '<sid>'; 
var authToken = '<token>'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 

//app.use(morgan('combined'));
app.use('/', express.static('dist'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

var phoneHash  = {};
// Routes 
app.get('/client_token', function(req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});



app.post('/message', function(req, res) {
  console.log(req.body);

  client.sendMessage({
    to: req.body.toNumber, 
    from: '+13478942961', 
    body: req.body.message
  }, function(err, responseData) { 
    if (!err) { 
      console.log(responseData.from); 
      console.log(responseData.body); 
    }
  });

  client.sendMessage({
    to: req.body.fromNumber, 
    from: '+13478942961', 
    body: 'You ordered on HomeFood!'
  }, function(err, responseData) { 
    if (!err) { 
      console.log(responseData.from); 
      console.log(responseData.body); 
    }
  });
  res.end();
})

app.post('/checkout', function (req, res) {
  var nonce = req.body.payment_method_nonce;
  gateway.transaction.sale({
	  amount: '10.00',
	  paymentMethodNonce: nonceFromTheClient,
  }, function (err, result) {

	});
  // Use payment method nonce here
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Listening to port ' + port);
});
