const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    Name : {
        type : String,
        require : true
    },
    Phone : {
        type : String,
        require : true
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;