const mongoose = require('mongoose');

//A Model refrence to collection

mongoose.model("Orders",{
    CustomerId:{
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    BookId:{
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    initialDate:{
        type: Date,
        require: false
    }
})