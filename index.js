//Need to import express-flash, session, express handlebars, handlebars engine, express itself, bodyparser,
// the service function restaurant.js 
//need to create an instance of the app express
//need to create an instance of the database connection db
//create an instance of the service function 'Restaurant'
//parse db inside the restaurant instance

//get all tables to show. Call the getTables function from services. Make the route function async.
//Pass the tablesData as an object to tables.

//create /book post route to gather the 
//data 1. username, 2phone number, 3tableid selected, and 4 capacity desired from the form /book and pass the data to the relevant functions

//create bookings route to display the booked table, the number of people and who booked it 

//create the cancel route to cancel the reservation of the user
//cancel using the table name, use a route to get the form data


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


app.get("/", async (req, res) => {
    let tablesData = await restaurant.getTables();
    // console.log(tablesData[0].table_name);
    res.render('index', {
        tables: tablesData
    })
});


app.post('/book', async (req, res) => {
    let username = req.body.username;
    let phone_no = req.body.phone_number;
    let booking_size = req.body.booking_size;
    let tableId = req.body.tableId;

    // console.log(username, phone_no, booking_size, tableId);
    let isTableBooked = await restaurant.isTableBooked(tableId);
    if (!isTableBooked) {
        await restaurant.bookTable(username, phone_no, booking_size, tableId)
    }

    res.redirect('/bookings')
})

app.get("/bookings", async (req, res) => {
    let getBookedTables = await restaurant.getBookedTables();
    // console.log(getBookedTables);
    res.render('bookings', {
        tables: getBookedTables
    })
});

app.get('/bookings/:username', async (req, res) => {
    req.params.username;

})

app.post('/cancel', async (req, res) => {
    let tableToCancel = req.body.toCancel;
    await restaurant.cancelTableBooking(tableToCancel)
    res.redirect('/bookings')
})

var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('🚀  server listening on:', portNumber);
});