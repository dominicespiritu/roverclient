'User Strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


  /**
 * Rover Schema
 */
var roverSchema = mongoose.Schema({
    id: Number,
    name: String,
    landing_date: {type: Date},
    launch_date: {type: Date},
    status: String,
    max_sol: Number,
    max_date: {type: Date},
    total_photos: Number,
    cameras: [cameraSchema]
},{ _id : false });

  /**
 * Camera Schema
 */
var cameraSchema = mongoose.Schema({
    id: Number,
    name: String,
    rover_id: Number,
    full_name: String
},{ _id : false });
  

/**
 * Photo Schema
 */
var photoSchema = mongoose.Schema({
    id: Number,
    sol: Number,
    camera: cameraSchema,
    img_src: String,
    earth_date: {type: Date},
    rover: roverSchema
},{ _id : false });
  
//Define Attributes
  /**
 * Main Schema
 */
const MarsRover = new Schema({
    photos: [photoSchema],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('marsRover', MarsRover);