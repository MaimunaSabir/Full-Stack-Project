const model = require("../models/music.model.js");
const albumModel = require("../models/album.model.js");
const uploadFile = require("../services/storage.services.js");


async function createMusic(req, res) {

    try {

        const { title } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: "Audio file is required"
            });
        }

        const result = await uploadFile(
            file.buffer.toString("base64")
        );

        const music = await model.create({
            uri: result.uri,
            title,
            artist: req.user.ID
        });

        res.status(201).json({
            message: "Music created successfully",
            music
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to create music"
        });
    }
}


async function createAlbum(req, res) {

    try {

        const {musics,title} = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Album title is required"
            });
        }

        if (!musics || musics.length === 0) {
            return res.status(400).json({
                message: "Select at least one music"
            });
        }

        const album = await albumModel.create({
            musics,
            title,
            artist: req.user.ID
        });

        res.status(201).json({
            message: "Album created successfully",
            album
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to create album"
        });
    }
}


async function getAllMusic(req, res) {

    try {

        const music = await model
            .find()
            .populate("artist", "username");

        res.status(200).json({
            music
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to get music"
        });
    }
}


async function getAllAlbum(req, res) {

    try {

        const album = await albumModel
            .find()
            .populate("artist", "username");

        res.status(200).json({
            album
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to get albums"
        });
    }
}


async function getAlbumById(req, res) {

    try {

        const album = await albumModel
            .findById(req.params.id)
            .populate("artist", "username")
            .populate({
                path: "musics",
                populate: {
                    path: "artist",
                    select: "username"
                }
            });

        if (!album) {
            return res.status(404).json({
                message: "Album not found"
            });
        }

        res.status(200).json({
            album
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to get album"
        });
    }
}


async function getMusicById(req, res) {

    try {

        const music = await model
            .findById(req.params.id)
            .populate("artist", "username");

        if (!music) {
            return res.status(404).json({
                message: "Music not found"
            });
        }

        res.status(200).json({
            music
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to get music"
        });
    }
}


module.exports = {createMusic,createAlbum,getAllMusic,getAllAlbum,getAlbumById,getMusicById};