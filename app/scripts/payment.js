var React = require('react');

var Payment = React.createClass({
  componentDidMount: function() {
    $.get('/client_token', function(clientToken) {
      braintree.setup(clientToken, "dropin", {
        container: "payment-form",
        paymentMethodNonceReceived: function() {
          console.log('received');
        }
      });
    })

    var foodId = this.props.params.id;
    var userId = this.props.params.userId;

    var query = new Parse.Query(Parse.User);
    query.equalTo("objectId", userId);
    query.find({
      success: function(results) {
        console.log(results);
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

    var query2 = new Parse.query("Post");
    query2.equalTo("objectId", foodId);
    query2.find({
      success: function(results) {
        console.log(results);
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  },
  render: function() {
    return (
      <form id="checkout" method="post" action="/checkout">
        <div id="payment-form"></div>
        <input className="green-button" type="submit" value={"pay $" + 1}/>
      </form>
    )
  }
});

module.exports = Payment;

