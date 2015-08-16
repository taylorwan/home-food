var React = require('react');
var Posts = require('./posts');
var Orders = require('./orders');

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

var Profile = React.createClass({
  getInitialState: function() {
    return {user: Parse.User.current() };
  },
  render: function() {
    return (
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="profile-img-holder">
                <img src="images/t.jpg" className="img-responsive img-circle text-center"/>
              </div>
            </div>
          </div>
        </div>
        <Posts limit={3} orderable={false} />
        <Orders limit={3}/>
      </div>
    )
  }
});

module.exports = Profile;