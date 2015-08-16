var React = require('react');
var Router = require('react-router');
var Posts = require('./posts');
var Profile = require('./profile');
var AddPost = require('./addPost');
var AddOrder = require('./addOrder');
var Secrets = require('./secrets');
var Orders = require('./orders');
// import Secrets from './secrets';
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

Parse.initialize(Secrets.getParseKey1(), Secrets.getParseKey2());

var transition = function() {
  $('.collapse').collapse("hide");
  return true;
};

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
            <ul className="nav navbar-nav">
              <li><Link to="posts" onClick={transition}>Browse Food</Link></li>
              <li><Link to="addPost" onClick={transition}>Post Food</Link></li>
              <li><Link to="profile" onClick={transition}>Profile</Link></li>
              <li><a href="" onClick={this.props.logout}>Logout</a></li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
});

var Home = React.createClass({
  render: function() {
    return (
      <div className="content">
        <Posts limit={3} orderable={true} />
      </div>
    )
  }
});

var App = React.createClass({
  mixins : [Router.Navigation],
  getInitialState: function() {
    return {
      user: Parse.User.current(),
      isLoginScreen: false,
      username: '',
      password: ''
    }
  },
  componentDidMount: function() {
    $.get('/client_token', function(clientToken) {
      braintree.setup(clientToken, "dropin", {
        container: "payment-form"
      });
    })
  },
  welcomeScreen: function() {
    return (
      <div className="content">
        <h1 className="splash-title">Homemade delicacies, delivered.</h1>
        <div className="splash-start">
          <a href="#" onClick={this.handleState} className="btn btn-lg" data-toggle="modal" data-target="#loginModal">Get Started</a>
          <a href="#" className="underlink">Or, log in</a>
        </div>
      </div>
    )
  },
  handleScreenChange: function(event) {
    this.setState({isLoginScreen: true});
  },
  handleUsernameChange: function(event) {
    this.setState({username: event.target.value});
  },
  handlePasswordChange: function(event) {
    this.setState({password: event.target.value});
  },
  handleSubmit: function(event) {
    event.preventDefault();
    this.login(this.state.username, this.state.password);
  },
  loginScreen: function() {
    return (
      <div className="content">
        <form id="login" onSubmit={this.handleSubmit}>
          <input type="text" className="form-control" placeholder="Username" onChange={this.handleUsernameChange}/>
          <input type="password" className="form-control" placeholder="Password" onChange={this.handlePasswordChange}/>
          <button type="submit" className="btn btn-primary">Log in</button>
        </form>
      </div>
    )
  },
  login: function(username, password) {
    Parse.User.logIn(username, password, {
      success: function(user) {
        this.setState({user: Parse.User.current()})
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
    if (this.state.user) {
      return (
        <div className="container">
          <Header logout={this.logout} />
          <RouteHandler user={this.state.user}/>
        </div>
      )
    } else {
      return (
        <div className="bg-container">
          <div className="splash-container" id="splash-container">
            <div className="splash-logo">
              HomeFood
            </div>
            { this.state.isLoginScreen ?
              <div className="content">
                <form id="login" onSubmit={this.handleSubmit}>
                  <input type="text" className="form-control" placeholder="Username" onChange={this.handleUsernameChange}/>
                  <input type="password" className="form-control" placeholder="Password" onChange={this.handlePasswordChange}/>
                  <button type="submit" className="btn btn-primary">Log in</button>
                </form>
              </div> :
              <div className="content">
                <h1 className="splash-title">Homemade delicacies, delivered.</h1>
                <div className="splash-start">
                  <a href="#" onClick={this.handleScreenChange} className="btn btn-lg" data-toggle="modal" data-target="#loginModal">Get Started</a>
                  <a href="#" onClick={this.handleScreenChange} className="underlink">Or, log in</a>
                </div>
              </div>
            }
          </div>
        </div>
      )
    }
  }
});

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} />
    <Route name="posts" handler={Posts} />
    <Route name="profile" handler={Profile} />
    <Route name="food" path="food/:id" handler={Orders} />
    <Route name="addPost" handler={AddPost} />
    <Route name="addOrder" path="order/:id" handler={AddOrder} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
