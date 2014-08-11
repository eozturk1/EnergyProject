/* express import and configurations. */
var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
/* express import and configurations end.*/

/* database connection and model import. */
var db = require("./database/database");

var models = require("./database/models");
var User = models.UserModel;
/* database connection and model import end.*/


/* serves main page */
app.get("/", function(req, res) {
	console.log("trying to reach the main page. redirect to login.html");
    res.sendfile("login.html");
});
 
app.post("/login", function(req, res) {
	console.log("Login request received for user: " + req.body.username);
	var chartsPage = "/user_charts.html";
	User.findOne({username: req.body.username}, function (err, user) {
		if (err) {
			return console.error(err);
		}	
        if (user == null) { // couldn't find the user.
        	console.log("Couldn't find user in the db.");
            res.send("Login failed. Wrong username or password.");
            return;
        }
        console.log("User found in the db. Checking password.");
        /* user is registered, check if the passwords match. if matches, redirect to main page. */
        if (user.password == req.body.password) {
        	console.log("Login successful. Redirecting to " + chartsPage);
            res.sendfile(__dirname + chartsPage);
        } else {
        	console.log("Passwords don't match.");
            res.send("Login failed. Wrong username or password.");
        }
    });
});
 
/* serves all the static files */
app.get(/^(.+)$/, function(req, res){
    console.log('GET : ' + req.params[0]);
    res.sendfile(__dirname + req.params[0]);
});

 
var port = process.env.PORT || 8080;
app.listen(port, function() {
   console.log("Express server started. Listening on port: " + port);
});