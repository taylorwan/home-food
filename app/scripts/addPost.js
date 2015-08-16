var React = require('react');
var Router = require('react-router');
var Posts = require('./posts');

var Secrets = require('./secrets');
Parse.initialize(Secrets.getParseKey1(), Secrets.getParseKey2());

var samplePosts = [{
  name: 'Tamales',
  price: '$3/unit',
  availability: '2 days notice'
}, {
  name: 'Tamales',
  price: '$3/unit',
  availability: '2 days notice'
}];

var sampleOrders = [{
  name: 'Tamales',
  price: '$3/unit',
  qty: '20',
  ddate: '09/20/15'
}];

var AddPost = React.createClass({
  mixins : [Router.Navigation],
  getInitialState: function() {
    return {user: Parse.User.current() };
  },
  createPost: function(name, type, price, unit, city, notice, quantity) {
    var PostObject = Parse.Object.extend('Post');
    var user = Parse.User.current();
    var postObj = new PostObject();

    postObj.set('name', name);
    postObj.set('foodType', type);
    postObj.set('price', price);
    postObj.set('unit', unit);
    postObj.set('city', city);
    postObj.set('notice', notice);
    postObj.set('quantity', quantity);
    postObj.set('user', user);

    postObj.save(null, {
      success: function(res) {
        // console.log(res.toJSON());
        console.log('posted');
        this.transitionTo('posts');

      }.bind(this),
      error: function(res) {
        // console.log(res.toJSON());
        console.log('not posted');
      }
    });

  },
  handleAddPostClick: function() {
    var name = $('#add-post-name').val();
    var type = $('#add-post-type').val();
    var price = $('#add-post-price').val();
    var unit = $('#add-post-unit').val();
    var city = $('#add-post-city').val();
    var notice = $('#add-post-notice').val();
    var quantity = $('#add-post-quantity').val();

    if (name + type + price + unit + city + notice + quantity === "") alert('empty field');
    else { this.createPost(name, type, price, unit, city, notice, quantity); }


  },
  render: function() {
    return (
      <div className="content">
      <div className="container">
      <div className="row">
      <div className="col-md-12">
      <form className="create-post-form">
      <input type="text" id="add-post-name" className="form-control" placeholder="Food Name" />
      <input type="text" id="add-post-type" className="form-control" placeholder="Food Type" />
      <input type="text" id="add-post-price" className="form-control" placeholder="Price (per unit)" />
      <input type="text" id="add-post-unit" className="form-control" placeholder="Unit (i.e. lbs, tamale)" />
      <input type="text" id="add-post-city" className="form-control" placeholder="Your City" />
      <input type="text" id="add-post-notice" className="form-control" placeholder="Days of notice (i.e. 2)" />
      <input type="text" id="add-post-quantity" className="form-control" placeholder="Quantity" />
      <input type="button" className="btn btn-primary" onClick={this.handleAddPostClick}>Add</input>
      </form>
      </div>
      </div>
      </div>
      </div>
    )
  }
});

module.exports = AddPost;
