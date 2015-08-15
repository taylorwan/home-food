var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
var email = document.getElementById('email').value;

var user = new Parse.User();
user.set("username", username);
user.set("password", password);
user.set("email", email);


user.signUp(null, {
  success: function(user) {
    // Hooray! Let them use the app now.
  },
  error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
});
