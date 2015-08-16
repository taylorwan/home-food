var React = require('react');

var sample = [{
  name: 'Tamales',
  price: '$3/unit',
  qty: '20',
  ddate: '09/20/15'
}];


var Order = React.createClass({
      // order.set('buyerUser', user);
      // order.set('sellerUser', res[0]);
      // order.set('buyer', buyer);
      // order.set('seller', seller);
      // order.set('price', price);
      // order.set('quantity', quantity);
      // order.set('total', total);
  render: function() {
    return (
      <li className="bg-info order">
        <h4 className="order-type">{this.props.name}</h4>
        <table className="table table-condensed">
          <tr className="price">
            <td className="heading">Buyer</td>
            <td className="value">{this.props.buyer}</td>
          </tr>
          <tr className="price">
            <td className="heading">Seller</td>
            <td className="value">{this.props.seller}</td>
          </tr>
          <tr className="price">
            <td className="heading">Price</td>
            <td className="value">{this.props.price}</td>
          </tr>
          <tr className="quantity">
            <td className="heading">Quantity</td>
            <td className="value">{this.props.quantity}</td>
          </tr>
          <tr className="total">
            <td className="heading">Total</td>
            <td className="value">{this.props.total}</td>
          </tr>
          <tr className="created-date">
            <td className="heading">Delivery</td>
            <td className="value">{this.props.createdAt}</td>
          </tr>
        </table>
      </li>
    )
  }
});

var Orders = React.createClass({
  getInitialState: function() {
    return {
      orders: []
    }
  },
  componentDidMount: function() {
    new Parse.Query('Order').find().then(function(res) {
      res = res.map(function(el) { return el.toJSON(); });
      this.setState({
        orders: res
      });

    }.bind(this));
  
  },
  render: function() {
    var limit = this.props.limit || this.state.orders.length;
    return (
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="all-orders">
                <h3 className="text-info">Recent Orders</h3>
                <ul className="orders list-unstyled">
                  { this.state.orders.slice(0, limit ).map(function(order, index) {
                    return <Order {...order} key={index}/>
                  }) }
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
});

module.exports = Orders;
