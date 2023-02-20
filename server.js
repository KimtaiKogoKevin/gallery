const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Initializing the app
const app = express();

// connecting the database
let mongodb_url = 'mongodb+srv://kevinkogo:4DKRzGoYbWwS3iku@ipweekone.gus6huv.mongodb.net/?retryWrites=true&w=majority';
let dbName = 'ipWeekOne';
mongoose.connect(`${mongodb_url}${dbName}`,{ useNewUrlParser: true , useUnifiedTopology: true }, (err)=>{
    if (err) console.log(err)
});
let db = mongoose.connection;
db.once('open', ()=>{
    console.log('Database connected successfully')
})
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true  },(err)=>{
//     if (err) {
//         console.log(err)
//     }else{
//         console.log(`Connected to Database: ${MONGODB_URI}`)
//     }
// });

// test if the database has connected successfully
// let db = mongoose.connection;
// db.once('open', ()=>{
//     console.log('Database connected successfully')
// })




// View Engine
app.set('view engine', 'ejs');

// Set up the public folder;
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(express.json())


app.use('/', index);
app.use('/image', image);



 
const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Server is listening at https://gallery-natp.onrender.com:${PORT}`)
});


module.exports = app;