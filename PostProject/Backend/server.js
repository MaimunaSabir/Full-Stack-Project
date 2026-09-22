require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/DB/db.js")

connectDB();

app.listen(3000,()=>{
    console.log("SERVER IS CONNECTED...");
    
})


