var React = require('react');
var Posts = require('./posts');
var Orders = require('./orders');

var Secrets = require('./secrets');
Parse.initialize(Secrets.getParseKey1(), Secrets.getParseKey2());

var Post = React.createClass({
  render: function() {
    return (
      <li className="bg-info post container-fluid">
      <div className="row">
      <div className="col-md-12">
      <h4 className="post-type pull-left">{this.props.name}</h4>
      {
        this.props.orderable ?
        <Link to="addOrder" className="pull-right button" params={{id: this.props.objectId}} onClick={transition}> Order</Link> : null
      }
      </div>
      <div className="post-image col-md-4">
      <img src={this.props.imageLink} className="img-responsive"/>
      </div>
      <table className="table-condensed col-md-8">
      <tr className="foodType">
      <td className="heading">Cuisine</td>
      <td className="value">{this.props.foodType}</td>
      </tr>
      <tr className="price">
      <td className="heading">Price</td>
      <td className="value">$ {this.props.price}</td>
      </tr>
      <tr className="available">
      <td className="heading">Quantity Available</td>
      <td className="value">{this.props.quantity} {this.props.unit}</td>
      </tr>
      <tr className="notice">
      <td className="heading">Prior Days Needed: </td>
      <td className="value">{this.props.notice} Days</td>
      </tr>
      <tr className="city">
      <td className="heading">City </td>
      <td className="value">{this.props.city}</td>
      </tr>
      <tr className="user">
      <td className="heading">Made by </td>
      <td className="value">{this.props.madeby}</td>
      </tr>
      </table>
      </div>
      </li>
    )
  }
});


var Profile = React.createClass({
  getInitialState: function() {
    return {
      user: Parse.User.current(),
      posts: []
    };
  },
  componentDidMount: function() {
    var user = Parse.User.current();
    var query = new Parse.Query('Post');
    query.equalTo('user', user);
    query.find().then(function(res) {
      res = res.map(function(el) {
        if(el.get('imageFile')) el.set('imageLink', el.get('imageFile').url());
        return el.toJSON();
      });
      this.setState({
        posts: res
      });

    }.bind(this));
  },
  render: function() {

    var limit = this.props.limit || this.state.posts.length;
    var orderable = this.props.orderable;
    if (orderable === undefined) {
      orderable = true;
    }
    return (
      <div className="content">
      <div className="container">
      <div className="row">
      <div className="col-md-12">

      <h3 className="text-info">Food By You</h3>
      <div className="profile-img-holder">
      <img src="images/t.jpg" className="img-responsive img-circle text-center"/>
      </div>

      <ul className="posts list-unstyled">
      { this.state.posts.slice(0, limit ).map(function(post, index) {
        return <Post {...post} key={index}/>
      }) }
      </ul>
      </div>
      </div>
      </div>

      <Orders limit={3}/>
      </div>
    )
  }
});

module.exports = Profile;
