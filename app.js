/**
 * Created by deepak on 27/05/15.
 */

var express = require('express');
var _ = require('underscore');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.json());


var users = [
    { name : 'deepak'},
    { name : 'chetan'}
];




app.get('/users', function(req, res) {
    res.send(users);
});


app.get('/users/:name', function(req, res) {

    var name = req.params.name;

    var user = _.find(users, function(u) {
        return u.name == name;
    });

    res.send(user);

});


app.post('/users', function(req, res) {

    var user = req.body;

    var existing = _.findWhere(users, { name : user.name });
    // return undefined if user is not exist in users

    if(existing === undefined) {
        users.push(user);
        res.send(users);
    } else {
        res.send({'error':'user already exist'});
    }

});


app.put('/users/:name', function(req, res) {

    var name = req.params.name,
        newName = req.body.name;

    var user = _.find(users, function(user) {
        return user.name == name;
    });

    if(user) {
        user.name = newName;
        res.send(user);
    }

});


app.delete('/users/:name', function(req, res) {

    var name = req.params.name;

    var newUsers = _.reject(users, function(user) {
        return user.name == name;
    });

    users = newUsers;

    res.send(newUsers);

});

app.listen('3000');