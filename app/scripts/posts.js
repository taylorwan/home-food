var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var sample = [{
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice',
  id: 0
}, {
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice',
  id: 1
}, {
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice',
  id: 2
}, {
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice',
  id: 3
}, {
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice',
  id: 4
}, {
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice',
  id: 5
}, {
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice',
  id: 6
}, {
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice',
  id: 7
}];

var transition = function() {
  $('.collapse').collapse("hide");
  return true;
}

var Post = React.createClass({
  render: function() {
    return (
      <li className="postcoll">
        <h4 className="post-type pull-left">{this.props.name}</h4>
        <Link className="pull-right button " to="food" params={{id: this.props.id + "" }} onClick={transition}>Order</Link>
        <table className="table table-condensed">
          <tr className="price">
            <td className="heading">Price</td>
            <td className="value">{this.props.price}</td>
          </tr>
          <tr className="available">
            <td className="heading">Available</td>
            <td className="value">{this.props.availability}</td>
          </tr>
        </table>
      </li>
    )
  }
});

var Posts = React.createClass({
  getInitialState: function() {
    return {posts: sample}
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