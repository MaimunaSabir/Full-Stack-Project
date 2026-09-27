const express = require("express");
const multer = require("multer");
const musicController = require("../controllers/music.controller.js");
const authmiddleware = require("../middlewares/authmiddleware.js");
const router = express.Router();


const upload = multer({
    storage: multer.memoryStorage()
});


router.post("/create-music",upload.single("audio"),authmiddleware.authartist,musicController.createMusic);


router.post("/create-album",authmiddleware.authartist,musicController.createAlbum);


router.get("/",musicController.getAllMusic);


router.get("/album", musicController.getAllAlbum);


router.get("/albumByID/:id", musicController.getAlbumById);


router.get("/musicByID/:id",musicController.getMusicById);


module.exports = router;