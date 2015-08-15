Parse.initialize(getParseKey1(), getParseKey2());
var div = document.createElement('div');
div.setAttribute('id', 'container');

$('body').append(div);

console.log('\'Allo \'Allo!');


// PARSE TEST CODE
// var user = new Parse.User();
// user.set("username", "my name");
// user.set("password", "my pass");
// user.set("email", "email@example.com");

// // other fields can be set just like with Parse.Object
// user.set("phone", "650-555-0000");

// user.signUp(null, {
//   success: function(user) {
//     // Hooray! Let them use the app now.
//   },
//   error: function(user, error) {
//     // Show the error message somewhere and let the user try again.
//     alert("Error: " + error.code + " " + error.message);
//   }
// });

var username = 'my name';
var password = 'my pass';

Parse.User.logIn(username, password, {
  success: function(user) {
    console.log('logged in');
    loggedIn(user);
  },
  error: function(user, error) {
    console.log('not logged in');
    // redirect to make user page
  }
});

function loggedIn(user) {
  // console.log(user);
  // get ALL postings
  // 
}

var Post = Backbone.Model.extend({
  defaults: {
    description: '',
    username: '',
    picture: '',
    price: 0,
    quantity: 0
  }
});

var User = Backbone.Model.extend({
  defaults: {
    username: '',
    password: '',
    email: ''
  }
});


var user1 = new User({
  username: 'testuser',
  password: 'testpassword',
  email: 'ycp217@nyu.edu'
});
console.log(user1.toJSON());


