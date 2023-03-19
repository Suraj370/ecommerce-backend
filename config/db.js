const mongoose = require('mongoose');

const dbconnect = ()=>{
    mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) =>{
        console.log(err);
    })
}

module.exports = dbconnect