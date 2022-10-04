const mongoose = require('mongoose');


const connectToMongoose = ()=> {
    mongoose.connect("mongodb://localhost:27017/iNoteBookDB", {useNewUrlParser: true});

}

module.exports = connectToMongoose