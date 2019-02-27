'Use Struct'

const querystring = require('querystring');                                                                                                                                                                                                
const https = require('https');
var request = require('request');
var fs = require('fs');


const router = require('express').Router();
const MarsRover = require('../models/MarsRover');
const config = require('../config');

const async = require('async');

router.post('/rover/capture', (req, res, next) => {

    if(null == req.body.date || req.body.date == ''){
        res.json({
            success: false,
            message: 'date sent invalid.'
        });
    } else {
        var inputDate = new Date(req.body.date);

        if(isNaN(inputDate.getTime())){
            res.json({
                success: false,
                message: 'date sent invalid.'
            });
        } else {
            var dateProvided = inputDate.getFullYear() + '-' + (inputDate.getMonth() + 1) + '-' + inputDate.getDate();
            var urlParams = '';
            
            urlParams += '?earth_date=' + dateProvided;
            urlParams += '&api_key=' + config.secret;
            
            request('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos' + urlParams, function (error, response, body) {
                
                if(error){
                    res.json({
                        success: false,
                        message: 'failed mars api call.',
                        data: error
                    });
                }
                // console.log('error:', error); // Print the error if one occurred
                // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                //console.log('body:', body); // Print the HTML for the Google homepage.
                if(body != null){
                    // console.log(body);
                    var responseBody = JSON.parse(body);
                    // console.log(typeof(responseBody.photos));
                    console.log(responseBody.photos.length);
                    // console.log(typeof(body));

                    if(responseBody.photos.length > 0){
                        var photos = responseBody.photos;
                        var images = [];
                        var dir = './dist/tmp/' + dateProvided;
                                    
                        if (!fs.existsSync(dir)){
                            fs.mkdirSync(dir);
                            async.each(photos, function (photo, callback) {
                            
                                if(photo['img_src'] != null || photo['img_src'] != ''){
                                    // storeImages(photos[i]['img_src']);
                                    request.head(photo['img_src'], function(err, res, body){
                                        // console.log(photo['img_src']);
                                        var arrFname = photo['img_src'].split('/');
                                        
                                        
                                        // console.log(dir);
                                        
                                        var filename = arrFname[arrFname.length-1];
                                        images.push(filename);
                                        request(photo['img_src']).pipe(fs.createWriteStream(dir + '/' + filename)).on('close', callback);
                                        
                                    
                                    });
                                }
                            }, function(err, result) {
                                // console.log('result: ' + result);
                                // console.log('error: ' + err);
                                if(err){
                                    // console.log('error is: ' + err);
                                    res.json({
                                        success: false,
                                        message: 'failed mars api call.',
                                        data: null
                                    });
                                } else {
                                    console.log("ALL FINISH");
                                    res.json({
                                        success: true,
                                        message: 'success mars api call.',
                                        data: { 'images' : images, 'folder': dateProvided }
                                    });
                                }
                            });
                        } else {
                            fs.readdir(dir, (err, files) => {
                                files.forEach(file => {
                                    // console.log(file);
                                    images.push(file);
                                    
                                });
                                res.json({
                                    success: true,
                                    message: 'success mars api call.',
                                    data: { 'images' : images, 'folder': dateProvided }
                                });
                            });
                        }
                    }
                }
            });
        }
        
    }
    
});

module.exports = router;