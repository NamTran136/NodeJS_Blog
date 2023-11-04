const mongoose = require('mongoose')

async function connect(){
    try{
        await mongoose.connect('mongodb://127.0.0.1/Education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connect successfully")
    }
    catch(error){
        console.log("connect successfully")
    }
}

module.exports = { connect }