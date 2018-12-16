const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// recovery serverport from env variable or use 4000 as default
const webPort = process.env.PORT || 4000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.set('view engine', 'hbs');


// configuring interceptor
app.use((req, res, next) => {
    var now = new Date().toString();
    var logLine = `${now}: ${req.method} - ${req.url}`;
    
    console.log(logLine);
    fs.appendFile('server.log', logLine + '\n', (error) => {
        if (error) {
            console.log("It was not possible to write in file log" );
        }
    });
    next();
});

// app.use( (req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/static'));

app.get("/", (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Node App',
        welcomeMessage: 'Welcome to the home of the application!'
    });
});

app.get("/persons", (req, res) => {
    res.send({
       name: "Thiago Melo",
       age: 35,
       likes: ['movies', 'games', 'sports'] 
    });
} )

app.get("/projects", (req, res) => {
    res.render("projects.hbs", {
        pageTitle: "Projects"
    });
});

app.get("/photo", (req, res) => {
    res.sendFile("/home/tmelo/Pictures/batman.jpeg");
});

app.get("/about", (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Dynamic Title'
    });
});

app.listen(webPort, () => {
    console.log(`Server is listen on port ${webPort}`);
});