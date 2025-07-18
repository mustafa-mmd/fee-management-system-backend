const mongoose=require('mongoose');
require('dotenv').config()

  mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("Database Connected successfully")
}).catch(err =>console.log("error in database connection",err))

