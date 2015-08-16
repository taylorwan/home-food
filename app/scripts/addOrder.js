var React = require('react');
var Router = require('react-router');
var Posts = require('./posts');

var Secrets = require('./secrets');
Parse.initialize(Secrets.getParseKey1(), Secrets.getParseKey2());

var AddOrder = React.createClass({
  getInitialState: function() {
    return {user: Parse.User.current() };
  },
  handleAddOrderClick: function() {

  },
  componentDidMount: function() {
    var id = this.props.params.id;
    console.log(id);
    console.log()
    var query = new Parse.Query("Post");
    query.equalTo("objectId", id);
    post = {}
    query.find().then(function(res) {
      console.log(res);
      res = res.map(function(el) {
        if(el.get('imageFile')) el.set('imageLink', el.get('imageFile').url());
        return el.toJSON();
      });
      this.setState({
        post: res
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
                <tr className="foodName">
                <td className="heading">Cuisine</td>
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
                <input type="text" id="order-item-date" className="form-control" placeholder="Delivery Date" />
                <input type="text" id="order-item-time" className="form-control" placeholder="Delivery Time" />
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
