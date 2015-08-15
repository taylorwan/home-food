var React = require('react');

var sample = [{
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice'
}, {
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice'
}, {
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice'
}, {
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice'
}, {
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice'
}, {
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice'
}, {
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice'
}, {
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice'
}, {
  name: 'Tamales', 
  price: '$3/unit', 
  availability: '2 days notice'
}];

var Post = React.createClass({
  render: function() {
    return (
      <li className="bg-info post">
        <h4 className="post-type pull-left">{this.props.name}</h4>
        <a href="#" className="pull-right order-this-item btn btn-primary btn-sm" data-toggle="modal" data-target="#orderItemModal">Order</a>
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