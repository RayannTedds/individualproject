/* global i */
/*jslint node: true */
"use strict";
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var nodemailer = require("nodemailer");
var DateTime = require('datetime-converter-nodejs');
var exports = module.exports = {};
var app = express();

var con = mysql.createConnection({
 host: 'localhost',
 user: "root",
 database: "itgirls"
});

 con.connect();

/**
 * Connects to the database
 * @returns 'Connection established'
 * @throws - The exact error is logged in the console.
 */
function connectToDb(){
  con.connect(function(){});
}

app.use(express.static('../individualproject/'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(session({secret:"secretThis"}));

/**
 * A get function that gets the homepage and renders it in its HTML format.
 * @function getHomepage
 */
app.get('/', function(req, res){
 connectToDb();
 res.sendfile('index.html', {root: path.join(__dirname, '../individualproject/')});
});

//global variable for the session is set
var sess;

/**
 * A post function that starts a session when a user has logged in. 
 * @function startSession
 * @param {int} userID Unique identification number for the logged in user
 * @param {string} username Username of the logged in user
 * @returns userID
 * @throws The exact error is logged in the console.
 */
app.post('/startSession', function(req, res, err){
 sess=req.session;
 sess.userID = req.body.userID;
 sess.username = req.body.username;
 res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(JSON.stringify(sess.userID));
    if (err){
      console.log('error: ' + err.stack);
      return;
    }
});

/**
 * A get function that gets the current session details. 
 * @function getSessionDetails
 * @returns A string containing the session's userID and username, seperated by a '|' character.
 */
app.get('/getSessionDetails', function(req, res){
 res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(JSON.stringify(sess.userID + "|" + sess.username));
});

/**
 * A get function that searches the usernames in the database depending on the searchquery. 
 * @function searchUsername
 * @param {string} username A string containing the user's search query
 * @returns A string containing the userID.
 * @throws The exact error is logged in the console.
 */
app.get('/searchUsername', function(req, res){
 connectToDb();
 con.query('SELECT userID FROM users WHERE username LIKE "%' + req.query.username + '%";',  function (err, result, fields) {
  if (err) throw err;
  var data = [];
  var i;
     for(i=0; i<result.length; i++){
      data.push(result[i].userID);
     }
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(JSON.stringify(data));
 });
});

/**
 * A get function that searches email addresses in the database depending on the searchquery. 
 * @function searchEmail
 * @param {string} email A string containing the user's search query
 * @returns A string containing the userID.
 * @throws The exact error is logged in the console.
 */
app.get('/searchEmail', function(req, res){
 connectToDb();
 con.query('SELECT userID FROM users WHERE email LIKE "%' + req.query.email + '%";',  function (err, result, fields) {
  if (err) throw err;
  var data = [];
  var i;
     for(i=0; i<result.length; i++){
      data.push(result[i].userID);
     }
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(JSON.stringify(data));
 });
});

/**
 * A post function that inserts a new 'user' in the 'users' table within the database. 
 * @function insertUser
 * @param {string} username The username to be associated with the user details
 * @param {string} email The email associated with the user
 * @param {string} password The password associated with the user (hashed)
 * @returns 'Success'
 * @throws The exact error is logged in the console.
 */
app.post('/registerUserNow', function(req, res){
 connectToDb();
 con.query('INSERT INTO users (username, email, password, userSince) VALUES ("' + req.body.username + '","' + req.body.email + '","' + req.body.password + '", NOW());',  function (err, result, fields) {
  if (err) throw err;
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(JSON.stringify("Success"));
 });
});

/**
 * A get function that gets the login details depending on the user email provided. 
 * @function getLoginDetails
 * @param {string} email The email associated with the user
 * @returns A string containing the email, userID, password and username, seperated by a '|' character.
 * @throws The exact error is logged in the console.
 */
app.get('/getLoginDetails', function(req, res){
 connectToDb();
 con.query('SELECT email, password, username, userID FROM users WHERE email = "' +  req.query.email + '";',  function (err, result, fields) {
  if (err) throw err;
  var data = [];
  var i;
     for(i=0; i<result.length; i++){
      data.push(result[i].email + "|" + result[i].userID + "|" + result[i].password + "|" + result[i].username + "¬");
     }
  res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(JSON.stringify(data));
 });
});

/**
 * A patch function that updates the 'lastActive' value in the 'users' table within the database depending on the userID provided. 
 * @function updateLastActive
 * @param {int} userID Unique identification number of the user associated with the review
 * @returns 'Success'
 * @throws The exact error is logged in the console.
 */
app.patch('/updateLastActive', function(req, res){
 connectToDb();
 con.query('UPDATE users SET lastActive = NOW() WHERE userID = ' + req.body.userID + ';',  function (err, result, fields) {
  if (err) throw err;
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(JSON.stringify("Success"));
 });
});

app.patch('/updateRole', function(req, res){
 connectToDb();
 con.query('UPDATE users SET roleType = "' + req.body.roleType + '" WHERE userID = ' + req.body.userID + ';',  function (err, result, fields) {
  if (err) throw err;
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(JSON.stringify("Success"));
 });
});


/**
 * A patch function that updates the 'password' in the 'users' table within the database depending on the userID provided. 
 * @function updatePassword
 * @param {string} username The username to be associated with the user details
 * @param {string} password The password associated with the user (hashed)
 * @returns 'Success'
 * @throws The exact error is logged in the console.
 */
app.patch('/updatePassword', function(req, res){
 connectToDb();
 con.query('UPDATE users SET password = "' + req.body.password + '" WHERE username LIKE "%' + req.body.username + '%";',  function (err, result, fields) {
  if (err) throw err;
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(JSON.stringify("Success"));
 });
});

/**
 * A get function that gets the user details depending on the userID provided. 
 * @function getUserDetails
 * @param {int} userID Unique identification number of the user
 * @returns A string containing the username, roleType, lastActive, email and userSince, seperated by a '|' character.
 * @throws The exact error is logged in the console.
 */
app.get('/getUserDetails', function(req, res){
 connectToDb();
 con.query('SELECT username, email, roleType, userSince, lastActive FROM users WHERE userID = ' +  req.query.userID + ';',  function (err, result, fields) {
  if (err) throw err;
  var data = [];
  var i;
     for(i=0; i<result.length; i++){
      data.push(result[i].username + "|" + result[i].roleType + "|" + result[i].email + "|" + result[i].userSince + "|" + result[i].lastActive + "|¬");
     }
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(JSON.stringify(data,fields));
 });
});

/**
 * A get function that gets the category details for the dropdown menu. 
 * @function getCategories
 * @returns A string containing the categories, seperated by a '|' character.
 * @throws The exact error is logged in the console.
 */
app.get('/getCategories', function(req, res){
 connectToDb();
 con.query('SELECT * FROM category ORDER BY category ASC;',  function (err, result, fields) {
  if (err) throw err;
  var data = [];
  var i;
     for(i=0; i<result.length; i++){
      data.push(result[i].category + "|" + result[i].categoryID + "¬");
     }
  res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(JSON.stringify(data));
 });
});

app.post('/addTopic', function(req, res){
 connectToDb();
 con.query('INSERT INTO forum (title, description, creationAuthor, creationDate, categoryID) VALUES ("' + req.body.title + '","' + req.body.eventdescription + '",' + req.body.creationAuthor + ', NOW() ,' + req.body.categoryID + ');',  function (err, result, fields) {
  if (err) throw err;
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(JSON.stringify("Success"));
 });
});

app.get('/getTopics', function(req, res){
 connectToDb();
 con.query('SELECT * FROM category ORDER BY category ASC;',  function (err, result, fields) {
  if (err) throw err;
  var data = [];
  var i;
     for(i=0; i<result.length; i++){
      data.push(result[i].category + "|" + result[i].categoryID + "¬");
     }
  res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(JSON.stringify(data));
 });
});

app.get('/getDiscussions', function(req, res){
 connectToDb();
 con.query('SELECT * FROM forum LEFT JOIN (users)  ON  users.userID = forum.creationAuthor;',  function (err, result, fields) {
  if (err) throw err;
  var data = [];
  var i;
     for(i=0; i<result.length; i++){
      data.push(result[i].postID + "|" + result[i].categoryID + "|" + result[i].title + "|" + result[i].description + "|" + result[i].creationDate + "|" + result[i].username + "|" + result[i].categoryID + "¬");
     }
  res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(JSON.stringify(data));
 });
});

app.get('/getDiscussion', function(req, res){
 connectToDb();
 con.query('SELECT * FROM forum LEFT JOIN (users)  ON  users.userID = forum.creationAuthor WHERE postID = ' +  req.query.postID + ' ;',  function (err, result, fields) {
  if (err) throw err;
  var data = [];
  var i;
     for(i=0; i<result.length; i++){
      data.push(result[i].postID + "|" + result[i].categoryID + "|" + result[i].title + "|" + result[i].description + "|" + result[i].creationDate + "|" + result[i].username + "|" + result[i].categoryID + "¬");
     }
  res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(JSON.stringify(data));
 });
});


app.get('/getComments', function(req, res){
 connectToDb();
 con.query('SELECT * FROM comments LEFT JOIN (users)  ON  users.userID = comments.commentAuthor WHERE postID = ' +  req.query.postID + ' ORDER BY commentDate DESC;',  function (err, result, fields) {
  if (err) throw err;
  var data = [];
  var i;
     for(i=0; i<result.length; i++){
      data.push(result[i].commentID + "|" + result[i].comment + "|" + result[i].username + "|" + result[i].commentDate + "|" + result[i].postID + "¬");
     }
  res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(JSON.stringify(data));
 });
});

app.post('/addComment', function(req, res){
 connectToDb();
 con.query('INSERT INTO comments (comment, commentAuthor, commentDate, postID) VALUES ("' + req.body.comment + '",' + req.body.commentAuthor + ', NOW() ,' + req.body.postID + ');',  function (err, result, fields) {
  if (err) throw err;
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(JSON.stringify("Success"));
 });
});

app.get('/getAllEvents', function(req, res){
 connectToDb();
 con.query('SELECT * FROM event;',  function (err, result, fields) {
  if (err) throw err;
  var data = [];
  var i;
     for(i=0; i<result.length; i++){
      data.push(result[i].eventID + "|" + result[i].eventName + "|" + result[i].eventDate + "|" + result[i].address + "|" + result[i].countyID + "|" + result[i].postcode + "|" + result[i].eventDescription + "|" + result[i].eventCompany + "¬");
     }
  res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(JSON.stringify(data));
 });
});

app.get('/getMonthsEvents', function(req, res){
 connectToDb();
 con.query('SELECT * FROM event WHERE MONTH(eventDate) = MONTH(NOW()) AND YEAR(eventDate) = YEAR(NOW());',  function (err, result, fields) {
  if (err) throw err;
  var data = [];
  var i;
     for(i=0; i<result.length; i++){
      data.push(result[i].eventID + "|" + result[i].eventName + "|" + result[i].eventDate + "|" + result[i].address + "|" + result[i].countyID + "|" + result[i].postcode + "|" + result[i].eventDescription + "|" + result[i].eventCompany + "¬");
     }
  res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(JSON.stringify(data));
 });
});

app.get('/getEventDate', function(req, res){
 connectToDb();
 con.query("SELECT * FROM event WHERE YEAR(eventDate) = " + req.query.eventYear + " AND MONTH(eventDate) = " + req.query.eventMonth + " AND  DAY(eventDate) = " + req.query.eventDay + ";",  function (err, result, fields) {
  if (err) throw err;
  var data = [];
  var i;
     for(i=0; i<result.length; i++){
      data.push(result[i].eventID + "|" + result[i].eventName + "¬");
     }
  res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(JSON.stringify(data));
 });
});

app.get('/getEvent', function(req, res){
 connectToDb();
 con.query("SELECT * FROM event WHERE eventID = " + req.query.eventID + ";",  function (err, result, fields) {
  if (err) throw err;
  var data = [];
  var i;
     for(i=0; i<result.length; i++){
      data.push(result[i].eventID + "|" + result[i].eventName + "|" + result[i].eventDate + "|" + result[i].address + "|" + result[i].countyID + "|" + result[i].postcode + "|" + result[i].eventDescription + "|" + result[i].eventCompany + "¬");
     }
  res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(JSON.stringify(data));
 });
});

app.get('/getRandomEvent', function(req, res){
 connectToDb();
 con.query("SELECT * FROM event ORDER BY RAND() LIMIT 1;",  function (err, result, fields) {
  if (err) throw err;
  var data = [];
  var i;
     for(i=0; i<result.length; i++){
      data.push(result[i].eventID + "|" + result[i].eventName + "|" + result[i].eventDate + "|" + result[i].address + "|" + result[i].countyID + "|" + result[i].postcode + "|" + result[i].eventDescription + "|" + result[i].eventCompany + "¬");
     }
  res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(JSON.stringify(data));
 });
});

app.listen(process.env.PORT);




