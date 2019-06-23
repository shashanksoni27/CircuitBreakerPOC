//Load Express
const express = require('express');
const app = express();
const port = 8083;
const bodyPaser = require('body-parser');
app.use(bodyPaser.json());
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library',{useNewUrlParser: true}).then(()=>{
    console.log("Db connected successfully...........!!");
}).catch(()=>{
    console.log("Error in Db");    
});

require('./Book');
const Book = mongoose.model("Books");

app.get('/', (req,res)=>{
    res.send("This is our main endpoint");
});

app.post('/books', (req,res)=>{
    var newBook = {
        title: req.body.title,
        author: req.body.title,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher,
    }

    var book = new Book(newBook);
    book.save().then(()=>{
        res.send("book addded successfully");
    }).catch(
        err =>{
            if(err){
                res.send("some error occured");
            }
        }
    );
});

app.get('/books', (req,res)=>{
    Book.find().then( books =>{
        console.log(books);
        res.json(books);
    }).catch( err => {
        res.send("An error occured");
    });
});

app.listen(port,()=>{
    console.log("Server running on port -------- " + port);
});
