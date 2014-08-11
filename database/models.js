/*
 * models.js 
 * A simple Mongo schema and model file.
 * NOTE: Doesn't encrypt user passwords.
 * For implementing a hashed password system take look at http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* create and export user schema */
exports.UserSchema = new Schema({
	username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
})


exports.UserModel = mongoose.model('user', exports.UserSchema);