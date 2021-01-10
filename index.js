const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

const db = require('./config/mongoose');
const Contact = require('./models/contact');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        Name : "Prem Kumar",
        Phone : "908765432"
    }
]


app.get('/', function(req, res){
    return res.render('home', {
        title : "My Contact List App",
        contact_List : contactList
    });
});


// Fetching the Contact List.....

app.get('/fetchingDeleting', function(req, res){
    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error in fetching the contact lists from db");
            return
        }
        return res.render('fetchingDeleting', {
            title : "My Contact Lists",
            contact_List : contacts
        });
    });
});

app.post('/create-contact', function(req, res){
    Contact.create({
        Name : req.body.Name,
        Phone : req.body.Phone
    }, function(err, newContact){
        if(err){
            console.log("Error in Creating a Contact!");
            return
        }
        
        console.log('*******', newContact);
        return res.redirect('back');
    });
});

// for deleting a contact....

app.get('/delete-contact', function(req, res){
    // get the id from query in the url...
    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error in deleting a object from database");
            return
        }

        return res.redirect('back');
    });
});

app.listen(port, function(err){
    if(err){
        console.log("Error is Running on Port:", err);
    }

    console.log("Yup! My Express Server is Running on Port:", port);
});