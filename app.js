var braintree = require('braintree');
var express = require('express');
var morgan = require('morgan');
var util = require('util');
var app = express();
var bodyParser = require('body-parser');

var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'xnwy4w9cm8cnjng7',
    publicKey:    'rm8t9mbvn3rf3zsz',
    privateKey:   '1fa2f95bd1a0690de2af5c4553c26849'
});

//Twilio Credentials 
var accountSid = 'ACfc927d066ae91adf7dd19dbbe9b9ba46'; 
var authToken = '1a0808c3d8ef65fe063518d7b492a48b'; 
 
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
    to:'+13472608289', 
    from: '+13478942961', 
    body: 'word to your mother.' 
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