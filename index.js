//Need to import express-flash, session, express handlebars, handlebars engine, express itself, bodyparser,
// the service function restaurant.js 
//need to create an instance of the app express
//need to create an instance of the database connection db
//create an instance of the service function 'Restaurant'
//parse db inside the restaurant instance
//

//import express  framework
import express from 'express';
//import the handlebars engine 
import exphbs from 'express-handlebars';
//import body-parsers to handle the reading of template objects?
import bodyParser from 'body-parser';
//import express flash and session to use inconjuction for displaying error & cancel messages
import flash from 'express-flash';
import session from 'express-session';

//conection to the database using pg-promise and dotevn
import db from './database/db.js'
//service functions restaurant
import Restaurant from './services/restaurant.js';

//instantiate the service function
let restaurant = Restaurant(db);

const app = express()

app.use(express.static('public'));
app.use(flash());
app.use(session({
    secret: "<restuBook>",
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const handlebarSetup = exphbs.engine({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');


app.get("/", (req, res) => {
res.send('hi')
    // res.render('index', {
    //     tables: [{}, {}, { booked: true }, {}, {}, {}]
    // })
});


app.get("/bookings", (req, res) => {
    res.render('bookings', {
        tables: [{}, {}, {}, {}, {}, {}]
    })
});


var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('🚀  server listening on:', portNumber);
});