var React = require('react');
var Posts = require('./posts');
var Orders = require('./orders');

var React = require('react');

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
  render: function() {
    return (
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="profile-img-holder">
                <img src="img/t.jpg" className="img-responsive img-circle text-center"/>
              </div>
            </div>
          </div>
        </div>
        <Posts limit={3}/>
        <Orders limit={3}/>
      </div>
    )
  }
});

module.exports = Profile;