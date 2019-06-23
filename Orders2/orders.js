//Load Express
const express = require('express');
const app = express();
const port = 8085;
const bodyPaser = require('body-parser');
const axios = require('axios');
app.use(bodyPaser.json());
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/new_orders',{useNewUrlParser: true}).then(()=>{
    console.log("Db connected successfully...........!!");
}).catch(()=>{
    console.log("Error in Db");    
});

const circuitBreaker = require('opossum');

const options = {
    timeout: 4000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 10000 // After 10 seconds, try again.
  };
  const breaker = circuitBreaker(asyncFunctionThatCouldFail, options);
  breaker.fallback(() => 'Sorry, out of service right now');
//   breaker.on('fallback', (result) => reportFallbackEvent(result));



'use strict';
 
var Levee = require('levee');
var Wreck = require('wreck');
 

 
app.get('/orders2', (req,res)=>{
breaker.fire('helo').then(result => {
    res.send({"conent": result})
}).catch(err => {console.log(err);
res.send(err)}
);
});


// --------------------------------------------------------------------------------------------------------------------
function asyncFunctionThatCouldFail (req, res) {
    return new Promise((resolve, reject) => {
      // Do something, maybe on the network or a disk
      Order.find().then( customers =>{
        var bookRes;
        var custResponse;
    axios.get("http://localhost:8083/books").then(resp => {
            bookRes = resp.data[0];

            axios.get("http://localhost:8084/customers").then(resp => {
                    custResponse = resp.data[0];
                    console.log();
            
}).catch(err => {
    console.log(err);
    reject({"err":"CUSTOMER SERVICE IS DOWN"});
});

setTimeout(()=>{
    resolve({
        CustomerName: custResponse.name,
        BookName: bookRes.title,
        OrderDate: customers[0].initialDate
    });
},2000);

    
}).catch(err => {
    console.log(err);
    reject({"err":"BOOKS SERVICE IS DOWN"});
});


    }).catch( err => {
        console.log(err);
        reject("An error occured");
    });
    });
  }




// ======================================================================================================================













require('./Order');
const Order = mongoose.model("Orders");

app.get('/', (req,res)=>{
    res.send("This is our main endpoint");
});

app.post('/orders', (req,res)=>{
    var newOrder = {
        CustomerId: mongoose.Types.ObjectId(req.body.CustomerId),
        BookId: mongoose.Types.ObjectId(req.body.BookId),
        initialDate: req.body.initialDate
    }

    var or = new Order(newOrder);
    or.save().then(()=>{
        res.send("Order addded successfully");
    }).catch(
        err =>{
            if(err){
                res.send("some error occured");
            }
        }
    );
});

app.get('/orders', (req,res)=>{
    funct(req,res);
});

funct = function(req,res){
    Order.find().then( customers =>{
        var bookRes;
        var custResponse;
    axios.get("http://localhost:8083/books").then(resp => {
            bookRes = resp.data[0];

            axios.get("http://localhost:8084/customers").then(resp => {
                    custResponse = resp.data[0];
                    console.log();
            
}).catch(err => {
    console.log(err);
    
});

setTimeout(()=>{
    res.json({
        CustomerName: custResponse.name,
        BookName: bookRes.title,
        OrderDate: customers[0].initialDate
    });
},2000);

    
}).catch(err => {
    console.log(err);
    
});


    }).catch( err => {
        console.log(err);
        
        res.send("An error occured");
    });
}

app.listen(port,()=>{
    console.log("Server running on port -------- " + port);
});
