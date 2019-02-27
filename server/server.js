const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');
// Load Config file
const config = require('./config');

// init express
const app = express();


// DB Local
// mongoose.connect(config.database, err =>{
//     if(err){
//         console.log('something went wrong on DB connection.');
//         console.log(err);
//     } else {
//         console.log('connection to Database Success..');
//     }
// });

//DB on MLab Cloud
mongoose.connect(config.database2, err =>{
    if(err){
        console.log('something went wrong on DB connection.');
        console.log(err);
    } else {
        console.log('connection to Database Success..');
    }
});


// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// logger
app.use(morgan('dev'));
//for specific security, to allow API calls
app.use(cors());



app.use(express.static(path.join(__dirname, 'dist')));
if(process.env.NODE_ENV){
    if(process.env.NODE_ENV == 'production'){
        console.log('production mode..');
        app.use(express.static(path.join(__dirname, 'dist')));
    }
} else {
    app.get('/', (req, res, next) => {console.log('get');
        res.json({
            user:'Dominic Espiritu'
        });
    });
}
const roverCaptureRoutes = require('./routes/rovercapture');
app.use('/api', roverCaptureRoutes);

app.listen(config.port, (err) => {
    console.log('Environment ' + process.env.NODE_ENV);
    console.log('Server started at port ' + config.port);
});