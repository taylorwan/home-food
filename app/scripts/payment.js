var React = require('react');
var Router = require('react-router');
//var Secrets = require('./secrets');
// Parse.initialize(Secrets.getParseKey1(), Secrets.getParseKey2());

var Payment = React.createClass({
  mixins : [Router.Navigation],
  getInitialState: function() {
    return {item: null};
  },
  componentDidMount: function() {

    var foodId = this.props.params.foodId;
    var userId = Parse.User.current().id;

    var query = new Parse.Query('Post');
    query.equalTo("objectId", foodId);
    query.find({
      success: (results) => {
        this.setState({item: results[0]});
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

    $.get('/client_token', (clientToken) => {
      braintree.setup(clientToken, "dropin", {
        container: "payment-form",
        paymentMethodNonceReceived: () => {
          var item = this.state.item;
          item.set("quantity", (parseInt(item.get("quantity")) - 1).toString());
          console.log(item.get("quantity"));
          item.save();
          this.transitionTo('profile');
        }
      });
    })
  },
  render: function() {
    return (
      <form id="checkout" method="post" action="/checkout">
        <div id="payment-form"></div>
        {this.state.item ? 
          <input className="green-button" type="submit" value={"pay $" + this.state.item.get("price")}/> : 
          <input className="green-button" type="submit" value={"pay $$$"}/>
        }
      </form>
    )
  }
});

module.exports = Payment;

