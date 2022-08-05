const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactForm', {useNewUrlParser: true});
const app = express();
const bodyParser = require('body-parser');
const port = 80;

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone : String,
    address: String,
    desc: String
});

const contact = mongoose.model('Contact', contactSchema)

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    res.status(200).render('home.pug');
})

app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
})

app.post('/contact', (req, res)=>{
    let myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("Item Delivered");
    }).catch(()=>{
        res.status(400).send("error")
    })
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});