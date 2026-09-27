const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
    username :{
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type :String,
        required :true,
        unique : true,
    },
    password : {
        type :String,
        required : true,
    },
    role :{
        type :String,
        enum :['user','artist'],
        default : 'user',
    }
})


const authModel = mongoose.model("User",authSchema);

module.exports = authModel;