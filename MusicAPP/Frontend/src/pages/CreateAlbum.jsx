import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateAlbum = () => {

    const [title, setTitle] = useState("");
    const [music, setMusic] = useState([]);
    const [selectedMusic, setSelectedMusic] = useState([]);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const getMusic = async () => {

        try {

            const response = await axios.get(
                "http://localhost:3000/api/music"
            );

            setMusic(response.data.music || []);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load music"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        getMusic();
    }, []);

    const handleMusicChange = (id) => {

        setSelectedMusic((previous) => {

            if (previous.includes(id)) {

                return previous.filter(
                    (musicId) => musicId !== id
                );

            }

            return [...previous, id];

        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (selectedMusic.length === 0) {

            setError("Please select at least one music");

            return;
        }

        try {

            const response = await axios.post(
                "http://localhost:3000/api/music/create-album",
                {
                    title,
                    musics: selectedMusic
                },
                {
                    withCredentials: true
                }
            );

            setMessage(
                response.data.message ||
                "Album created successfully"
            );

            setTitle("");
            setSelectedMusic([]);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Album creation failed"
            );

        }
    };

    return (

        <div className="createAlbumPage">

            <div className="createAlbumBox">

                <h1>Create Album</h1>

                <p>
                    Create an album from your uploaded music.
                </p>

                {message && (
                    <div className="successMessage">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="errorMessage">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <label>Album Title</label>

                    <input
                        type="text"
                        placeholder="Enter album title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label>Select Music</label>

                    {loading ? (

                        <p className="formLoading">
                            Loading music...
                        </p>

                    ) : music.length === 0 ? (

                        <p className="emptyMessage">
                            No music available.
                            Create music first.
                        </p>

                    ) : (

                        <div className="musicSelection">

                            {music.map((item) => (

                                <label
                                    key={item._id}
                                    className="musicOption"
                                >

                                    <input
                                        type="checkbox"
                                        checked={selectedMusic.includes(item._id)}
                                        onChange={() =>
                                            handleMusicChange(item._id)
                                        }
                                    />

                                    <div>

                                        <strong>
                                            {item.title}
                                        </strong>

                                        <span>
                                            {item.artist?.username ||
                                                "Unknown Artist"}
                                        </span>

                                    </div>

                                </label>

                            ))}

                        </div>

                    )}

                    <button
                        type="submit"
                        disabled={music.length === 0}
                    >
                        Create Album
                    </button>

                </form>

            </div>

        </div>
    );
};

export default CreateAlbum;