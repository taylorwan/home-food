var React = require('react');

var sample = [{
  name: 'Tamales',
  price: '$3/unit',
  qty: '20',
  ddate: '09/20/15'
}];


var Order = React.createClass({
  render: function() {
    return (
      <li className="bg-info order">
        <h4 className="order-type">Fruit</h4>
        <table className="table table-condensed">
          <tr className="price">
            <td className="heading">Price</td>
            <td className="value">{this.props.price}</td>
          </tr>
          <tr className="quantity">
            <td className="heading">Quantity</td>
            <td className="value">{this.props.qty}</td>
          </tr>
          <tr className="total">
            <td className="heading">Total</td>
            <td className="value">{this.props.qty}*{this.props.price}</td>
          </tr>
          <tr className="delivery-date">
            <td className="heading">Delivery</td>
            <td className="value">{this.props.ddate}</td>
          </tr>
        </table>
      </li>
    )
  }
});

var Orders = React.createClass({
  getInitialState: function() {
    return {orders: sample}
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