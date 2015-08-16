var React = require('react');
var Router = require('react-router');
var Posts = require('./posts');

var Secrets = require('./secrets');
Parse.initialize(Secrets.getParseKey1(), Secrets.getParseKey2());

var AddOrder = React.createClass({
  mixins : [Router.Navigation],
  getInitialState: function() {
    return {
      user: Parse.User.current().get('username'),
      post: []
    };
  },
  createOrder: function(name, buyer, seller, price, quantity) {
    var total = price * quantity;
    var Order = Parse.Object.extend('Order');
    var user = Parse.User.current();
    var order = new Order();

    var query = new Parse.Query(Parse.User);
    query.equalTo("username", seller).find().then((res) => {
      order.set('name', name);
      order.set('buyerUser', user);
      order.set('sellerUser', res[0]);
      order.set('buyer', buyer);
      order.set('seller', seller);
      order.set('price', price);
      order.set('quantity', quantity);
      order.set('total', total);

      order.save(null, {
        success: (res) => {
          console.log('order made');
          this.transitionTo('payment', {foodId: this.props.params.id});
        },
        error: (res) => {
          console.log(res.toJSON());
          console.log('order not made');
        }
      });
    });
  },
  handleAddOrderClick: function() {
    var name = this.state.post.name;
    var buyer = this.state.user;
    var seller = this.state.post.madeby;
    var price = this.state.post.price;
    var quantity = $('#order-item-quantity').val();

    this.createOrder(name, buyer, seller, price, quantity);
  },
  componentDidMount: function() {
    var id = this.props.params.id;
    var query = new Parse.Query("Post");
    query.equalTo("objectId", id);
    query.find().then(function(res) {
      res = res.map(function(el) {
        if(el.get('imageFile')) el.set('imageLink', el.get('imageFile').url());
        return el.toJSON();
      });
      this.setState({
        post: res[0]
      });

    }.bind(this));
  },
  render: function() {
    return (
      <div className="content">
      <div className="container">
      <div className="row">
      <div className="col-md-12">
      <h3 className="text-info">Order</h3>
      <div className="order-item-info">
      <table className="table table-condensed">
      <tr className="buyer">
      <td className="heading">Buyer</td>
      <td className="value">{this.state.user}</td>
      </tr>
      <tr className="seller">
      <td className="heading">Seller</td>
      <td className="value">{this.state.post.madeby}</td>
      </tr>
      <tr className="foodName">
      <td className="heading">Name</td>
      <td className="value">{this.state.post.name}</td>
      </tr>
      <tr className="price">
      <td className="heading">Price</td>
      <td className="value">$ {this.state.post.price}</td>
      </tr>
      <tr className="available">
      <td className="heading">Quantity Available</td>
      <td className="value">{this.state.post.quantity} {this.state.post.unit}</td>
      </tr>
      <tr className="notice">
      <td className="heading">Prior Days Needed: </td>
      <td className="value">{this.state.post.notice} Days</td>
      </tr>
      </table>
      </div>
      <form className="order-item-form">
      <input type="text" id="order-item-quantity" className="form-control" placeholder="Quantity" />
      <input type="button" className="btn btn-primary" onClick={this.handleAddOrderClick} value="Add" />
      </form>
      </div>
      </div>
      </div>
      </div>
    )
  }
});

module.exports = AddOrder;
