var React = require('react');
var Router = require('react-router');
var Posts = require('./posts');
var Profile = require('./profile');
var AddPost = require('./addPost');
var Secrets = require('./secrets');
var Order = require('./order');
// import Secrets from './secrets';
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

Parse.initialize(Secrets.getParseKey1(), Secrets.getParseKey2());

var transition = function() {
  $('.collapse').collapse("hide");
  return true;
}
var Header = React.createClass({
  render: function() {
    return (
      <header className="navbar navbar-static-top bs-docs-nav" id="top" role="banner">
        <div className="container">
          <div className="navbar-header row">
            <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-navbar" aria-controls="bs-navbar" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand col-md-2" onClick={transition}>HomeFood</Link>
          </div>
          <nav id="bs-navbar" className="collapse navbar-collapse">
            { !Parse.User.current() ?
              <ul className="nav navbar-nav">
                <li><a href="" data-toggle="modal" data-target="#loginModal">Login</a></li>
                <li><Link to="posts" onClick={transition}>Browse Food</Link></li>
              </ul>:
              <ul className="nav navbar-nav">
                <li><Link to="posts" onClick={transition}>Browse Food</Link></li>
                <li><Link to="addPost" onClick={transition}>Post Food</Link></li>
                <li><Link to="profile" onClick={transition}>Profile</Link></li>
                <li><a href="" onClick={this.props.logout}>Logout</a></li>
              </ul>
            }
          </nav>
        </div>
      </header>
    )
  }
})

var LoginModal = React.createClass({
  getInitialState: function() {
    return {username: '', password: ''}
  },
  handleUsernameChange: function(event) {
    this.setState({username: event.target.value});
  },
  handlePasswordChange: function(event) {
    this.setState({password: event.target.value});
  },
  handleSubmit: function(event) {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
  },
  render: function() {
    return (
      <div className="modal fade login-modal" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="loginModalLabel">Log in</h4>
              <form id="login" onSubmit={this.handleSubmit}>
                <input type="text" className="form-control" placeholder="Username" onChange={this.handleUsernameChange}/>
                <input type="password" className="form-control" placeholder="Password" onChange={this.handlePasswordChange}/>
                <button type="submit" className="btn btn-primary">Log in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
});


var Home = React.createClass({
  render: function() {
    return (
      <div className="content">
        <div className="jumbotron container">
          <div className="row">
            <div className="col-md-12">
              <h1>Homemade delicacies, delivered.</h1>
              { Parse.User.current() ? null : <a href="#" className="btn btn-lg" data-toggle="modal" data-target="#loginModal">Get Started</a> }
            </div>
          </div>
        </div>
        <Posts limit={3}/>
      </div>
    )
  }
});

var App = React.createClass({
  mixins : [Router.Navigation],
  getInitialState: function() {
    return {user: Parse.User.current() }
  },
  componentDidMount: function() {
    $.get('/client_token', function(clientToken) {
      braintree.setup(clientToken, "dropin", {
        container: "payment-form"
      });
    })
  },
  login: function(username, password) {
    Parse.User.logIn(username, password, {
      success: function(user) {
        $('#loginModal').modal('hide');
        $('.collapse').collapse("hide");
        this.forceUpdate();
      }.bind(this),
      error: function(user, error) {
        
      }
    });
  },
  logout: function() {
    Parse.User.logOut();
    this.transitionTo('/');
  },
  render: function() {
    return (
      <div>
        <Header logout={this.logout}/>
        <RouteHandler user={this.state.user}/>
        <LoginModal login={this.login} />
      </div>
    )
  }
});

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} />
    <Route name="posts" handler={Posts} />
    <Route name="profile" handler={Profile} />
    <Route name="food" path="food/:id" handler={Order} />
    <Route name="addPost" handler={AddPost} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
