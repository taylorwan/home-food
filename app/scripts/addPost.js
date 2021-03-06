var React = require('react');
var Router = require('react-router');
var Posts = require('./posts');

var Secrets = require('./secrets');
Parse.initialize(Secrets.getParseKey1(), Secrets.getParseKey2());

var AddPost = React.createClass({
  mixins : [Router.Navigation],
  getInitialState: function() {
    return {user: Parse.User.current() };
  },
  createPost: function(name, type, price, unit, city, notice, quantity, imageFile) {
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
    postObj.set('madeby', user.get('username'));
    
    var parseFile = new Parse.File(user.get('username'), imageFile);
    parseFile.save().then(function() {
      console.log('file saved');
      postObj.set('imageFile', parseFile);


    }, function(error) {
      console.log('file not saved');

    }).then( () => {
      postObj.save(null, {
        success: (res) => {
          // console.log(res.toJSON());
          console.log('posted');
          this.transitionTo('posts');

        },
        error: function(res) {
          // console.log(res.toJSON());
          console.log('not posted');
        }
      });
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
    var imageFile = document.getElementById("add-post-image-file");

    if (name + type + price + unit + city + notice + quantity === "") alert('empty field');
    else if (imageFile.files.length === 0) alert('need to upload delicious food picture');
    else { this.createPost(name, type, price, unit, city, notice, quantity, imageFile.files.item(0)); }


  },
  render: function() {
    return (
      <div>
        <div className="container-fluid banner" id="addpost-banner">
          <h1>I heard you make a mean...</h1>
        </div>
        <div className="container-fluid postForm">
          <form className="create-post-form">
            <input type="text" id="add-post-name" className="form-control" placeholder="Food Name" />
            <input type="text" id="add-post-type" className="form-control" placeholder="Food Type" />
            <input type="text" id="add-post-price" className="form-control" placeholder="Price (per unit)" />
            <input type="text" id="add-post-unit" className="form-control" placeholder="Unit (i.e. lbs, tamale)" />
            <input type="text" id="add-post-city" className="form-control" placeholder="Your City" />
            <input type="text" id="add-post-notice" className="form-control" placeholder="Days of notice (i.e. 2)" />
            <input type="text" id="add-post-quantity" className="form-control" placeholder="Quantity" />
            <div className="form-control">
              <input type="file" id="add-post-image-file"/>
            </div>
            <input type="button" className="btn btn-primary" onClick={this.handleAddPostClick} value="Add" />
          </form>
        </div>
      </div>

    )
  }
});

module.exports = AddPost;
