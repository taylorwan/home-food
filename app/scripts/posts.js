var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Secrets= require('./secrets');
Parse.initialize(Secrets.getParseKey1(), Secrets.getParseKey2());


var transition = function() {
  $('.collapse').collapse("hide");
  return true;
};

var Post = React.createClass({
  render: function() {
    if (this.props.madeby === Parse.User.current().get("username")) {
      this.props.orderable = false;
    }
    if (this.props.orderable) {
      return (
        <li className="bg-info post container-fluid">
        <div className="row">
        <div className="col-md-12">
        <h4 className="post-type pull-left">{this.props.name}</h4>
        <Link to="addOrder" className="pull-right button" params={{id: this.props.objectId}} onClick={transition}> Order</Link>
        </div>
        <div className="post-image col-md-4 col-xs-12">
        <img src={this.props.imageLink} className="img-responsive"/>
        </div>
        <table className="table-condensed col-md-8 col-xs-12">
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
    } else {
      return (
        <div className="empty-div"></div>
      )
    }
  }
});

var Posts = React.createClass({
  getInitialState: function() {
    return {
      posts: []
    }
  },
  componentDidMount: function() {
    new Parse.Query('Post').find().then(function(res) {
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
          <div className="container-fluid banner" id="welcome">
            <h1>Got a craving?</h1>
          </div>
          <ul className="posts list-unstyled">
            { this.state.posts.slice(0, limit ).map(function(post, index) {
              return <Post {...post} key={index} orderable={orderable}/>
            }) }
          </ul>
        </div>
      </div>
    )
  }
});

module.exports = Posts;
