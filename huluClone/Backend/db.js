const mongoose = require("mongoose");
const URI = 'mongodb://localhost:27017/huluClone'

const connectDb = async () => {
      try {
         await mongoose.connect(URI);
         console.log("Connected to the database");
      } catch (err) {
         console.log("There was an issue connecting to the database", + err);
         process.exit(0);
      }
}

module.exports = connectDb;