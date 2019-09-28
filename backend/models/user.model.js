const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{type:String, require:true,unique:true,trim:true,minlength:3},

    firstname : {
        type:String,
        require:true,
        unique:false,
        trim:true,
    },

    lastname : {
        type:String,
        require:true,
        unique:false,
        trim:true,
    },

    password : {
        type:String,
        require:true,
        unique:false,
        trim:true,
    },

    email :{
        type : String,
        require : true,
        unique : true,
        trim : true,
    },
},{
    timestamps:true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;