/* import mongoose from 'mongoose'

var mongoDB = 'mongodb://root:rootpassword@localhost:27017/';
mongoose.connect(mongoDB, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: false 
    }
 );

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on('connected', function(){
    console.log("Connected")
});
mongoose.connection.on('error', function(){
    console.log("error")
});
mongoose.connection.on('disconnected', function(){
    console.log("Close")
});

export default db */