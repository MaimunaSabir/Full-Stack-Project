import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AlbumDetails = () => {

    const { id } = useParams();

    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getAlbum = async () => {

        try {

            const response = await axios.get(
                `http://localhost:3000/api/music/albumByID/${id}`
            );

            setAlbum(response.data.album);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load album"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        getAlbum();
    }, [id]);

    if (loading) {

        return (
            <div className="homeLoading">
                Loading album...
            </div>
        );

    }

    if (error) {

        return (
            <div className="albumDetails">
                <div className="errorMessage">
                    {error}
                </div>
            </div>
        );

    }

    if (!album) {

        return (
            <div className="albumDetails">
                <p className="emptyMessage">
                    Album not found.
                </p>
            </div>
        );

    }

    return (

        <div className="albumDetails">

            <div className="albumDetailsTop">

                <img
                    src={`https://picsum.photos/400/400?random=${album._id}`}
                    alt={album.title}
                />

                <div>

                    <p className="pageSmallText">
                        ALBUM
                    </p>

                    <h1>
                        {album.title}
                    </h1>

                    <p className="albumArtist">
                        {album.artist?.username ||
                            "Unknown Artist"}
                    </p>

                    <p className="songCount">
                        {album.musics?.length || 0} songs
                    </p>

                </div>

            </div>

            <div className="songs">

                {album.musics?.length > 0 ? (

                    album.musics.map((song, index) => (

                        <div
                            className="song"
                            key={song._id}
                        >

                            <span>
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <div className="songInfo">

                                <strong>
                                    {song.title}
                                </strong>

                                <span>
                                    {song.artist?.username ||
                                        "Unknown Artist"}
                                </span>

                            </div>

                            <audio
                                src={song.uri}
                                controls
                            />

                        </div>

                    ))

                ) : (

                    <p className="emptyMessage">
                        This album has no songs.
                    </p>

                )}

            </div>

        </div>
    );
};

export default AlbumDetails;