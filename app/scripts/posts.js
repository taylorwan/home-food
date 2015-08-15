var React = require('react');

var Secrets= require('./secrets');
Parse.initialize(Secrets.getParseKey1(), Secrets.getParseKey2());

// var PostObject = Parse.Object.extend('Post');
// var user = Parse.User.current();

// console.log(user.toJSON());

// // SET OBJECT
// var postObj = new PostObject();
// postObj.set('name', 'Casserole');
// postObj.set('price', '2');
// postObj.set('unit', '100');
// postObj.set('availability', '2');
// postObj.set('foodType', 'American');
// postObj.set('user', user);


// // SAVE OBJECT
// postObj.save(null, {
//   success: function(res) {
//     var query = new Parse.Query(PostObject);
//     query.equalTo('user', user);
//     query.find({
//       success: function(res){
//         console.log('posted');
//       }
//     });
//   },
//   error: function(res) {
//     console.log(res);
//     console.log('not posted');
//   }
// });

var Post = React.createClass({
  render: function() {
    return (
      <li className="bg-info post">
      <h4 className="post-type pull-left">{this.props.name}</h4>
      <a href="#" className="pull-right order-this-item btn btn-primary btn-sm" data-toggle="modal" data-target="#orderItemModal">Order</a>
      <table className="table table-condensed">
      <tr className="price">
      <td className="heading">Price</td>
      <td className="value">$ {this.props.price}</td>
      </tr>
      <tr className="available">
      <td className="heading">Available</td>
      <td className="value">{this.props.availability}</td>
      </tr>
      <tr className="foodType">
      <td className="heading">Type</td>
      <td className="value">{this.props.foodType}</td>
      </tr>
      </table>
      </li>
    )
  }
});

var Posts = React.createClass({
  getInitialState: function() {
  return {
      posts: []
    };
  },
  componentDidMount: function() {
    new Parse.Query('Post').find().then(function(res) {
      res = res.map(function(el) { return el.toJSON(); });
      this.setState({
        posts: res
      });
      
    }.bind(this));
  },
  render: function() {
    var limit = this.props.limit || this.state.posts.length;
    return (
      <div className="content">
      <div className="container">
      <div className="row">
      <div className="col-md-12">
      <div className="all-posts">
      <h3 className="text-info">Recently Added</h3>
      <ul className="posts list-unstyled">
      { this.state.posts.slice(0, limit ).map(function(post, index) {
        return <Post {...post} key={index}/>
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

module.exports = Posts;
