const mongoose = require("mongoose");
const authModel = require("./auth.models");

const musicSchema = mongoose.Schema({
    uri :{
        type : String,
        required : true,
        unique : true,
    },
    title :{
        type :String,
        required :true,
        unique : true,
    },
    artist:{
        type :mongoose.Schema.Types.ObjectId,
        ref : "User",
        
    }

});


const musicModel = mongoose.model("music",musicSchema);


module.exports =musicModel;