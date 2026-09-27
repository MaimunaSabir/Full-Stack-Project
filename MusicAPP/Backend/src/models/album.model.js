const mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
    music :[{
        type : mongoose.Schema.Types.ObjectId,
        ref :"music",
    }],
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


const albumModel = mongoose.model("album",albumSchema);


module.exports =albumModel;