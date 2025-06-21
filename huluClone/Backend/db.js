const mongoose = require("mongoose");
// const URI = 'mongodb://localhost:27017/huluClone' // FOR DEV 

// Parse env vars
const {
   MONGO_HOST,
   MONGO_USER,
   MONGO_PASSWORD,
   MONGO_DB
 } = process.env;
 
 const URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DB}?authSource=admin`;


const connectDb = async () => {
      try {
         console.log("Connecting with URI:", URI);
         await mongoose.connect(URI);
         console.log("Connected to the database");
      } catch (err) {
         console.log("There was an issue connecting to the database", err.message);
         console.log("DB Connection failed:", err);
         process.exit(0);
      }
}

module.exports = connectDb;