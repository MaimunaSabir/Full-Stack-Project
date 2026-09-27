import React, { useEffect, useState } from "react";
import axios from "axios";
import AlbumCard from "../Components/AlbumCard";

const Albums = () => {

    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getAlbums = async () => {

        try {

            const response = await axios.get(
                "http://localhost:3000/api/music/album"
            );

            setAlbums(response.data.album || []);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load albums"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        getAlbums();
    }, []);

    if (loading) {

        return (
            <div className="homeLoading">
                Loading albums...
            </div>
        );

    }

    return (

        <div className="albumsPage">

            <div className="albumsContent">

                <p className="pageSmallText">
                    MUSIC COLLECTION
                </p>

                <h1>All Albums</h1>

                {error && (
                    <div className="errorMessage">
                        {error}
                    </div>
                )}

                <div className="albumGrid">

                    {albums.length > 0 ? (

                        albums.map((album) => (

                            <AlbumCard
                                key={album._id}
                                id={album._id}
                                title={album.title}
                                artist={album.artist?.username}
                                image={`https://picsum.photos/300/300?random=${album._id}`}
                            />

                        ))

                    ) : (

                        <p className="emptyMessage">
                            No albums available yet.
                        </p>

                    )}

                </div>

            </div>

        </div>
    );
};

export default Albums;