const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middle WARE
// app.use(express.static(__dirname + '/public'));
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);    
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log.');
        }
    })
    // fs.appendFile('server.log', log + '\n');
    // console.log(`${now}: ${req.method} ${req.url}`);
    next();
});
app.use((req, res, next)=>{
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance Page'
    })
});
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeNote: 'Welcome to my node application webpage, with handlesbar for Templating :) <br>  Hope you \'d like it',
        // currentYear: new Date().getFullYear()
    });
    // res.send({
    //     name: 'Sommy',
    //     like: ['milk', 'tea', 'banna']
    // })
    // res.send('<h1>Hello Express!</h1>');
});
app.get('/about', (req, res)=>{
    // res.send('About Page')
    res.render('about.hbs', { // render for any template setup (handlebars)
        pageTitle: 'About Page',
        // currentYear: new Date().getFullYear()
    }); 
});
app.get('/bad', (req, res)=>{
    res.send(
        // 'Opps.. error just occured', 
        {errorMessage: 'could find the url', time: '8:40pm african time'} 
    )
})

// 3000 is the port
app.listen(port, ()=>{
    console.log(`server is up on port ${port}`);
}); 