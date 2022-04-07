const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        ufname:{
            type:String,
            required:true
        },
        ulname:{
            type:String,
            required:true
        },
        uemail:{
            type:String,
            required:true
        },
        umobile:{
            type:Number,
            required:true
        },
        usalary:{
            type:Number,
            required:true
        },
    }
);

module.exports = mongoose.model('user',userSchema);