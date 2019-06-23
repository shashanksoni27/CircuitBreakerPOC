//Load Express
const express = require('express');
const app = express();
const port = 8084;
const bodyPaser = require('body-parser');
app.use(bodyPaser.json());
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/customers',{useNewUrlParser: true}).then(()=>{
    console.log("Db connected successfully...........!!");
}).catch(()=>{
    console.log("Error in Db");    
});

require('./Customer');
const Customer = mongoose.model("Customers");

app.get('/', (req,res)=>{
    res.send("This is our main endpoint");
});

app.post('/customers', (req,res)=>{
    var newCustomer = {
        name: req.body.name,
        address: req.body.address,
        age: req.body.age
    }

    var customer = new Customer(newCustomer);
    customer.save().then(()=>{
        res.send("Cutomer addded successfully");
    }).catch(
        err =>{
            if(err){
                res.send("some error occured");
            }
        }
    );
});

app.get('/customers', (req,res)=>{
    Customer.find().then( customers =>{
        console.log(customers);
        res.json(customers);
    }).catch( err => {
        res.send("An error occured");
    });
});

app.listen(port,()=>{
    console.log("Server running on port -------- " + port);
});
