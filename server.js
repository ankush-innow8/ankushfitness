const express = require('express')
const sendMail = require('./mail')
const app = express()
const path = require('path')

// const PORT = 8800
const port = process.env.PORT || 8800

var bodyParser=require("body-parser"); 
  
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/gfg'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

  
  
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
  
app.post('/sign_up', function(req,res){ 
    var name = req.body.name; 
    var email =req.body.email; 
    var pass = req.body.password; 
    var phone =req.body.phone; 
  
    var data = { 
        "name": name, 
        "email":email, 
        "password":pass, 
        "phone":phone 
    } 
db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('signup_success.html'); 
}) 
  
  

//data parsing
app.use(express.urlencoded({
    extended: false
}))

app.use(express.json())

app.post('/email', (req, res) => {
    //TODO
    //Send emails here
    const {subject, email, text} = req.body
    console.log('Data: ', req.body)
    sendMail(email, subject, text, function(err, data){
        if (err){
            res.status(500).json({message: 'Internal Error!'})
        } else {
            res.json({message: 'Email sent!!! '})
        }
    })
    
})



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.set({ 
        'Access-control-Allow-Origin': '*'
        });
})
app.use(express.static(path.join(__dirname , 'public')));

app.listen(port, () => console.log('Server is starting  on Port ' + port))
