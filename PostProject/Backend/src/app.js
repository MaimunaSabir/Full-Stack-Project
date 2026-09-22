const express = require("express");
const model = require("./models/post.model.js");
const multer = require("multer");
const uploadfile = require("./services/storage.services.js");
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());
const upload = multer({storage: multer.memoryStorage()})


app.post("/create-post",upload.single("image"),async (req,res) => {

    const  result = await uploadfile(req.file.buffer);
    console.log(result);
    

    const post = await model.create({
        "image" : result.url,
        "caption" : req.body.caption
    })


    res.json({
        "message": "created succesfully",
        "post": post
    })
    
    
})


app.get("/feed",async (req,res) => {

    const post = await model.find();

    res.json({
        post
    })
    
})



module.exports = app;