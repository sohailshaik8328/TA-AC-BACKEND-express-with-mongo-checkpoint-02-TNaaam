let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let eventsSchema = new Schema({
    title : {type : String},
    summary : {type : String},
    host : {type : String},
    start_date : {type : Date},
    end_date :{type : Date},
    category : {type : String},
    location : {type : String},
    likes : {type : Number, default : 0},
    dislikes : {type : Number, default : 0}

}, {timestamps : true});

module.exports = mongoose.model('Events', eventsSchema);
