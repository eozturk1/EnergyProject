/* database */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/energyproject');

var db = mongoose.connection;

/* if any error occurs */
db.on('error', console.error.bind(console, 'connection error:'));

/* succesfully connected to database. */
db.once('open', function callback () {
	console.log('Connected to database!');
});