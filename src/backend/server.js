var express = require('express');
var port = 3000;
var app = express();
var cookieParser = require('cookie-parser');
var authenticate = require('./middleware/authenticate');

// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());

//TODO add the protected routes directly by traverising the directory
const protectedPaths = ["edit.html"];

app.use(authenticate(protectedPaths));

//to serve static files
app.use(express.static(__dirname + '/../../build/'));


app.post('/login.html', function(req, res) {
    const loggedIn = false;
    //validate user credentials
    //generate secret cookie value
    //set secure random cookie
    const maxAgeInSeconds = 3600;
    res.cookie('id', '123456', {
        maxAge: maxAgeInSeconds,
        httpOnly: true,
        secure: true
    }).redirect("/edit.html");
});


//will return `index.html` for any route. To be used by spa applications
app.get('/*', function(req, res) {
    var options = {
        root: __dirname + '/../../build/'
    };
    res.sendFile('index.html', options);
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});