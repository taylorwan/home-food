var React = require('react');
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
  getInitialState: function() {
    return {user: Parse.User.current() };
  },
  render: function() {
    return (
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <form className="create-post-form">
                <input type="text" className="form-control" placeholder="Food Name" />
                <input type="text" className="form-control" placeholder="Food Type" />
                <input type="text" className="form-control" placeholder="Price (per unit)" />
                <input type="text" className="form-control" placeholder="Unit (i.e. lbs, tamale)" />
                <input type="text" className="form-control" placeholder="Your City" />
                <input type="text" className="form-control" placeholder="Days of notice (i.e. 2)" />
                <button type="submit" className="btn btn-primary"/>Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = AddPost;