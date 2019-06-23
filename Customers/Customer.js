const mongoose = require('mongoose');

//A Model refrence to collection

mongoose.model("Customers",{
    name:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: false
    }
})