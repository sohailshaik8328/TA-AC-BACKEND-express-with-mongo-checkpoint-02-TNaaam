let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let remarkSchema = new Schema({
    text : {type : String, required : true},
    author : {type : String},
    likes : {type : Number, default : 0},
    dislikes : {type : Number, default : 0},
    eventId : {type : Schema.Types.ObjectId, ref : "Events", required : true}
}, {timestamps : true});

module.exports = mongoose.model('Remark', remarkSchema);
