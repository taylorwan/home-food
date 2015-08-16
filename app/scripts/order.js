var React = require('react');

var Order = React.createClass({
  componentDidMount: function() {
    $.get('/client_token', function(clientToken) {
      braintree.setup(clientToken, "dropin", {
        container: "payment-form"
      });
    })
  },
  render: function() {
    return (
      <form id="checkout" method="post" action="/checkout">
        <div id="payment-form"></div>
        <input className="green-button" type="submit" value="Pay $10"/>
      </form>
    )
  }
});

module.exports = Order;