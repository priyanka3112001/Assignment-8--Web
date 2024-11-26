const mongoose = require("mongoose");

async function dbconnection() { 
     var connection = await mongoose.connect(
       "mongodb://127.0.0.1:27017/userdetails"
     );
        return connection;
}
module.exports = dbconnection;