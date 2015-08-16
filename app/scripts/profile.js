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

var transition = function() {
  $('.collapse').collapse("hide");
  return true;
};

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
      console.log(res);
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
    console.log(this.props.name);
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
