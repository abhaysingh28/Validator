const mongoose = require("mongoose");

exports.databaseconnection =async() => {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log("CONNECTION ESTABLISHED");
    } catch (err) {
        console.log("DATABASE ERROR: " + err);
    }
};

