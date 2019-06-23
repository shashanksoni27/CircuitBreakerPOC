const mongoose = require('mongoose');

//A Model refrence to collection

mongoose.model("Books",{
    title:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    numberPages:{
        type: Number,
        require: false
    },
    publisher:{
        type: String,
        require: false
    },
})